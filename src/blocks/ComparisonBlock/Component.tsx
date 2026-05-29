import React from 'react'
import { RenderBlocks } from '../RenderBlocks'

type Props = {
  header: {
    tag: string
    title: any[]
  }
  rows: Array<{
    product: string
    type: string
    minimum: string
    return: string
    term: string
    statuts: string
  }>
  cta: {
    label: string
    title: any[]
    primaryButton: string
    secondaryButton: string
  }
}

export default function ComparisonBlockComponent(props: Props) {
  const { header, rows, cta } = props

  return (
    <section className="bg-[#020617] py-20 md:py-32 px-6 text-white">
      <div className="max-w-[75rem] mx-auto">
        
        {/* Header section */}
        <div className="mb-16 md:mb-24">
          <span className="text-white/60 font-bold text-sm md:text-base uppercase tracking-widest mb-8 block">
            {header.tag}
          </span>
          <div className="font-playfair text-5xl md:text-[5rem] font-bold leading-[1.1] [&_em]:italic [&_h2]:m-0">
            <RenderBlocks blocks={header.title} />
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-32 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-[2fr_1.2fr_1fr_1.2fr_1fr_1fr] gap-4 pb-6 border-b border-white/20">
              {['PRODUCT', 'TYPE', 'MINIMUM', 'RETURN', 'TERM', 'STATUTS'].map((h) => (
                <span key={h} className="text-xs font-bold tracking-widest text-white/50">
                  {h}
                </span>
              ))}
            </div>

            {/* Table Rows */}
            <div className="flex flex-col">
              {rows?.map((row, idx) => (
                <div 
                  key={idx} 
                  className="grid grid-cols-[2fr_1.2fr_1fr_1.2fr_1fr_1fr] gap-4 py-6 border-b border-white/10 items-center hover:bg-white/5 transition-colors"
                >
                  <span className="font-sans text-base md:text-lg font-medium">{row.product}</span>
                  <span className="font-sans text-sm md:text-base text-white/70">{row.type}</span>
                  <span className="font-sans text-sm md:text-base text-white/70">{row.minimum}</span>
                  <span className="font-sans text-sm md:text-base text-white/70">{row.return}</span>
                  <span className="font-sans text-sm md:text-base text-white/70">{row.term}</span>
                  <span className="font-sans text-xs font-bold tracking-widest px-2 py-1 text-white/70">
                    {row.statuts}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Card Section */}
        <div className="flex justify-center">
          <div 
            className="w-full max-w-[64rem] rounded-[2.5rem] p-12 md:p-24 flex flex-col items-center text-center relative overflow-hidden"
            style={{
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(#020617, #020617), linear-gradient(135deg, #3b82f6, #6366f1, #000000)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            {/* Glowing effect inside */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/5 blur-[100px] pointer-events-none" />

            <span className="text-blue-400 font-bold text-sm md:text-base uppercase tracking-widest mb-10 relative z-10">
              {cta.label}
            </span>

            <div className="font-playfair text-4xl md:text-[4.5rem] font-bold leading-[1.1] mb-12 relative z-10 [&_em]:italic [&_em]:text-[#22D3EE] [&_h3]:m-0">
              <RenderBlocks blocks={cta.title} />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 relative z-10 w-full justify-center">
              <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-lg transition-all text-sm tracking-widest">
                {cta.primaryButton}
              </button>
              <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-lg transition-all text-sm tracking-widest">
                {cta.secondaryButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
