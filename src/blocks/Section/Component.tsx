import React from 'react'
import type { Media, SectionBlock } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const containerClass = (c?: string) =>
  c === 'full'
    ? 'w-full'
    : cx(
      'mx-auto',
      c === 'sm' && 'max-w-screen-sm px-4',
      c === 'md' && 'max-w-screen-md px-4',
      (c === 'lg' || !c) && 'max-w-screen-lg px-6',
      c === 'xl' && 'max-w-screen-xl px-6',
    )

const paddingYClass = (p?: string) =>
  (p === 'none' && 'py-0') ||
  (p === 'sm' && 'py-8') ||
  (p === 'md' && 'py-12') ||
  (p === 'lg' && 'py-16') ||
  (p === 'xl' && 'py-24') ||
  'py-16'

const heightClass = (h?: string) =>
  (h === 'half' && 'min-h-[50vh]') ||
  (h === 'screen' && 'min-h-screen') ||
  (h === 'custom' && '') ||
  ''

const backgroundClass = (b?: string) =>
  (b === 'muted' && 'bg-neutral-50') ||
  (b === 'brand' && 'bg-blue-600 text-white') ||
  (b === 'dark' && 'bg-neutral-900 text-white') ||
  ''

const mediaUrl = (m?: string | number | Media | null) => {
  if (!m || typeof m === 'string' || typeof m === 'number') return undefined
  return m.url ?? undefined
}

export const Section: React.FC<SectionBlock & { id?: string }> = (props) => {
  const {
    id,
    container,
    paddingY,
    height,
    customHeight,
    background,
    bgImage,
    video,
    content,
  } = props as SectionBlock & {
    video?: any
  }

  const posterUrl =
    (video?.poster && mediaUrl(video.poster as any)) || (bgImage && mediaUrl(bgImage as any))


  const isMediaBg = background === 'image' || background === 'video'

  return (
    <section
      id={props.id || id || undefined}
      className={cx(
        paddingYClass(paddingY!),
        heightClass(height!),
        isMediaBg ? 'relative overflow-hidden' : backgroundClass(background!),
      )}
      style={
        height === 'custom' && customHeight
          ? { minHeight: `${customHeight}px` }
          : undefined
      }
    >
      {background === 'image' && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage: bgImage ? `url(${mediaUrl(bgImage as any)})` : undefined,
          }}
        />
      )}

      {background === 'video' && (
        <>

          <video
            className={cx(
              'absolute inset-0 -z-10 h-full w-full',
              video?.fit === 'contain' ? 'object-contain' : 'object-cover',
              video?.disableOnMobile ? 'hidden md:block' : 'block',
            )}
            autoPlay={!!video?.autoplay}
            muted={video?.muted !== false}
            loop={!!video?.loop}
            playsInline={!!video?.playsInline}
            preload="auto"
            poster={posterUrl}
          >
            {video?.sourceType === 'external' ? (
              <source src={video?.url || ''} />
            ) : (
              <source src={mediaUrl(video?.file as any)} />
            )}
          </video>
          {(video?.disableOnMobile || posterUrl) && (
            <div
              aria-hidden
              className={cx(
                'absolute inset-0 -z-10 bg-center bg-cover',
                video?.disableOnMobile ? 'block md:hidden' : 'hidden',
              )}
              style={posterUrl ? { backgroundImage: `url(${posterUrl})` } : undefined}
            />
          )}
          {video?.overlay?.show && (
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                backgroundColor: video?.overlay?.color || '#000',
                opacity:
                  typeof video?.overlay?.opacity === 'number'
                    ? video.overlay.opacity
                    : 0.35,
              }}
            />
          )}
        </>
      )}

      <div className={containerClass(container!)}>
        <RenderBlocks blocks={content || []} />
      </div>
    </section>
  )
}
