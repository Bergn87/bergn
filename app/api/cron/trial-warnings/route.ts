import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import type { Tenant } from '@/types'

/**
 * CRON: Send advarsler til tenants hvis trial snart udløber.
 * Kører dagligt. Beskyttet med CRON_SECRET.
 *
 * - 3 dage før: "Din prøveperiode udløber om 3 dage"
 * - 1 dag før: "Din prøveperiode udløber i morgen"
 * - Udløbet: sæt plan = 'expired'
 */
export async function GET(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createAdminClient()
  const now = new Date()
  let expired = 0
  const warnings: string[] = []

  // 1. Find og ekspirer udløbne trials
  const { data: expiredTrials } = await supabase
    .from('tenants')
    .update({
      plan: 'expired',
      leads_quota: 0,
    } as never)
    .eq('plan', 'trial')
    .eq('is_active', true)
    .lt('trial_ends_at', now.toISOString())
    .select('id, company_name, company_email')

  expired = expiredTrials?.length ?? 0

  // 2. Find trials der udløber om 3 dage
  const threeDays = new Date(now)
  threeDays.setDate(threeDays.getDate() + 3)
  const threeDaysStart = new Date(threeDays)
  threeDaysStart.setHours(0, 0, 0, 0)
  const threeDaysEnd = new Date(threeDays)
  threeDaysEnd.setHours(23, 59, 59, 999)

  const { data: warningTrials } = await supabase
    .from('tenants')
    .select('id, company_name, company_email')
    .eq('plan', 'trial')
    .eq('is_active', true)
    .gte('trial_ends_at', threeDaysStart.toISOString())
    .lte('trial_ends_at', threeDaysEnd.toISOString())

  if (warningTrials) {
    for (const t of warningTrials as Pick<Tenant, 'id' | 'company_name' | 'company_email'>[]) {
      warnings.push(`${t.company_name} (${t.company_email}) — 3 dage`)
      // TODO: Send warning email via Resend
    }
  }

  // 3. Find trials der udløber i morgen
  const oneDayOut = new Date(now)
  oneDayOut.setDate(oneDayOut.getDate() + 1)
  const oneDayStart = new Date(oneDayOut)
  oneDayStart.setHours(0, 0, 0, 0)
  const oneDayEnd = new Date(oneDayOut)
  oneDayEnd.setHours(23, 59, 59, 999)

  const { data: urgentTrials } = await supabase
    .from('tenants')
    .select('id, company_name, company_email')
    .eq('plan', 'trial')
    .eq('is_active', true)
    .gte('trial_ends_at', oneDayStart.toISOString())
    .lte('trial_ends_at', oneDayEnd.toISOString())

  if (urgentTrials) {
    for (const t of urgentTrials as Pick<Tenant, 'id' | 'company_name' | 'company_email'>[]) {
      warnings.push(`${t.company_name} (${t.company_email}) — 1 dag`)
      // TODO: Send urgent warning email via Resend
    }
  }

  return NextResponse.json({
    expired,
    warnings: warnings.length,
    details: warnings,
    timestamp: new Date().toISOString(),
  })
}
