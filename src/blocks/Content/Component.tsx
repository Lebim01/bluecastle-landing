'use client'
import React, { useEffect, useRef, useState } from 'react'
import RichText from '@/components/RichText'
import type { Page } from '@/payload-types'
import { getHrefFromLink } from '@/components/ui/link-utils'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type ContentLayoutBlock = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'content' }
>

type Props = ContentLayoutBlock & { className?: string }

const SIZE_TO_COL: Record<string, string> = {
  oneThird: 'lg:col-span-4',
  half: 'lg:col-span-6',
  twoThirds: 'lg:col-span-8',
  full: 'lg:col-span-12',
}

// helpers de estilo para media
const roundedMap: Record<string, string> = {
  none: 'rounded-none',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full overflow-hidden',
}

const aspectMap: Record<string, string> = {
  auto: '',
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
}

const fitMap: Record<string, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
}

const bgColorMap: Record<string, string> = {
  transparent: 'bg-transparent',
  white: 'bg-white',
  black: 'bg-black',
  'slate-50': 'bg-slate-50',
  'slate-100': 'bg-slate-100',
  'slate-900': 'bg-slate-900',
}

const objectPosMap: Record<string, string> = {
  top: 'object-top',
  center: 'object-center',
  bottom: 'object-bottom',
  left: 'object-left',
  right: 'object-right',
  'top-left': 'object-left-top',
  'top-right': 'object-right-top',
  'bottom-left': 'object-left-bottom',
  'bottom-right': 'object-right-bottom',
}

const objectSizeMap: Record<string, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  original: 'object-none',
}

const pyMap: Record<string, string> = {
  none: 'py-0',
  sm: 'py-6',
  md: 'py-10',
  lg: 'py-16',
  xl: 'py-24',
}

const heightPreset = (h?: string) =>
  h === 'sm'
    ? 'min-h-[260px]'
    : h === 'md'
      ? 'min-h-[360px]'
      : h === 'lg'
        ? 'min-h-[480px]'
        : h === 'xl'
          ? 'min-h-[600px]'
          : h === 'screen'
            ? 'min-h-screen'
            : h === 'full'
              ? 'h-full'
              : '' // auto


