import { ReactNode, useEffect, useMemo } from 'react'
import { I18nextProvider } from 'react-i18next'
import { usePathname } from 'next/navigation'
import { getI18nClient } from './client'

export default function I18nProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const i18n = useMemo(() => getI18nClient(), [])

  useEffect(() => {
    const lang = getLangFromPath(pathname || '/')
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
  }, [pathname, i18n])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

// helper
function getLangFromPath(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  const lang = segments[0]
  return ['es', 'en', 'pt'].includes(lang) ? lang : 'es'
}
