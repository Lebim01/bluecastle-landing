import React from 'react'
import { RenderBlocks } from '../RenderBlocks'
import clsx from 'clsx'

type Props = {
  header: {
    tag: string
    title: any[]
    description: any[]
  }
  cards: Array<{
    badge: string
    title: string
    description: string
    features: Array<{
      label: string
      value: string
    }>
    buttonLabel: string
  }>
}

export default function CoreCollectionComponent(props: Props) {
  const { header, cards } = props

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-[75rem] mx-auto">
        {/* Header Section */}
        <div className="max-w-[36rem] mb-16 md:mb-20">
          <span className="text-blue-700 font-extrabold text-sm md:text-base uppercase tracking-[0.2em] mb-6 block">
            {header.tag}
          </span>
          <div className="font-playfair text-4xl md:text-[4.5rem] font-bold text-neutral-950 mb-8 leading-[1.05] [&_em]:italic [&_h2]:m-0">
            <RenderBlocks blocks={header.title} />
          </div>
          <div className="font-sans text-lg md:text-xl text-neutral-600 leading-relaxed font-light">
            <RenderBlocks blocks={header.description} />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards?.map((card, idx) => (
            <div 
              key={idx}
              className="group relative rounded-[2rem] p-8 md:p-10 flex flex-col h-full bg-white transition-all duration-300 hover:shadow-2xl"
              style={{
                border: '3px solid transparent',
                backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #2563eb, #1e40af, #000000)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            >
              <span className="text-blue-700 font-bold text-[0.75rem] uppercase tracking-[0.15em] mb-8">
                {card.badge}
              </span>
              
              <h3 className="font-playfair text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-[1.1]">
                {card.title}
              </h3>
              
              <p className="font-sans text-neutral-600 text-sm md:text-[1.05rem] leading-relaxed mb-10 font-normal opacity-90">
                {card.description}
              </p>

              <div className="border-t border-neutral-100 pt-8 mt-auto mb-10">
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

              <button className="w-full bg-[#001AFF] text-white font-bold py-4 rounded-lg hover:bg-blue-800 transition-all duration-300 text-base shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]">
                {card.buttonLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
