import { Media } from '@/payload-types'
import React from 'react'
import { RenderBlocks } from '../RenderBlocks'
import clsx from 'clsx'

type Props = {
  id: string
  blockType: 'heroBlockNoConfig'
  bg: Media
  'left-side': {
    align: 'bottom' | 'top'
    content: any[] //blocks
  }
  'right-side': {
    align: 'bottom' | 'top'
    content: any[] //blocks
  }
  'height-aspect': 'full' | 'percent'
  height?: number
}

export default function HeroNoCBlockComponent(props: Props) {
  return (
    <div
      className={clsx(`w-full bg-no-repeat bg-center bg-cover relative text-white hero-text-shadow`)}
      style={{
        backgroundImage: `url(${props.bg.url!})`,
        height: props['height-aspect'] == 'full' ? '100dvh' : `${props.height!}dvh`,
      }}
    >
      <div
        className={clsx(
          'absolute left-0 p-12 flex flex-col gap-4 text-shadow-xl',
          props['left-side'].align == 'top' ? 'top-0' : 'bottom-0',
        )}
      >
        <RenderBlocks blocks={props['left-side'].content} />
      </div>
      <div
        className={clsx(
          'absolute right-0 p-12 flex flex-col gap-4 items-end',
          props['right-side'].align == 'top' ? 'top-0' : 'bottom-0',
        )}
      >
        <RenderBlocks blocks={props['right-side'].content} />
      </div>
    </div>
  )
}
