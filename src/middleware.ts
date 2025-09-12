import { SUPPORTED_LOCALE } from '@/utilities/locales'
import { NextRequest, NextResponse } from 'next/server'

// Obtiene el idioma preferido desde los headers (acepta el primero compatible)
function getLocale(request: NextRequest): string {
  // 1. Intentar detectar desde header Accept-Language
  const acceptLang = request.headers.get('accept-language')
  if (acceptLang) {
    const preferred = acceptLang.split(',').map((l) => l.split(';')[0].trim().toLowerCase())

    const matched = preferred.find(
      (lang) => SUPPORTED_LOCALE.includes(lang.split('-')[0]), // "es-MX" -> "es"
    )
    if (matched) {
      return matched.split('-')[0] // devolver solo el código base
    }
  }

  // 2. Si no hay header o no coincide, usar fallback (ej. inglés)
  return 'en'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Comprobar si ya hay un locale en la URL
  const pathnameHasLocale = SUPPORTED_LOCALE.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) {
    return NextResponse.next() // seguir con la request normal
  }

  // Si no hay locale, redirigir al detectado
  const locale = getLocale(request)
  const newUrl = request.nextUrl.clone()
  newUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: ['/((?!_next|api|admin|public).*)'],
}
