import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

/**
 * CRON: Markér udløbne tilbud som expired.
 * Kører dagligt. Beskyttet med CRON_SECRET.
 */
export async function GET(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createAdminClient()

  const { data } = await supabase
    .from('quotes')
    .update({
      status: 'expired',
      expired_at: new Date().toISOString(),
    } as never)
    .eq('status', 'pending')
    .lt('expires_at', new Date().toISOString())
    .select('id')

  return NextResponse.json({
    expired: data?.length ?? 0,
    timestamp: new Date().toISOString(),
  })
}
