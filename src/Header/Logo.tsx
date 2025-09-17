import { Header, HeaderLogoSize, Media } from '@/payload-types'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  branding: Header['branding']
}

const sizeToClass: Record<NonNullable<HeaderLogoSize>, string> = {
  sm: 'h-6',
  md: 'h-8',
  lg: 'h-10',
  xl: 'h-12',
}

const Logo: FC<Props> = ({ branding }) => {
  const logoH = sizeToClass[branding?.size ?? 'md']
  const alt = branding?.alt || 'Logo'

  return (
    <Link href="/" className="flex items-center gap-2 font-semibold">
      {/* LOGO */}
      {branding?.style !== 'text' &&
        ((branding?.logoLight as Media)?.url || (branding?.logoDark as Media)?.url) ? (
        <>
          {/* Modo claro */}
          {(branding?.logoLight as Media)?.url && (
            <img
              src={(branding?.logoLight as Media).url!}
              alt={alt}
              className={`${logoH} w-auto dark:hidden`}
            />
          )}
          {/* Modo oscuro */}
          {((branding?.logoDark as Media)?.url ?? (branding?.logoLight as Media)?.url) && (
            <img
              src={
                ((branding?.logoDark as Media)?.url ??
                  (branding?.logoLight as Media)?.url) || ""
              }
              alt={alt}
              className={`${logoH} w-auto hidden dark:block`}
            />
          )}
        </>
      ) : (
        // Fallback texto
        <span
          className={`tracking-tight ${branding?.size === 'xl' ? 'text-2xl' : branding?.size === 'lg' ? 'text-xl' : 'text-base'}`}
        >
          MiSitio
        </span>
      )}

      {/* Variante “isologo”: puedes añadir el texto a la derecha si quieres */}
      {branding?.style === 'isologo' && (
        <span className="hidden sm:inline text-sm font-medium opacity-80">/ Bluecastle</span>
      )}
    </Link>
  )
}

export default Logo
