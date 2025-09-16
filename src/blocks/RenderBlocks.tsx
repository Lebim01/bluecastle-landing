import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { Section } from './Section/Component'
import CarouselBlockComponent from '@/blocks/Carousel/Component'
import HeroBlockComponent from '@/blocks/HeroBlock/Component'
import { FAQBlock } from './Faq/Component'
import { TestimonialsBlock } from './TestimonialsBlock/Component'
import { TradingViewBlock } from './TradingViewBlock/Component'
import Calculator from './PlansCalculator'
import TimelineBlock from './Timeline/Component'


const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  mediaBlock: MediaBlock,
  section: Section,
  carousel: CarouselBlockComponent,
  heroBlock: HeroBlockComponent,
  faq: FAQBlock,
  testimonials: TestimonialsBlock,
  tradingView: TradingViewBlock,
  calculator: Calculator,
  timeline: TimelineBlock,
}

const gapYClass = (gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl') => {
  switch (gap) {
    case 'sm': return 'my-4'
    case 'md': return 'my-8'
    case 'lg': return 'my-16'
    case 'xl': return 'my-24'
    default: return ''
  }
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  gapY?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}> = ({ blocks, gapY = 'none' }) => {
  const hasBlocks = Array.isArray(blocks) && blocks.length > 0
  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.filter(Boolean).map((block, index) => {
        const { blockType } = block
        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType as keyof typeof blockComponents]
          const wrapClass = blockType === 'section' ? '' : gapYClass(gapY)

          return (
            <div key={index} className={wrapClass}>
              {/* @ts-expect-error  */}
              <Block {...block} disableInnerContainer />
            </div>
          )
        }
        return null
      })}
    </Fragment>
  )
}
