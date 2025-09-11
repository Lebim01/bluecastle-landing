// components/Footer/SiteFooter.tsx  (Server Component: SIN "use client")
import type { Footer as FooterGlobal } from 'src/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/LinkFooter'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector' // <- este sí es client, lo anidamos

export default async function Footer() {
  // gracias al genérico, esto retorna () => Promise<FooterGlobal>
  const fetchFooter = getCachedGlobal('footer', 1)
  const footerData: FooterGlobal = await fetchFooter()

  const bg = footerData.styles?.background || '#131217'
  const tc = footerData.styles?.textColor || '#ADADAD'
  const brand = footerData.brand?.name || 'BLUE CASTLE'
  const social = footerData.brand?.social
  const wa = social?.whatsappPhone?.replace(/\D/g, '')
  const waHref = wa ? `https://wa.me/${wa}` : undefined
  const columns = footerData.columns || []
  const address = footerData.address
  const ssl = footerData.ssl?.badge as any
  const badgeAlt = footerData.ssl?.badgeAlt || 'SSL Secure'
  const legalLeft = footerData.legalLeft
  const legalRight = footerData.legalRight
  const credit = footerData.developedBy?.credit

  return (
    <footer style={{ backgroundColor: bg, color: tc }} className="mt-auto">
      <div className="mx-auto max-w-screen-lg px-6 py-20 flex flex-col gap-8">
        {/* Brand + Social + ThemeSelector (client subcomponent) */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-lg 2xl:text-5xl text-white tracking-wide">{brand}</span>
            </Link>
            <div className="flex items-center gap-3">
              {social?.facebook && <Link href={social.facebook} target="_blank" rel="noopener noreferrer">Facebook</Link>}
              {social?.twitter && <Link href={social.twitter} target="_blank" rel="noopener noreferrer">Twitter</Link>}
              {social?.instagram && <Link href={social.instagram} target="_blank" rel="noopener noreferrer">Instagram</Link>}
              {waHref && <Link href={waHref} target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</Link>}
              {/* client subcomponent, sin problemas dentro de server */}
              <ThemeSelector />
            </div>
          </div>
          <div className="w-full h-px bg-gray-700/60" />
        </div>

        {/* Columns + Address + SSL */}
        <div className="grid grid-cols-1 gap-8 text-sm 2xl:text-xl lg:grid-cols-4">
          {columns.slice(0, 3).map((col, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              {col.title && <p className="font-medium text-white/90 mb-1">{col.title}</p>}
              {col.items?.map((it, i) => it?.link ? (
                <CMSLink key={i} {...it.link} className="hover:text-white transition-colors" />
              ) : null)}
            </div>
          ))}
          <div className="flex flex-col gap-2">
            {columns[3]?.title && <p className="font-medium text-white/90 mb-1">{columns[3].title}</p>}
            {address && <p className="whitespace-pre-line text-[0.95em]">{address}</p>}
            {ssl?.url && (
              <div className="mt-4">
                <Image src={ssl.url} alt={badgeAlt} width={140} height={48} className="h-auto w-auto opacity-90" />
              </div>
            )}
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-8 text-xs lg:flex-row lg:justify-between">
          {legalLeft && <p className="whitespace-pre-line flex-1">{legalLeft}</p>}
          {legalRight && <p className="whitespace-pre-line flex-1">{legalRight}</p>}
        </div>

        {/* Credit */}
        {(credit?.label || credit?.url) && (
          <div className="flex items-center gap-1 text-gray-400">
            <span>Developed by</span>
            <Link
              href={credit?.url || '#'}
              target={credit?.newTab ? '_blank' : undefined}
              rel={credit?.newTab ? 'noopener noreferrer' : undefined}
              className="hover:text-white"
            >
              {credit?.label || credit?.url}
            </Link>
          </div>
        )}
      </div>
    </footer>
  )
}
