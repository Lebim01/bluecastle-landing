'use client'
import React from 'react'
import type { Page } from '@/payload-types'
import clsx from 'clsx'
import { Button } from '@heroui/react'

type LayoutBlock = Page['layout'][number]
type SubscriptionsBlockType = Extract<LayoutBlock, { blockType: 'subscriptions' }>

type Props = { block?: SubscriptionsBlockType } & Partial<SubscriptionsBlockType>

function themeClasses(theme?: string) {
    switch (theme) {
        case 'emerald':
            return 'from-emerald-500 to-teal-600'
        case 'sky':
            return 'from-sky-500 to-indigo-600'
        case 'amber':
            return 'from-amber-500 to-orange-600'
        case 'rose':
            return 'from-rose-500 to-pink-600'
        case 'slate':
            return 'from-slate-800 to-slate-900'
        case 'indigo':
        default:
            return 'from-indigo-500 to-violet-600'
    }
}

function normalizeBlock(props: Props): SubscriptionsBlockType | null {
    if (props.block && (props.block as any).blockType === 'subscriptions') return props.block
    if ((props as any).blockType === 'subscriptions') return props as SubscriptionsBlockType
    return null
}

export const SubscriptionsBlock: React.FC<Props> = (props) => {
    const block = normalizeBlock(props)
    if (!block) return null

    const heading = block.heading
    const subheading = block.subheading

    return (
        <section className="w-full bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-12 md:py-16">
                {(heading || subheading) && (
                    <header className="mb-10">
                        {heading && (
                            <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 dark:text-white">
                                {heading}
                            </h2>
                        )}
                        {subheading && (
                            <p className="text-neutral-700 dark:text-neutral-300 mt-2 max-w-2xl">
                                {subheading}
                            </p>
                        )}
                    </header>
                )}

                <div className="flex flex-col gap-16">
                    {(block.groups ?? []).map((group, gi) => {
                        const groupTheme = themeClasses(group.theme || "indigo")

                        const cols =
                            group.columns === '4'
                                ? 'md:grid-cols-4'
                                : group.columns === '2'
                                    ? 'md:grid-cols-2'
                                    : 'md:grid-cols-3'

                        return (
                            <div key={gi} className="w-full border border-4 border-gray-300 p-8 pt-0 rounded-2xl">

                                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
                                    <div className='flex flex-col items-start'>
                                        <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white -mt-4 bg-white px-2">
                                            {group.title}
                                        </h3>
                                        {group.description && (
                                            <p className="text-neutral-700 dark:text-neutral-300 mt-1">
                                                {group.description}
                                            </p>
                                        )}
                                    </div>
                                </div>


                                <div className={clsx('grid grid-cols-1 gap-6', cols)}>
                                    {(group.plans ?? []).map((plan, pi) => {
                                        const planTheme = themeClasses(plan.accentTheme ?? group.theme ?? "indigo")
                                        const features = (plan.features ?? []).slice(0, 3)


                                        const hasCTA = plan.ctaLabel && plan.ctaUrl

                                        return (
                                            <article
                                                key={pi}
                                                className={clsx(
                                                    'relative rounded-2xl p-6 text-white overflow-hidden',
                                                    'bg-gradient-to-br',
                                                    planTheme,
                                                    'shadow-[0_10px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10'
                                                )}
                                            >

                                                <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 rounded-2xl" />


                                                {plan.badge && (
                                                    <span className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                                                        {plan.badge}
                                                    </span>
                                                )}


                                                {plan.image && typeof plan.image === 'object' && (plan.image as any).url && (
                                                    <img
                                                        src={(plan.image as any).url as string}
                                                        alt={(plan.image as any).alt ?? plan.title}
                                                        className="absolute -right-6 -bottom-6 w-40 h-40 object-contain opacity-20"
                                                        loading="lazy"
                                                    />
                                                )}

                                                <h4 className="text-lg md:text-xl font-bold">{plan.title}</h4>
                                                {plan.tagline && (
                                                    <p className="text-white/90 text-sm mt-1">{plan.tagline}</p>
                                                )}

                                                {features.length > 0 && (
                                                    <ul className="mt-4 space-y-2 text-sm">
                                                        {features.map((f, fi) => (
                                                            <li key={fi} className="flex gap-2 leading-relaxed">
                                                                <span className="opacity-90 "><span className="font-semibold">{f.field}</span>: {f.value}</span>

                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}

                                                {hasCTA && (
                                                    <a
                                                        href={plan.ctaUrl as string}
                                                        className=""
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Button variant='bordered' size='lg' className="mt-6 w-full text-white">

                                                            {plan.ctaLabel}

                                                        </Button>
                                                    </a>
                                                )}
                                            </article>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default SubscriptionsBlock
