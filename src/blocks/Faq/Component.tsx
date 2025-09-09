'use client'
import React, { useMemo, useState } from 'react'
import type { Page } from '@/payload-types'

export type FAQLayoutBlock = Extract<
    NonNullable<Page['layout']>[number],
    { blockType: 'faq' }
>

type Props = FAQLayoutBlock & { className?: string }

type LocalFAQItem = {
    id: string
    question: string
    answer: string
    open?: boolean
}

export const FAQBlock: React.FC<Props> = ({ title, items, className }) => {
    const initial: LocalFAQItem[] = useMemo(
        () =>
            (items || []).map((it, i) => ({
                id: `${i}-${(it?.question || '').slice(0, 12)}`,
                question: it?.question || '',
                answer: it?.answer || '',
                open: i === 0,
            })),
        [items]
    )

    const [faqs, setFaqs] = useState<LocalFAQItem[]>(initial)

    function toggleOpen(id: string) {
        setFaqs(prev =>
            prev.map(f => (f.id === id ? { ...f, open: !f.open } : f)),
        )
    }

    return (
        <section className={`w-full flex flex-col items-center gap-8 py-12 ${className ?? ''}`}>
            <h2 className="text-3xl font-semibold tracking-tight">{title || 'FAQ'}</h2>

            <div className="w-full max-w-4xl rounded-2xl border border-gray-200 shadow-sm bg-white/80 backdrop-blur">
                <ul className="divide-y divide-gray-200">
                    {faqs.map(faq => (
                        <li key={faq.id} className="px-4 sm:px-6">
                            <div className="py-4">
                                <button
                                    onClick={() => toggleOpen(faq.id)}
                                    className="flex w-full cursor-pointer items-start justify-between gap-4 py-2 text-left"
                                >
                                    <span className="text-base sm:text-lg font-medium text-gray-900">
                                        {faq.question}
                                    </span>
                                    <span
                                        aria-hidden
                                        className={`mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-transform duration-200 ${faq.open ? 'rotate-45' : ''
                                            }`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-4 w-4"
                                        >
                                            <path d="M11 5h2v14h-2z" />
                                            <path d="M5 11h14v2H5z" />
                                        </svg>
                                    </span>
                                </button>

                                {faq.open && (
                                    <div className="pb-4 pr-1 sm:pr-2 text-gray-700 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
