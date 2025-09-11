import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { HeaderNavItem, LinkField, Page, Post } from '@/payload-types'

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

  }

  return null
}
