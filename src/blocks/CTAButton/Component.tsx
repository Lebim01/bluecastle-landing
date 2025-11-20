'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import type { Page } from '@/payload-types'

type CTABlock = Extract<Page['layout'][number], { blockType: 'ctaBlock' }>

type AnyLink = {
  type?: 'internal' | 'custom'
  url?: string
  newTab?: boolean
}

type SolidColor = {
  bg: string
  text: string
}

type Props = {
  label: string
  link?: AnyLink | null
  variant?:
    | 'primary'
    | 'secondary'
    | 'link'
    | 'solid'
    | 'bordered'
    | 'faded'
    | 'light'
    | 'ghost'
    | 'shadow'
  'solid-color'?: SolidColor
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  radius?: 'none' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  fullWidth?: boolean
  align?: 'start' | 'center' | 'end'
  isDisabled?: boolean
  isLoading?: boolean
}

const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  xs: 'text-xs px-2 py-1',
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm md:text-base px-4 py-2',
  lg: 'text-base md:text-lg px-5 py-2.5',
  xl: 'text-lg md:text-xl px-6 py-3',
}

const radiusClasses: Record<NonNullable<Props['radius']>, string> = {
  none: 'rounded-none',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
}

function mapLegacyVariant(variant?: Props['variant']) {
  if (variant === 'primary') return 'solid'
  if (variant === 'secondary') return 'bordered'
  return variant ?? 'solid'
}

const variantClasses = (variant?: Props['variant'], color?: SolidColor) => {
  const v = mapLegacyVariant(variant)

  switch (v) {
    case 'solid':
      return `hover:bg-primary/90`
    case 'bordered':
      return 'border border-primary text-primary bg-transparent hover:bg-primary/10'
    case 'faded':
      return 'bg-primary/10 text-primary hover:bg-primary/15'
    case 'light':
      return 'bg-transparent text-primary hover:bg-primary/10'
    case 'ghost':
      return 'bg-transparent text-primary underline-offset-4 hover:underline'
    case 'shadow':
      return 'bg-primary text-primary-foreground shadow-lg hover:shadow-xl'
    case 'link':
      return 'bg-transparent text-primary underline underline-offset-4 hover:no-underline'
    default:
      return 'bg-primary text-primary-foreground hover:bg-primary/90'
  }
}

const variantStyles = (variant?: Props['variant'], color?: SolidColor) => {
  const v = mapLegacyVariant(variant)

  switch (v) {
    case 'solid': {
      return {
        background: `${color?.bg || 'var(--secondary)'}`,
        color: `${color?.text || 'var(--secondary-foreground)'}`,
      }
    }
    default: {
      return {}
    }
  }
}

const alignWrapper: Record<NonNullable<Props['align']>, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
}

const baseBtn =
  'inline-flex items-center justify-center font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed select-none'

function resolveHref(l?: AnyLink | null): { href: string; target?: string; rel?: string } {
  if (!l) return { href: '#' }
  const href = l.url || '#'
  const target = l.newTab ? '_blank' : undefined
  const rel = l.newTab ? 'noopener noreferrer' : undefined
  return { href, target, rel }
}

export default function CTABlockComponent(props: Props) {
  const {
    label,
    link,
    variant = 'solid',
    size = 'md',
    radius = '2xl',
    fullWidth = false,
    align = 'start',
    isDisabled = false,
    isLoading = false,
  } = props

  const { href, target, rel } = resolveHref(link)

  const ButtonInner = (
    <span className={cn(isLoading && 'pointer-events-none')}>
      {isLoading ? 'Cargando…' : label}
    </span>
  )

  const btnClass = cn(
    baseBtn,
    sizeClasses[size],
    radiusClasses[radius],
    variantClasses(variant, props['solid-color']),
    fullWidth ? 'w-full' : undefined,
  )
  const styles = variantStyles(variant, props['solid-color'])

  return (
    <div className={cn('flex', alignWrapper[align])}>
      {href === '#' ? (
        <button
          className={btnClass}
          disabled={isDisabled || isLoading}
          type="button"
          style={styles}
        >
          {ButtonInner}
        </button>
      ) : (
        <Link
          href={href}
          target={target}
          rel={rel}
          className={btnClass}
          aria-disabled={isDisabled || isLoading}
          style={styles}
        >
          {ButtonInner}
        </Link>
      )}
    </div>
  )
}
