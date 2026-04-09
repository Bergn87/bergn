import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { sendQuoteMail } from '@/lib/mail'
import { sendQuoteSMS } from '@/lib/sms'
import type { Quote, Tenant, TenantSetting, ReminderRule } from '@/types'

/**
 * CRON: Send påmindelser til kunder der ikke har svaret.
 * Kører dagligt. Beskyttet med CRON_SECRET.
 */
export async function GET(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createAdminClient()
  let sent = 0

  // Hent alle aktive tenants
  const { data: tenants } = await supabase
    .from('tenants')
    .select('*')
    .eq('is_active', true)

  if (!tenants || tenants.length === 0) {
    return NextResponse.json({ sent: 0 })
  }

  for (const tenant of tenants as unknown as Tenant[]) {
    // Hent regler for denne tenant
    const { data: rules } = await supabase
      .from('reminder_rules')
      .select('*')
      .eq('tenant_id', tenant.id)
      .eq('is_active', true)
      .order('sort_order')

    if (!rules || rules.length === 0) continue

    // Hent settings
    const { data: settingsRows } = await supabase
      .from('tenant_settings')
      .select('key, value')
      .eq('tenant_id', tenant.id)

    const settings: Record<string, string> = {}
    ;(settingsRows as TenantSetting[] | null)?.forEach((r) => {
      if (r.value) settings[r.key] = r.value
    })

    for (const rule of rules as unknown as ReminderRule[]) {
      const delayDate = new Date()
      delayDate.setDate(delayDate.getDate() - rule.delay_days)
      const delayStart = new Date(delayDate)
      delayStart.setHours(0, 0, 0, 0)
      const delayEnd = new Date(delayDate)
      delayEnd.setHours(23, 59, 59, 999)

      // Find pending quotes fra delay-dagen
      const { data: quotes } = await supabase
        .from('quotes')
        .select('*')
        .eq('tenant_id', tenant.id)
        .eq('status', 'pending')
        .gte('created_at', delayStart.toISOString())
        .lte('created_at', delayEnd.toISOString())
        .lt('reminders_sent', rule.sort_order + 1)

      if (!quotes || quotes.length === 0) continue

      const reminderSettings = {
        ...settings,
        quote_mail_subject: rule.mail_subject ?? settings['reminder_mail_subject'] ?? 'Påmindelse: Dit tilbud',
        quote_mail_body: rule.mail_body_html ?? settings['reminder_mail_body'] ?? 'Hej {{kunde_navn}}, se dit tilbud her: {{tilbud_link}}',
      }

      for (const quote of quotes as unknown as Quote[]) {
        try {
          if (rule.channel === 'mail' || rule.channel === 'both') {
            await sendQuoteMail(quote, tenant, reminderSettings)
          }
          if (rule.channel === 'sms' || rule.channel === 'both') {
            await sendQuoteSMS(quote, tenant, settings)
          }

          await supabase
            .from('quotes')
            .update({
              reminders_sent: quote.reminders_sent + 1,
              last_reminder_at: new Date().toISOString(),
            } as never)
            .eq('id', quote.id)

          sent++
        } catch (err) {
          console.error(`Påmindelse fejl for quote ${quote.id}:`, err)
        }
      }
    }
  }

  return NextResponse.json({ sent, timestamp: new Date().toISOString() })
}
