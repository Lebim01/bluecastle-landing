import React from 'react'

type TipoDeContenido = 'imagen' | 'video'
type Origen = 'biblioteca' | 'url'

type AjustesVideo = {
  reproducirAutomatico?: boolean
  silenciar?: boolean
  mostrarControles?: boolean
  repetir?: boolean
}

export type MediaBlockProps = {
  tituloInterno?: string
  tipoDeContenido: TipoDeContenido
  origen: Origen
  media?: {
    url?: string
    mimeType?: string
    alt?: string
  }
  mediaUrl?: string
  alineacion?: 'left' | 'center' | 'right'
  tamaño?: 'auto' | 'small' | 'medium' | 'large' | 'fullWidth'
  proporcion?: 'auto' | '16-9' | '4-3' | '9-16' | '1-1'
  textoAlternativo?: string
  pieDeFoto?: string
  ajustesVideo?: AjustesVideo
}

type Props = {
  block: MediaBlockProps
  className?: string
}

const getAlignClass = (alineacion?: MediaBlockProps['alineacion']) => {
  switch (alineacion) {
    case 'left':
      return 'ml-0 mr-auto text-left'
    case 'right':
      return 'ml-auto mr-0 text-right'
    case 'center':
    default:
      return 'mx-auto text-center'
  }
}

const getSizeClass = (tamaño?: MediaBlockProps['tamaño']) => {
  switch (tamaño) {
    case 'small':
      return 'max-w-md'
    case 'medium':
      return 'max-w-2xl'
    case 'large':
      return 'max-w-4xl'
    case 'fullWidth':
      return 'w-full max-w-none'
    case 'auto':
    default:
      return 'max-w-3xl'
  }
}

const getAspectClass = (proporcion?: MediaBlockProps['proporcion']) => {
  switch (proporcion) {
    case '16-9':
      return 'aspect-video'
    case '4-3':
      return 'aspect-[4/3]'
    case '9-16':
      return 'aspect-[9/16]'
    case '1-1':
      return 'aspect-square'
    case 'auto':
    default:
      return ''
  }
}

const isEmbedProvider = (url: string) => {
  const lower = url.toLowerCase()
  return lower.includes('youtube.com') || lower.includes('youtu.be') || lower.includes('vimeo.com')
}

export const MediaBlockComponent: React.FC<MediaBlockProps> = (block: MediaBlockProps) => {
  const {
    tipoDeContenido,
    origen,
    media,
    mediaUrl,
    alineacion,
    tamaño,
    proporcion,
    textoAlternativo,
    pieDeFoto,
    ajustesVideo,
  } = block

  const src = origen === 'biblioteca' ? (media?.url ?? '') : (mediaUrl ?? '').trim()

  if (!src) {
    // Si no hay fuente, no renderizamos nada
    return null
  }

  const alt = textoAlternativo?.trim() || media?.alt?.trim() || 'Contenido multimedia'

  const containerAlign = getAlignClass(alineacion)
  const containerSize = getSizeClass(tamaño)
  const aspectClass = getAspectClass(proporcion)

  const isVideo = tipoDeContenido === 'video'

  const autoPlay = ajustesVideo?.reproducirAutomatico ?? false
  const muted = ajustesVideo?.silenciar ?? true
  const controls = ajustesVideo?.mostrarControles ?? true
  const loop = ajustesVideo?.repetir ?? false

  return (
    <figure
      className={['media-block my-6', containerAlign, containerSize].filter(Boolean).join(' ')}
    >
      <div
        className={[
          'relative overflow-hidden rounded-lg',
          aspectClass || '',
          isVideo ? 'bg-black/80' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {isVideo ? (
          isEmbedProvider(src) ? (
            // Videos de proveedores externos (YouTube, Vimeo) como iframe
            <iframe
              src={src}
              title={alt}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            // Video directo (MP4, etc.)
            <video
              className={['h-full w-full object-cover', aspectClass && 'absolute inset-0']
                .filter(Boolean)
                .join(' ')}
              src={src}
              autoPlay={autoPlay}
              muted={muted}
              controls={controls}
              loop={loop}
              playsInline
            >
              Tu navegador no puede reproducir este video.
            </video>
          )
        ) : (
          // Imagen
          <img
            src={src}
            alt={alt}
            className={['h-auto w-full object-cover', aspectClass && 'h-full']
              .filter(Boolean)
              .join(' ')}
            loading="lazy"
          />
        )}
      </div>

      {pieDeFoto && <figcaption className="mt-2 text-sm text-gray-600">{pieDeFoto}</figcaption>}
    </figure>
  )
}

export default MediaBlockComponent
