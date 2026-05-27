import { Media as MediaType } from '@/payload-types'
import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'

type Props = {
  title: string
  description: string
  image: MediaType
  subSectionTitle: string
  subSectionContent: any
  boxTitle: string
  boxItems?: { text: string; id?: string }[]
  ctaText?: string
  ctaUrl?: string
}

export default function LegalMattersBlock({
  title,
  description,
  image,
  subSectionTitle,
  subSectionContent,
  boxTitle,
  boxItems,
  ctaText,
  ctaUrl,
}: Props) {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#050505] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
          <div className="max-w-2xl">
            <span className="text-blue-500 font-semibold mb-6 block text-lg">Section 04 ⌵</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10 leading-tight tracking-tight">
              {title}
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            {image && (
              <div className="relative w-full max-w-[320px]">
                <Media resource={image} className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(37,99,235,0.2)]" />
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mt-12">
          <div className="md:col-span-7 flex flex-col gap-10">
            <h3 className="text-5xl font-serif font-bold leading-tight">
              {subSectionTitle}
            </h3>
            <div className="prose prose-invert max-w-none text-xl text-gray-300 leading-relaxed">
              <RichText data={subSectionContent} enableGutter={false} />
            </div>

            {/* CTA Button */}
            {ctaText && (
              <div className="mt-8">
                <a
                  href={ctaUrl || '#'}
                  className="inline-flex items-center gap-4 bg-blue-700 hover:bg-blue-600 text-white px-8 py-4 text-lg font-medium transition-all group"
                >
                  {ctaText}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            )}
          </div>

          {/* Highlight Box */}
          <div className="md:col-span-5">
            <div className="border-2 border-blue-600 rounded-[2rem] p-10 bg-blue-900/10 backdrop-blur-sm">
              <h4 className="text-xl font-bold text-blue-400 mb-10 text-center uppercase tracking-wider">
                {boxTitle}
              </h4>
              <ul className="flex flex-col gap-4">
                {boxItems?.map((item, index) => (
                  <li key={item.id || index} className="flex items-start gap-3 text-lg text-gray-200">
                    <span className="text-blue-500 mt-1.5">•</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
