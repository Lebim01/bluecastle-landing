import React from 'react'
import { RenderBlocks } from '../RenderBlocks'

type Props = {
  content: {
    title: any[]
    description: any[]
  }
  items: Array<{
    neighborhood: string
    productName: string
  }>
}

export default function NeighborhoodSectionComponent(props: Props) {
  const { content, items } = props

  return (
    <section className="bg-[#00084d] py-20 md:py-32 px-6 text-white overflow-hidden">
      <div className="max-w-[75rem] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-16 md:gap-24 items-center">
        
        {/* Left Content */}
        <div className="max-w-[32rem]">
          <div className="font-playfair text-4xl md:text-6xl font-bold leading-[1.1] mb-10 text-shadow-md [&_em]:italic [&_em]:text-[#22D3EE] [&_h2]:m-0">
            <RenderBlocks blocks={content.title} />
          </div>
          <div className="font-sans text-lg md:text-xl text-white/80 leading-relaxed font-light">
            <RenderBlocks blocks={content.description} />
          </div>
        </div>

        {/* Right Content - Visual Lines & Names */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 h-full items-end">
          {items?.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              {/* Vertical Line Container */}
              <div className="relative h-24 md:h-32 w-px mb-8 overflow-visible">
                {/* The glowing line */}
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-full"
                  style={{
                    background: 'linear-gradient(to top, #2563eb 0%, transparent 100%)',
                    boxShadow: '0 0 15px rgba(37, 99, 235, 0.4)'
                  }}
                />
              </div>

              {/* Text Content - Absolute Center aligned with line */}
              <div className="text-center w-full min-w-0">
                <span className="block font-sans text-xs md:text-sm text-white/60 mb-1 uppercase tracking-widest truncate">
                  {item.neighborhood}
                </span>
                <span className="block font-playfair italic text-lg md:text-2xl font-bold leading-tight">
                  {item.productName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
