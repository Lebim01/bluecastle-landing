import { Media } from '@/payload-types'
import React from 'react'
import { RenderBlocks } from '../RenderBlocks'

type Props = {
  id: string
  blockType: 'productsHero'
  bg: Media
  content: {
    heading: any[]
    description: any[]
  }
}

export default function ProductsHeroComponent(props: Props) {
  const { bg, content } = props

  return (
    <section
      className="relative w-full min-h-[80dvh] md:min-h-[100dvh] flex flex-col justify-end text-white bg-no-repeat bg-center bg-cover overflow-hidden"
      style={{
        backgroundImage: bg?.url ? `url(${bg.url})` : 'none',
        backgroundColor: '#002554', // Fallback
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      {/* Content Section (Bottom Left) */}
      <div className="relative z-10 w-full p-8 md:p-16 lg:p-24 max-w-[1200px]">
        <div className="flex flex-col gap-4 animate-fade-in-up">
          {/* Headline - Serif, Large */}
          <div className="font-playfair text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.9] text-shadow-lg [&_p]:font-playfair [&_h1]:font-playfair [&_h2]:font-playfair [&_em]:italic [&_p]:m-0 [&_p]:mb-1">
            <RenderBlocks blocks={content.heading} />
          </div>

          {/* Description - Sans, Medium */}
          <div className="max-w-[1000px] font-sans font-normal leading-snug text-shadow-md opacity-95 whitespace-pre-wrap">
            <RenderBlocks blocks={content.description} />
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .text-shadow-lg { text-shadow: 0 4px 8px rgba(0,0,0,0.4); }
        .text-shadow-md { text-shadow: 0 2px 4px rgba(0,0,0,0.4); }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `,
        }}
      />
    </section>
  )
}
