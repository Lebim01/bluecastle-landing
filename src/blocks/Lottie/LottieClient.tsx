'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  src?: string
  inlineJSON?: any
  autoplay: boolean
  loop: boolean
  playOnHover: boolean
  playOnView: boolean
  speed: number
  direction: 1 | -1
  renderer: 'svg' | 'canvas' | 'html'
  preserveAspectRatio: string
  width: string
  height: string
  background: string
  className?: string
  ariaLabel: string
  fallbackSrc?: string
  rendererSettings?: Record<string, any>
}

export default function LottieClient(props: Props) {
  const {
    src,
    inlineJSON,
    autoplay,
    loop,
    playOnHover,
    playOnView,
    speed,
    direction,
    renderer,
    preserveAspectRatio,
    width,
    height,
    background,
    className,
    ariaLabel,
    fallbackSrc,
    rendererSettings,
  } = props

  const containerRef = useRef<HTMLDivElement | null>(null)
  const animRef = useRef<any>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let mounted = true
    let cleanupHover: (() => void) | null = null
    let observer: IntersectionObserver | null = null

      ; (async () => {
        try {
          const lottie = await (await import('lottie-web/build/player/lottie_light')).default
          if (!mounted || !containerRef.current) return

          // destruir previa si re-render
          animRef.current?.destroy?.()

          const options: any = {
            container: containerRef.current,
            renderer,
            loop,
            autoplay,
            rendererSettings: {
              preserveAspectRatio,
              progressiveLoad: true,
              ...rendererSettings,
            },
          }

          if (inlineJSON) options.animationData = inlineJSON
          else if (src) options.path = src
          else throw new Error('Sin fuente Lottie')

          const anim = lottie.loadAnimation(options)
          animRef.current = anim

          anim.setSpeed(speed)
          anim.setDirection(direction)

          // Hover
          if (playOnHover) {
            const el = containerRef.current
            const onEnter = () => anim.play()
            const onLeave = () => anim.pause()
            el.addEventListener('mouseenter', onEnter)
            el.addEventListener('mouseleave', onLeave)
            cleanupHover = () => {
              el.removeEventListener('mouseenter', onEnter)
              el.removeEventListener('mouseleave', onLeave)
            }
          }

          // Play on view
          if (playOnView) {
            observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((e) => {
                  if (e.isIntersecting) anim.play()
                  else anim.pause()
                })
              },
              { threshold: 0.2 }
            )
            observer.observe(containerRef.current)
          }
        } catch (e) {
          console.error('Lottie error:', e)
          setFailed(true)
        }
      })()

    return () => {
      mounted = false
      cleanupHover?.()
      observer?.disconnect()
      animRef.current?.destroy?.()
      animRef.current = null
    }
  }, [
    src,
    inlineJSON,
    autoplay,
    loop,
    playOnHover,
    playOnView,
    speed,
    direction,
    renderer,
    preserveAspectRatio,
    rendererSettings,
  ])

  const style: React.CSSProperties = {
    width,
    height,
    background,
    display: 'inline-block',
    overflow: 'hidden',
  }

  if (failed && fallbackSrc) {
    return (
      // Fallback <img>
      // eslint-disable-next-line @next/next/no-img-element
      <img src={fallbackSrc} alt={ariaLabel} style={style} className={className} />
    )
  }

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={ariaLabel}
      className={className}
      style={style}
    />
  )
}
