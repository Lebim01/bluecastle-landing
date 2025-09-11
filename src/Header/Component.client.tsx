'use client'
import { Header } from '@/payload-types'
import { resolveHref } from '@/utilities/resolveLink'
import Link from 'next/link'
import Logo from './Logo'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDown, X, Menu as MenuIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export default function HeaderClient({ data }: { data: Header }) {
  const branding: Header['branding'] =
    data.branding ?? ({ style: 'wordmark', size: 'md' } as Header['branding'])

  const nav = [...(data.nav ?? [])]
    .filter((n) => n.visible !== false)

  const [open, setOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const panelRef = useRef<HTMLDivElement>(null);

  // cierre con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(false), setOpenSections({}));
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // click fuera
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
        setOpenSections({});
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const toggleSection = (key: string) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));

  return (
    <header className={`w-full border-b  ${data.sticky ? 'sticky top-0 z-50 backdrop-blur' : ''}`}>
      <div className="mx-auto max-w-7xl h-auto px-4 py-3 flex items-center gap-6">
        <div className='flex justify-between w-full'>
          <div className='flex gap-4 md:gap-8 items-center'>
            {/* Botón hamburguesa móvil */}
            <button
              aria-label="Abrir menú"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative h-9 w-9 md:hidden flex items-center justify-center"
            >

              {!open && <MenuIcon />}
              {open && <X />}
            </button>

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

                return null
              })}
            </nav>
          </div>

          <div className='border border-primary rounded-full px-6 py-3 hover:bg-primary hover:text-white bg-white'>
            <Link href="https://bluecastle-front-client.vercel.app/login">Log in</Link>
          </div>
        </div>
      </div>

      {/* Overlay + Panel lateral móvil */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
      />

      {/* Panel móvil */}
      <div
        ref={panelRef}
        className={`fixed right-0 top-0 z-50 h-dvh w-80 max-w-[85%] border-l border-neutral-200 bg-white p-6 shadow-xl transition-transform md:hidden ${open ? "translate-x-0" : "translate-x-full"
          }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg font-semibold">Menú</span>
          <button
            onClick={() => {
              setOpen(false);
              setOpenSections({});
            }}
            aria-label="Cerrar menú"
            className="rounded-lg p-2 hover:bg-neutral-100"
          >
            ✕
          </button>
        </div>

        <ul className="space-y-1">
          {nav.map((item) =>
            !item.children || item.children?.length == 0 ? (
              <li key={item.link.label}>
                <Link
                  href={resolveHref(item.link)}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-neutral-800 hover:bg-neutral-100"
                  onClick={() => setOpen(false)}
                >
                  {item.link.label}
                </Link>
              </li>
            ) : (
              <li key={item.link.label}>
                <button
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-base font-semibold text-neutral-900 hover:bg-neutral-100"
                  aria-controls={`sec-${item.link.label}`}
                  aria-expanded={!!openSections[item.link.label]}
                  onClick={() => toggleSection(item.link.label)}
                >
                  {item.link.label}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    className={`transition-transform ${openSections[item.link.label] ? "rotate-180" : ""
                      }`}
                  >
                    <path d="M5 7l5 6 5-6" fill="currentColor" />
                  </svg>
                </button>

                {/* Contenido colapsable */}
                <div
                  id={`sec-${item.link.label}`}
                  className={`overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${openSections[item.link.label] ? "grid grid-rows-[1fr]" : "grid grid-rows-[0fr]"
                    }`}
                >
                  <div className="min-h-0">
                    <ul className="mb-1 mt-1 space-y-1 pl-3">
                      {item.children.map((c, j) => (
                        <li key={j}>
                          <Link
                            href={resolveHref(c.link)}
                            className="block rounded-lg px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-100"
                            onClick={() => setOpen(false)}
                          >
                            {c.link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>

        <div className="mt-6 border-t pt-6">
          <Link
            href="https://bluecastle-front-client.vercel.app/login"
            className="inline-flex w-full items-center justify-center rounded-xl border border-black px-4 py-2 text-sm font-semibold hover:bg-black hover:text-white"
          >
            Log in
          </Link>
        </div>

        <p className="mt-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} Bluecastle. <br /> Todos los derechos reservados.
        </p>
      </div>

    </header>
  )
}
