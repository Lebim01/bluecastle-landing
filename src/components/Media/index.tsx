import React, { Fragment } from 'react'

import type { Props } from './types'

import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'

export const Media: React.FC<Props> = (props) => {
  const { className, resource } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')

  return (
    <div className={className}>
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </div>
  )
}
