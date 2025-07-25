import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Si el usuario no está autenticado y trata de acceder a rutas protegidas
  if (!session && (
    req.nextUrl.pathname.startsWith('/dashboard') || 
    req.nextUrl.pathname.startsWith('/onboarding')
  )) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  
  // Si el usuario está autenticado pero accede a la página principal o login
  if (session && (
    req.nextUrl.pathname === '/' ||
    req.nextUrl.pathname === '/login'
  )) {
    // Verificar si completó onboarding
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('has_completed_onboarding')
        .eq('user_id', user.id)
        .single()
      
      if (profile && profile.has_completed_onboarding) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      } else {
        return NextResponse.redirect(new URL('/onboarding', req.url))
      }
    }
  }
  
  return res
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*', '/onboarding/:path*'],
}