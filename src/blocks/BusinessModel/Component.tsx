import { Media as MediaType } from '@/payload-types'
import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import clsx from 'clsx'

type ModelStep = {
  id?: string
  number: string
  title: string
  content: any
  badges?: { text: string; id?: string }[]
}

type Props = {
  title: string
  description: string
  image: MediaType
  items: ModelStep[]
}

export default function BusinessModelBlock({ title, description, image, items }: Props) {
  return (
    <section className="py-24 px-6 md:px-12 bg-white text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-semibold mb-6 block text-lg">Section 03 ⌵</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10 leading-tight tracking-tight">
              {title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            {image && (
              <div className="relative w-full max-w-[350px]">
                <Media resource={image} className="w-full h-auto object-contain" />
              </div>
            )}
          </div>
        </div>

        {/* Steps Section */}
        <div className="flex flex-col gap-24">
          {items?.map((item, index) => (
            <div
              key={item.id || index}
              className="flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12 items-start group"
            >
              {/* Step Number */}
              <div className="md:col-span-2">
                <span className="text-6xl md:text-7xl font-serif font-bold text-blue-600 opacity-90 group-hover:scale-105 transition-transform inline-block">
                  {item.number}
                </span>
              </div>

              {/* Step Content */}
              <div className="md:col-span-10 flex flex-col gap-6">
                <div>
                  <h3 className="text-3xl md:text-4xl font-sans font-bold leading-tight mb-6">
                    {item.title}
                  </h3>
                  <div className="prose prose-blue max-w-none text-xl text-gray-700 leading-relaxed">
                    <RichText data={item.content} enableGutter={false} />
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {item.badges?.map((badge, bIndex) => (
                    <span
                      key={badge.id || bIndex}
                      className="bg-blue-600 text-white px-6 py-2 text-sm font-bold tracking-wide shadow-sm"
                    >
                      {badge.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
