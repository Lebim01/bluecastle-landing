import { Media as MediaType } from '@/payload-types'
import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import clsx from 'clsx'

type RegulatoryItem = {
  id?: string
  title: string
  badge: string
  content: any
  linkText?: string
  linkUrl?: string
}

type Props = {
  title: string
  description: string
  image: MediaType
  items: RegulatoryItem[]
}

export default function RegulatoryStandingBlock({ title, description, image, items }: Props) {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#050505] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
          <div className="max-w-2xl">
            <span className="text-blue-500 font-semibold mb-6 block text-lg">Section 02 ⌵</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10 leading-tight tracking-tight">
              {title}
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            {image && (
              <div className="relative w-full max-w-[320px] animate-pulse-slow">
                <Media resource={image} className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
              </div>
            )}
          </div>
        </div>

        {/* Items Section */}
        <div className="flex flex-col gap-20">
          {items?.map((item, index) => (
            <div
              key={item.id || index}
              className="flex flex-col md:grid md:grid-cols-12 gap-10 items-start border-b border-white/5 pb-20 last:border-0 last:pb-0"
            >
              {/* Left Side: Title & Badge */}
              <div className="md:col-span-4 flex flex-col gap-6">
                <h3 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                  {item.title}
                </h3>
                <div>
                  <span className="inline-block bg-blue-700 text-white px-8 py-2 text-sm font-bold tracking-widest uppercase">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Right Side: Content & Link */}
              <div className="md:col-span-8 flex flex-col gap-6">
                <div className="prose prose-invert prose-blue max-w-none text-xl text-gray-300 leading-relaxed">
                  <RichText data={item.content} enableGutter={false} />
                </div>
                {item.linkText && (
                  <a
                    href={item.linkUrl || '#'}
                    className="text-blue-500 font-medium text-lg hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <span>→</span>
                    <span className="hover:underline">{item.linkText}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
