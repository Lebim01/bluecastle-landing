'use client'
import { Header } from '@/payload-types'
import { resolveHref } from '@/utilities/resolveLink'
import Link from 'next/link'
import Logo from './Logo'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'

export default function HeaderClient({ data }: { data: Header }) {
  const branding: Header['branding'] =
    data.branding ?? ({ style: 'wordmark', size: 'md' } as Header['branding'])

  const nav = [...(data.nav ?? [])]
    .filter((n) => n.visible !== false)

  return (
    <header className={`w-full border-b  ${data.sticky ? 'sticky top-0 z-50 backdrop-blur' : ''}`}>
      <div className="mx-auto max-w-7xl h-32 px-4 py-3 flex items-center gap-6">
        <div className='flex justify-between w-full'>
          <div className='flex gap-8'>
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
                    <Menu as="div" className="relative inline-block" key={i}>
                      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold">
                        {item.link?.label}
                        <ChevronDown aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                      </MenuButton>

                      <MenuItems
                        anchor="bottom"
                        transition
                        className="absolute right-0 z-[100] mt-1 w-56 origin-top-right rounded-md bg-gray-100 outline-1 -outline-offset-1 outline-gray-200 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in shadow-md"
                      >
                        <div className="p-1">
                          {(item.children ?? []).map((c, j) => (
                            <MenuItem key={j}>
                              <Link
                                href={resolveHref(c.link)}
                                className="block px-4 py-2 text-sm data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden hover:bg-white"
                              >
                                {c.link?.label}
                              </Link>
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
                    </Menu>


                  )
                }


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
            </nav>
          </div>

          <div className='border border-primary rounded-full p-6 py-3 hover:bg-primary hover:text-white bg-white'>
            <Link href="#">Log in</Link>
          </div>

        </div>
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