export const ContentBlock: React.FC<Props> = ({ columns, className }) => {
  if (!columns?.length) return null

  return (
    <section className={`w-full py-12 ${className ?? ''}`}>
      <div className="mx-auto sm:px-6 lg:px-2">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {columns.map((col, i) => {
            const span = SIZE_TO_COL[col?.size ?? 'oneThird'] ?? 'lg:col-span-4'
            const elements = Array.isArray(col?.elements) ? col.elements : []

            return (
              <div key={i} className={`col-span-12 ${span}`}>
                {(() => {
                  const surface = (col as any)?.surface || {}
                  const bgImage = (col as any)?.bgImage || {}
                  const height = (col as any)?.height || 'auto'
                  const customHeightPx = (col as any)?.customHeightPx
                  const paddingY = (col as any)?.paddingY || 'md'
                  const isDarkBg = ['black', 'slate-900'].includes(surface?.bgColor)
                  const rounded = roundedMap[surface?.rounded ?? '2xl'] || ''
                  const shadow = surface?.shadow ? 'shadow-md' : ''
                  const bg = bgColorMap[surface?.bgColor ?? 'transparent'] || ''

                  // wrapper: relative + overflow-hidden para recortar la imagen absoluta
                  const wrapperCls = [
                    'relative overflow-hidden',
                    bg,
                    rounded,
                    shadow,
                    pyMap[paddingY] || '',
                    heightPreset(height),
                  ]
                    .filter(Boolean)
                    .join(' ')

                  const style: React.CSSProperties | undefined =
                    height === 'custom' && Number(customHeightPx) > 0
                      ? { minHeight: Number(customHeightPx) }
                      : undefined;

                  // src de la bg image
                  const bgSrc = (bgImage?.externalUrl as string) || getMediaUrl(bgImage?.image)

                  const imgOpacity =
                    typeof bgImage?.opacity === 'number'
                      ? Math.max(0, Math.min(100, bgImage.opacity)) / 100
                      : 1

                  return (
                    <div className={wrapperCls} style={style}>
                      {/* Imagen de fondo ABSOLUTA (opcional) */}
                      {bgImage?.enabled && bgSrc && (
                        <img
                          src={bgSrc}
                          alt=""
                          aria-hidden="true"
                          className={[
                            'pointer-events-none select-none',
                            'absolute inset-0 w-full h-full',
                            objectSizeMap[bgImage?.size ?? 'cover'] || 'object-cover',
                            objectPosMap[bgImage?.position ?? 'bottom'] || 'object-bottom',
                          ].join(' ')}
                          style={{ opacity: imgOpacity }}
                          loading="lazy"
                        />
                      )}

                      {/* CONTENIDO encima - z-10 */}
                      <div className={`relative z-10 space-y-6 px-6 ${isDarkBg ? 'text-white' : 'text-gray-900'}`}>
                        {col?.richText?.root && (
                          <div className={`prose max-w-none ${isDarkBg ? 'prose-invert' : ''}`}>
                            <RichText data={col.richText} enableGutter={false} />
                          </div>
                        )}

                        {col?.enableLink && (col as any)?.link && (
                          <CtaButton
                            label={(col as any)?.link?.label ?? 'Learn more'}
                            link={(col as any).link}
                            variant="primary"
                            align="start"
                          />
                        )}

                        {elements.map((el: any, idx: number) => {
                          switch (el?.blockType) {
                            case 'text': {
                              const align =
                                el?.align === 'center'
                                  ? 'text-center'
                                  : el?.align === 'end'
                                    ? 'text-right'
                                    : 'text-left'
                              return (
                                <div key={idx} className={`prose max-w-none ${align} data-[surface=dark]:prose-invert`}>
                                  <RichText data={el.content} enableGutter={false} />
                                </div>
                              )
                            }
                            case 'media': {
                              const rounded = roundedMap[el?.rounded ?? '2xl']
                              const aspect = aspectMap[el?.aspect ?? '16/9']
                              const fit = fitMap[el?.objectFit ?? 'cover']
                              const shadow = el?.shadow ? 'shadow-md' : ''
                              const src: string =
                                (el?.externalUrl as string) || getMediaUrl(el?.media) || ''
                              const isVideo = el?.media?.mimeType?.startsWith?.('video') || /\.(mp4|webm|ogg)(\?|#|$)/i.test(src)
                              const vo = el?.videoOptions || {}
                              const showOverlay = vo?.showOverlayControl ?? true
                              const autoplay = vo?.autoplay ?? true
                              const muted = vo?.muted ?? true
                              const loop = vo?.loop ?? true
                              const poster = vo?.poster

                              return (
                                <div key={idx} className={`${rounded} ${shadow} ${aspect} relative overflow-hidden`}>
                                  {src ? (
                                    isVideo ? (
                                      showOverlay ? (
                                        <VideoWithOverlay
                                          src={src}
                                          poster={poster}
                                          autoplay={autoplay}
                                          muted={muted}
                                          loop={loop}
                                          fitClass={fit}
                                        />
                                      ) : (
                                        <video
                                          className={`h-full w-full ${fit}`}
                                          src={src}
                                          poster={poster}
                                          controls
                                          playsInline
                                          autoPlay={autoplay}
                                          muted={muted}
                                          loop={loop}
                                        />
                                      )
                                    ) : (
                                      <img className={`h-full w-full ${fit}`} src={src} alt={el?.media?.alt || 'media'} loading="lazy" />
                                    )
                                  ) : (
                                    <div className="rounded-lg border border-dashed p-6 text-sm text-gray-500">Media no configurada</div>
                                  )}
                                </div>
                              )
                            }
                            case 'cta': {
                              return (
                                <CtaButton
                                  key={idx}
                                  label={el?.label ?? 'Ver más'}
                                  link={el?.link}
                                  variant={el?.variant ?? 'primary'}
                                  align={el?.align ?? 'start'}
                                  fullWidth={!!el?.fullWidth}
                                />
                              )
                            }
                            default:
                              return null
                          }
                        })}
                      </div>
                    </div>
                  )
                })()}
              </div>
            )

          })}
        </div>
      </div>
    </section>
  )
}

function CtaButton({
  label,
  link,
  variant = 'primary',
  align = 'start',
  fullWidth = false,
}: {
  label: string
  link: any
  variant?: 'primary' | 'secondary' | 'link'
  align?: 'start' | 'center' | 'end'
  fullWidth?: boolean
}) {
  const href =
    (typeof getHrefFromLink === 'function' && getHrefFromLink(link)) ||
    link?.url ||
    link?.href ||
    '#'

  const alignCls =
    align === 'center' ? 'justify-center' : align === 'end' ? 'justify-end' : 'justify-start'

  const base =
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition'

  const variantCls =
    variant === 'secondary'
      ? 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
      : variant === 'link'
        ? 'bg-transparent text-gray-900 underline underline-offset-4 hover:opacity-80'
        : 'bg-gray-900 text-white hover:bg-black'

  const widthCls = fullWidth ? 'w-full' : 'w-auto'

  return (
    <div className={`flex ${alignCls}`}>
      <a href={href} className={`${base} ${variantCls} ${widthCls}`}>
        {label}
      </a>
    </div>
  )
}

function VideoWithOverlay({
  src,
  poster,
  autoplay = true,
  muted = true,
  loop = true,
  fitClass = 'object-cover',
}: {
  src: string
  poster?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  fitClass?: string
}) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState<boolean>(autoplay && muted)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.muted = !!muted
    el.loop = !!loop

    if (autoplay) {
      const p = el.play()
      if (p && typeof p.catch === 'function') {
        p.catch(() => {

          setPlaying(false)
        })
      } else {
        setPlaying(true)
      }
    }
  }, [autoplay, muted, loop])

  const toggle = () => {
    const el = ref.current
    if (!el) return
    if (el.paused) {
      el.play()
      setPlaying(true)
    } else {
      el.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <video
        ref={ref}
        className={`h-full w-full ${fitClass}`}
        src={src}
        poster={poster}
        playsInline
        controls={false}
        muted={muted}
        loop={loop}
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pausar video' : 'Reproducir video'}
        aria-pressed={playing}
        className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-white text-gray-900 shadow-md ring-1 ring-black/10 flex items-center justify-center hover:opacity-90"
      >
        {playing ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1.2"></rect>
            <rect x="14" y="5" width="4" height="14" rx="1.2"></rect>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7-11-7z"></path>
          </svg>
        )}
      </button>
    </>
  )
}
