import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

/**
 * CRON: Nulstil månedlig lead-kvote for alle tenants.
 * Kører d. 1. i hver måned. Beskyttet med CRON_SECRET.
 */
export async function GET(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createAdminClient()

  const { data } = await supabase
    .from('tenants')
    .update({ leads_used_this_month: 0 } as never)
    .eq('is_active', true)
    .select('id')

  return NextResponse.json({
    reset: data?.length ?? 0,
    timestamp: new Date().toISOString(),
  })
}
