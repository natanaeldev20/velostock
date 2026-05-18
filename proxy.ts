import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/admin')
  const isLoginRoute = req.nextUrl.pathname.startsWith('/auth/login')

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
  }

  if (isLoginRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl))
  }
})

export const config = {
  matcher: ['/admin/:path*', '/auth/login']
}
