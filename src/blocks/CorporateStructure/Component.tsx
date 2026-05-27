import { Media as MediaType } from '@/payload-types'
import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import clsx from 'clsx'

type Entity = {
  id?: string
  tag: string
  name: string
  details: any
  footer?: string
  footerLink?: string
  footerUrl?: string
}

type Props = {
  title: string
  description: string
  image: MediaType
  entities: Entity[]
}

export default function CorporateStructureBlock({ title, description, image, entities }: Props) {
  return (
    <section className="py-20 px-6 md:px-12 bg-white text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-semibold mb-4 block text-lg">Section 01 ⌵</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight">
              {title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            {image && (
              <div className="relative w-full max-w-[400px]">
                <Media resource={image} className="w-full h-auto object-contain" />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {entities?.map((entity, index) => (
            <div
              key={entity.id || index}
              className="border-2 border-blue-600 rounded-[2.5rem] p-10 flex flex-col h-full bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-6">
                <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
                  {entity.tag}
                </span>
                <h3 className="text-3xl md:text-4xl font-sans font-medium text-blue-700 mt-2">
                  {entity.name}
                </h3>
              </div>

              <div className="flex-grow prose prose-blue max-w-none mb-8 text-gray-700">
                <RichText data={entity.details} enableGutter={false} />
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 flex flex-wrap gap-2 items-center text-blue-500 font-medium">
                {entity.footer && <span>{entity.footer}</span>}
                {entity.footerLink && (
                  <a
                    href={entity.footerUrl || '#'}
                    className="hover:underline flex items-center gap-1"
                  >
                    {entity.footerLink}
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
