import React from 'react'
import type { Media, SectionBlock } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks' // usamos render recursivo

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ')
}

const containerClass = (c?: string) =>
  c === 'full'
    ? 'w-full'
    : cx(
        'mx-auto',
        c === 'sm' && 'max-w-screen-sm px-4',
        c === 'md' && 'max-w-screen-md px-4',
        c === 'lg' && 'max-w-screen-lg px-6',
        c === 'xl' && 'max-w-screen-xl px-6',
        (!c || c === 'lg') && 'max-w-screen-lg px-6',
      )

const paddingYClass = (p?: string) =>
  (p === 'none' && 'py-0') ||
  (p === 'sm' && 'py-8') ||
  (p === 'md' && 'py-12') ||
  (p === 'lg' && 'py-16') ||
  (p === 'xl' && 'py-24') ||
  'py-16'

const backgroundClass = (b?: string) =>
  (b === 'muted' && 'bg-neutral-50') ||
  (b === 'brand' && 'bg-blue-600 text-white') ||
  (b === 'dark' && 'bg-neutral-900 text-white') ||
  '' // default

const mediaUrl = (m?: string | number | Media | null) => {
  if (!m || typeof m === 'string' || typeof m === 'number') return undefined
  return m.url ?? undefined
}

export const Section: React.FC<SectionBlock & { id?: string }> = (props) => {
  const { id, container, paddingY, background, bgImage, content } = props
  const url = mediaUrl(bgImage as any)

  return (
    <section
      id={props.id || id || undefined}
      className={cx(paddingYClass(paddingY || "sm"), backgroundClass(background || "default"))}
      style={
        background === 'image' && url
          ? { backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : undefined
      }
    >
      <div className={containerClass(container || "full")}>
        <RenderBlocks blocks={content || []} />
      </div>
    </section>
  )
}
