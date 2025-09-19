import LottieClient from './LottieClient'

type UploadDoc = { url?: string }

export type LottieBlock = {
  sourceType: 'upload' | 'url' | 'inline'
  file?: UploadDoc | string | null
  url?: string | null
  json?: any
  autoplay?: boolean
  loop?: boolean
  playOnHover?: boolean
  playOnView?: boolean
  speed?: number
  direction?: 1 | -1
  renderer?: 'svg' | 'canvas' | 'html'
  preserveAspectRatio?: string
  width?: string
  height?: string
  background?: string
  className?: string
  ariaLabel?: string
  fallbackImage?: UploadDoc | string | null
  rendererSettings?: Record<string, any>
}

export default function Lottie({ block }: { block: LottieBlock }) {
  const src =
    block.sourceType === 'url'
      ? block.url ?? ''
      : block.sourceType === 'upload'
        ? (typeof block.file === 'object' ? block.file?.url : '') ?? ''
        : '' // inline usa block.json

  const fallbackSrc =
    typeof block.fallbackImage === 'object' ? block.fallbackImage?.url : undefined

  return (
    <LottieClient
      src={src}
      inlineJSON={block.sourceType === 'inline' ? block.json : undefined}
      autoplay={block.autoplay ?? true}
      loop={block.loop ?? true}
      playOnHover={block.playOnHover ?? false}
      playOnView={block.playOnView ?? true}
      speed={block.speed ?? 1}
      direction={block.direction ?? 1}
      renderer={block.renderer ?? 'svg'}
      preserveAspectRatio={block.preserveAspectRatio ?? 'xMidYMid meet'}
      width={block.width ?? '100%'}
      height={block.height ?? 'auto'}
      background={block.background ?? 'transparent'}
      className={block.className}
      ariaLabel={block.ariaLabel ?? 'Animación'}
      fallbackSrc={fallbackSrc}
      rendererSettings={block.rendererSettings}
    />
  )
}
