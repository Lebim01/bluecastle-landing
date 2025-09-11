import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import type { HeaderNavItem, LinkField, Page, Post } from '@/payload-types'
import { ChevronDown } from 'lucide-react'

interface CMSLinkType extends HeaderNavItem {
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  link: LinkField
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    children,
    className,
    newTab,
    link,
    style
  } = props

  // simple link
  if (style == 'link') {
    const { doc: reference, label, url } = link

    const href =
      type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
        ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug
        }`
        : url

    if (!href) return null

    const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

    return (
      <Button asChild className={className} variant={"link"}>
        <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
          {label}
        </Link>
      </Button>
    )
  }

  // dropdown
  if (style == 'dropdown') {
    return (
      <Menu as="div" className="relative inline-block">
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
          Options
          <ChevronDown aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
              >
                Account settings
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
              >
                Support
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
              >
                License
              </a>
            </MenuItem>
            <form action="#" method="POST">
              <MenuItem>
                <button
                  type="submit"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
                >
                  Sign out
                </button>
              </MenuItem>
            </form>
          </div>
        </MenuItems>
      </Menu>
    )
  }

  return null
}
