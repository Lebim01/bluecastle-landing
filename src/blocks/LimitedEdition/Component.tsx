import React from 'react'
import { RenderBlocks } from '../RenderBlocks'

type Props = {
  header: {
    tag: string
    title: any[]
    description: any[]
  }
  cards: Array<{
    title: string
    description: string
    features: Array<{
      label: string
      value: string
    }>
    buttonLabel: string
  }>
}

export default function LimitedEditionComponent(props: Props) {
  const { header, cards } = props

  return (
    <section className="bg-white py-20 md:py-32 px-6">
      <div className="max-w-[75rem] mx-auto">
        {/* Header Section - 2 Columns */}
        <div className="mb-16 md:mb-24">
          <span className="text-blue-700 font-extrabold text-sm md:text-base uppercase tracking-[0.2em] mb-8 block">
            {header.tag}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-baseline">
            <div className="font-playfair text-5xl md:text-[5rem] font-bold text-neutral-950 leading-[1.05] [&_em]:italic [&_h2]:m-0">
              <RenderBlocks blocks={header.title} />
            </div>
            <div className="font-sans text-lg md:text-xl text-neutral-700 leading-relaxed font-normal max-w-[32rem]">
              <RenderBlocks blocks={header.description} />
            </div>
          </div>
        </div>

        {/* Cards Grid - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {cards?.map((card, idx) => (
            <div 
              key={idx}
              className="group relative rounded-[2rem] p-10 md:p-14 flex flex-col h-full bg-white transition-all duration-300 hover:shadow-2xl"
              style={{
                border: '3px solid transparent',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #2563eb, #1e40af, #000000)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            >
              <h3 className="font-playfair text-5xl md:text-[4.5rem] font-bold text-neutral-900 mb-10 leading-[1]">
                {card.title}
              </h3>
              
              <p className="font-sans text-neutral-600 text-sm md:text-base leading-relaxed mb-12 font-normal opacity-90">
                {card.description}
              </p>

              <div className="border-t border-neutral-100 pt-10 mt-auto mb-12">
                <div className="flex flex-col gap-4">
                  {card.features?.map((feat, fIdx) => (
                    <div key={fIdx} className="flex justify-between items-baseline gap-4">
                      <span className="text-blue-600 font-bold text-sm tracking-tight">
                        {feat.label}
                      </span>
                      <span className="text-neutral-900 font-medium text-sm md:text-base text-right">
                        {feat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full bg-[#001AFF] text-white font-bold py-5 rounded-xl hover:bg-blue-800 transition-all duration-300 text-lg shadow-lg">
                {card.buttonLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
