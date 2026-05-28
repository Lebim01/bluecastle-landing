import { Media } from '@/payload-types'
import React from 'react'
import { RenderBlocks } from '../RenderBlocks'
import clsx from 'clsx'

type Props = {
  id: string
  blockType: 'transparentHero'
  bg: Media
  heading: {
    content: any[]
  }
  description: {
    content: any[]
  }
}

export default function TransparentHeroComponent(props: Props) {
  const { bg, heading, description } = props

  return (
    <section
      className="relative w-full min-h-[100dvh] flex flex-col justify-between text-white bg-no-repeat bg-center bg-cover overflow-hidden"
      style={{
        backgroundImage: bg?.url ? `url(${bg.url})` : 'none',
        backgroundColor: '#002554', // Fallback color
      }}
    >
      {/* Premium Overlay for readability */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Top Right Heading Section */}
      <div className="relative z-10 w-full flex justify-end p-8 md:p-16 lg:p-24">
        <div className="max-w-[600px] text-right animate-fade-in-up">
          <div className="font-playfair text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] text-shadow-lg [&_p]:font-playfair [&_h1]:font-playfair [&_h2]:font-playfair">
            <RenderBlocks blocks={heading.content} />
          </div>
        </div>
      </div>

      {/* Bottom Left Description Section */}
      <div className="relative z-10 w-full flex justify-start p-8 md:p-16 lg:p-24">
        <div className="max-w-[700px] text-left opacity-90 animate-fade-in-up delay-200">
          <div className="font-sans text-[clamp(1rem,1.5vw,1.25rem)] font-light leading-relaxed text-shadow-md">
            <RenderBlocks blocks={description.content} />
          </div>
        </div>
      </div>

      {/* Inline styles for custom properties that are harder with tailwind utility classes alone */}
      <style dangerouslySetInnerHTML={{ __html: `
        .text-shadow-lg { text-shadow: 0 4px 6px rgba(0,0,0,0.3); }
        .text-shadow-md { text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
      `}} />
    </section>
  )
}
