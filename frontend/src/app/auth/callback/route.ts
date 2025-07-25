import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Obtén el código de la URL
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  if (!code) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // Redirige a una página del lado del cliente que manejará el intercambio de tokens
  return NextResponse.redirect(new URL(`/auth/confirm?code=${code}`, request.url))
}