import type { Footer as FooterGlobal, Media } from 'src/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import Image from 'next/image'
import { CMSLink } from '@/components/LinkFooter'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export default async function Footer() {
  const fetchFooter = getCachedGlobal('footer', 1)
  const footerData: FooterGlobal = await fetchFooter()

  const bg = footerData.styles?.background || '#131217'
  const tc = footerData.styles?.textColor || '#ADADAD'

  const brandText = footerData.brand?.name?.trim() || ''
  const logo = footerData.brand?.logo as Media | undefined
  const logoAlt = footerData.brand?.logoAlt || 'Brand logo'

  const social = footerData.brand?.social
  const wa = social?.whatsappPhone?.replace(/\D/g, '')
  const waHref = wa ? `https://wa.me/${wa}` : undefined

  const columns = footerData.columns || []
  const address = footerData.address
  const ssl = footerData.ssl?.badge as Media | undefined
  const badgeAlt = footerData.ssl?.badgeAlt || 'SSL Secure'
  const legalLeft = footerData.legalLeft
  const legalRight = footerData.legalRight
  const credit = footerData.developedBy?.credit

  const showLogo = Boolean(logo?.url)
  const showBrand = Boolean(brandText)

  return (
    <footer style={{ backgroundColor: bg, color: tc }} className="mt-auto">
      <div className="mx-auto max-w-full px-12 py-20 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            {(showLogo || showBrand) ? (
              <Link href="/" className="flex items-center gap-2">
                {showLogo && logo?.url && (
                  <img
                    src={getMediaUrl(logo)}
                    alt={logoAlt}
                    width={logo?.width ?? 120}
                    height={logo?.height ?? 40}
                    className="h-8 w-auto 2xl:h-12"
                  />
                )}
                {showBrand && (
                  <span className="text-lg 2xl:text-5xl text-white tracking-wide">
                    {brandText}
                  </span>
                )}
              </Link>
            ) : <span />}


            <div className="flex items-center gap-3 text-xl 2xl:text-4xl">
              {social?.facebook && (
                <Link href={social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  Facebook
                </Link>
              )}
              {social?.twitter && (
                <Link href={social.twitter} aria-label="Twitter/X" target="_blank" rel="noopener noreferrer">
                  Twitter
                </Link>
              )}
              {social?.instagram && (
                <Link href={social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  Instagram
                </Link>
              )}
              {waHref && (
                <Link href={waHref} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="underline">
                  WhatsApp
                </Link>
              )}
            </div>
          </div>
          <div className="w-full h-px bg-gray-700/60" />
        </div>
        <div className="grid grid-cols-1 gap-8 text-sm 2xl:text-xl lg:grid-cols-4">
          {columns.slice(0, 3).map((col, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              {col.title && <p className="font-medium text-white/90 mb-1">{col.title}</p>}
              {col.items?.map((it, i) =>
                it?.link ? <CMSLink key={i} {...it.link} className="hover:text-white transition-colors" /> : null
              )}
            </div>
          ))}

          <div className="flex flex-col gap-2">
            {columns[3]?.title && <p className="font-medium text-white/90 mb-1">{columns[3].title}</p>}
            {address && <p className="whitespace-pre-line text-[0.95em]">{address}</p>}
            {ssl?.url && (
              <div className="mt-4">
                <Image
                  src={ssl.url}
                  alt={badgeAlt}
                  width={ssl.width ?? 140}
                  height={ssl.height ?? 48}
                  className="h-auto w-auto opacity-90"
                />
              </div>
            )}
          </div>
        </div>


        <div className="flex flex-col gap-8 text-xs lg:flex-row lg:justify-between">
          {legalLeft && <p className="whitespace-pre-line flex-1">{legalLeft}</p>}
          {legalRight && <p className="whitespace-pre-line flex-1">{legalRight}</p>}
        </div>


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
