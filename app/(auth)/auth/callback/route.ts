import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

/**
 * Auth callback route.
 * Håndterer Supabase auth redirects:
 * - Email confirmation (?type=signup)
 * - Password recovery (?type=recovery)
 * - Magic links
 *
 * Supabase sender brugeren hertil med ?code=... parameter.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const code = searchParams.get('code')
  const type = searchParams.get('type')

  const redirectUrl = request.nextUrl.clone()

  if (code) {
    const response = NextResponse.next()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            )
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      if (type === 'recovery') {
        redirectUrl.pathname = '/reset-password'
        redirectUrl.searchParams.delete('code')
        redirectUrl.searchParams.delete('type')
        return NextResponse.redirect(redirectUrl, { headers: response.headers })
      }

      // Signup confirmation eller andet → dashboard
      redirectUrl.pathname = '/admin/dashboard'
      redirectUrl.searchParams.delete('code')
      redirectUrl.searchParams.delete('type')
      return NextResponse.redirect(redirectUrl, { headers: response.headers })
    }
  }

  // Fallback: redirect til login ved fejl
  redirectUrl.pathname = '/login'
  redirectUrl.searchParams.set('error', 'Linket er ugyldigt eller udløbet')
  return NextResponse.redirect(redirectUrl)
}
