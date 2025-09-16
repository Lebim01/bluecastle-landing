'use client'
import React from 'react'
import type { Page, Media } from '@/payload-types'
import { Timeline } from '@/components/ui/timeline'
import { RichText } from '@payloadcms/richtext-lexical/react'

type TimelineBlockType = Extract<Page['layout'][number], { blockType: 'timeline' }>

type Props = { block?: TimelineBlockType } & Partial<TimelineBlockType>

function normalizeBlock(props: Props): TimelineBlockType | null {
    if (props.block && (props.block as any).blockType === 'timeline') return props.block
    if ((props as any).blockType === 'timeline') return props as TimelineBlockType
    return null
}

export const TimelineBlock: React.FC<Props> = (props) => {
    const block = normalizeBlock(props)
    if (!block) return null
    const heading = block.heading ?? undefined
    const subheading = block.subheading ?? undefined

    const data = (block.items ?? []).map((it) => {
        const images = (it.gallery ?? [])
            .map((g, i) => {
                const media = g?.image as string | Media | undefined
                const url = typeof media === 'string' ? media : media?.url ?? ''
                const alt = g?.alt ?? (typeof media === 'string' ? '' : media?.alt ?? 'image')
                if (!url) return null
                return (
                    <img
                        key={i}
                        src={url}
                        alt={alt}
                        width={500}
                        height={500}
                        className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
                        loading="lazy"
                    />
                )
            })
            .filter(Boolean)

        const checklist =
            (it.checklist?.length ?? 0) > 0 ? (
                <div className="mb-8">
                    {it.checklist!.map((c, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300"
                        >
                            ✅ {c?.text}
                        </div>
                    ))}
                </div>
            ) : null

        const content = (
            <div>
                {it.description && (
                    <div className="prose prose-sm md:prose-base dark:prose-invert mb-6">
                        <RichText data={it.description as any} />
                    </div>
                )}
                {checklist}
                {images && images.length > 0 && <div className="grid grid-cols-2 gap-4">{images}</div>}
            </div>
        )

        return { title: it.title ?? '', content }
    })

    return (
        <div className="relative w-full overflow-clip">
            <Timeline data={data} heading={heading} subheading={subheading} />
        </div>
    )
}

export default TimelineBlock
