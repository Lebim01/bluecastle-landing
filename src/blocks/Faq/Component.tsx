'use client'
import React, { useState } from 'react'
import { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

type FaqItem = {
  id?: string
  question: string
  answer: string
}

type Props = {
  sectionTag?: string
  title: string
  description?: string
  image?: MediaType
  items: FaqItem[]
  cta?: {
    enable: boolean
    smallTitle: string
    titlePart1: string
    titlePart2: string
    button1Label: string
    button1Url: string
    button2Label: string
    button2Url: string
  }
  className?: string
}

export const FAQBlock: React.FC<Props> = ({
  sectionTag,
  title,
  description,
  image,
  items,
  cta,
  className,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={clsx('py-24 px-6 md:px-12 bg-white text-[#1a1a1a]', className)}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-semibold mb-6 block text-lg">
              {sectionTag || 'Section 04 ⌵'}
            </span>
            <h2 className="text-6xl md:text-8xl font-serif font-bold mb-10 leading-tight tracking-tight">
              {title || 'FAQ'}
            </h2>
            {description && (
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                {description}
              </p>
            )}
          </div>
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            {image && (
              <div className="relative w-full max-w-[300px]">
                <Media resource={image} className="w-full h-auto object-contain" />
              </div>
            )}
          </div>
        </div>

        {/* Faq List Section */}
        <div className="divide-y divide-gray-200 border-t border-gray-200 mb-24">
          {items?.map((item, index) => (
            <div key={item.id || index} className="py-2">
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex items-center justify-between py-6 text-left group focus:outline-none"
              >
                <span className="text-2xl md:text-3xl font-medium text-blue-600 group-hover:text-blue-700 transition-colors pr-8">
                  {item.question}
                </span>
                <span className="text-4xl text-blue-600 transition-transform duration-300 transform">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pr-12 text-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        {cta?.enable && (
          <div className="border-2 border-blue-600 rounded-[2.5rem] p-12 md:p-20 text-center flex flex-col items-center gap-10 bg-white shadow-sm overflow-hidden relative">
            <div className="flex flex-col gap-6 items-center">
              <span className="text-blue-500 font-medium text-lg tracking-wide uppercase">
                {cta.smallTitle}
              </span>
              <h3 className="text-5xl md:text-7xl font-serif leading-tight">
                <span className="font-bold">{cta.titlePart1}</span>
                <br />
                <span className="font-bold italic text-blue-600">{cta.titlePart2}</span>
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mt-4 w-full justify-center">
              <a
                href={cta.button1Url || '#'}
                className="bg-blue-600 text-white px-10 py-5 text-lg font-bold hover:bg-blue-700 transition-all shadow-lg text-center"
              >
                {cta.button1Label}
              </a>
              <a
                href={cta.button2Url || '#'}
                className="bg-blue-600 text-white px-10 py-5 text-lg font-bold hover:bg-blue-700 transition-all shadow-lg text-center"
              >
                {cta.button2Label}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
