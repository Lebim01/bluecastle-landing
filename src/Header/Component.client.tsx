'use client'
import { Header } from '@/payload-types'
import { resolveHref } from '@/utilities/resolveLink'
import Link from 'next/link'
import Logo from './Logo'

export default function HeaderClient({ data }: { data: Header }) {
  const branding: Header['branding'] =
    data.branding ?? ({ style: 'wordmark', size: 'md' } as Header['branding'])

  const nav = [...(data.nav ?? [])]
    .filter((n) => n.visible !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <header className={`w-full border-b ${data.sticky ? 'sticky top-0 z-50 backdrop-blur' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-6">
        <Logo branding={branding} />

        <nav className="hidden md:flex items-center gap-4">
          {nav.map((item, i) => {
            const href = resolveHref(item.link)
            if (item.style === 'link') {
              return (
                <Link key={i} href={href} className="px-3 py-2 hover:underline">
                  {item.link?.label ?? 'Item'}
                </Link>
              )
            }

            if (item.style === 'dropdown') {
              return (
                <div key={i} className="relative group">
                  <button className="px-3 py-2">{item.link?.label}</button>
                  <div className="absolute left-0 mt-2 hidden group-hover:block min-w-56 rounded-md border bg-white shadow">
                    <ul className="py-2">
                      {(item.children ?? []).map((c, j) => (
                        <li key={j}>
                          <Link
                            href={resolveHref(c.link)}
                            className="block px-4 py-2 hover:bg-gray-50"
                          >
                            {c.link?.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            }

            // mega menú
            return (
              <div key={i} className="relative group">
                <button className="px-3 py-2">{item.link?.label}</button>
                <div className="absolute left-0 mt-2 hidden group-hover:block w-[800px] rounded-md border bg-white shadow p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {(item.mega?.columns ?? []).map((col, k) => (
                      <div key={k}>
                        <h4 className="text-sm font-semibold mb-2">{col.title}</h4>
                        <ul className="space-y-1">
                          {col.items?.map((it, m) => (
                            <li key={m}>
                              <Link href={resolveHref(it.link)} className="text-sm hover:underline">
                                {it.link?.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {item.mega?.promo && (
                      <div className="col-span-1 border rounded-md p-4">
                        <div className="text-sm font-semibold">{item.mega.promo.headline}</div>
                        <div className="text-sm text-gray-600">{item.mega.promo.subhead}</div>
                        <div className="mt-2">
                          <Link
                            href={resolveHref(item.mega.promo.link)}
                            className="inline-flex text-sm underline"
                          >
                            Ver más →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {data?.cta?.show && (
            <Link
              href={resolveHref((data.cta as any)?.link ?? { type: 'external', url: '#' })}
              className={`ml-2 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm ${
                data.cta.variant === 'outline' ? 'border' : 'bg-black text-white hover:opacity-90'
              }`}
            >
              {data.cta.badge && (
                <span className="rounded bg-gray-900/10 px-2">{data.cta.badge}</span>
              )}
            </Link>
          )}
        </nav>

        {/* Móvil */}
        <details className="md:hidden ml-auto">
          <summary className="cursor-pointer px-3 py-2 border rounded">Menú</summary>
          <div className="mt-2 border rounded p-2">
            <ul className="space-y-1">
              {nav.map((item, i) => (
                <li key={i}>
                  <Link href={resolveHref(item.link)} className="block px-2 py-2">
                    {item.link?.label}
                  </Link>
                  {item.style !== 'link' && (
                    <ul className="pl-4">
                      {(item.children ?? item.mega?.columns?.flatMap((c) => c.items) ?? []).map(
                        (c: any, j: number) => (
                          <li key={j}>
                            <Link href={resolveHref(c.link)} className="block py-1 text-sm">
                              {c.link?.label}
                            </Link>
                          </li>
                        ),
                      )}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </header>
  )
}
