'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Page } from '@/payload-types'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export type TestimonialsLayoutBlock = Extract<
    NonNullable<Page['layout']>[number],
    { blockType: 'testimonials' }
>

type Props = TestimonialsLayoutBlock & { className?: string }

const DEFAULT_EMBLA_OPTS: EmblaOptionsType = { align: 'start', loop: true }

type CleanItem = {
    name?: string
    country?: string
    videoUrl?: string
    quote?: string
    avatarUrl?: string
    id?: string
}

export const TestimonialsBlock: React.FC<Props> = ({
    title,
    displayStyle = 'grid',
    columns = 3,
    showDots = true,
    showArrows = true,
    items = [],
    className,
}) => {
    const gridCols = Math.max(1, Math.min(6, Number(columns || 3)))
    const colClass =
        displayStyle === 'grid' || displayStyle === 'circle'
            ? `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${gridCols} gap-6`
            : ''

    if (!items || items.length === 0) {
        return null
    }

    const normalized: CleanItem[] = React.useMemo(
        () =>
            (items ?? []).map((it) => ({
                name: it.name ?? undefined,
                country: it.country ?? undefined,
                videoUrl: it.videoUrl ?? undefined,
                quote: it.quote ?? undefined,
                avatarUrl: it.avatarUrl ?? undefined,
                id: it.id ?? undefined,
            })),
        [items]
    )

    return (
        <section className={`w-full py-16 flex flex-col items-center ${className ?? ''}`}>
            {title && <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center">{title}</h2>}

            {displayStyle === 'carousel' ? (
                <Carousel items={normalized} showDots={showDots || false} showArrows={showArrows || false} />
            ) : (
                <div className="w-full max-w-6xl">
                    <div className={colClass}>
                        {items.map((it, i) => (
                            <TestimonialCard
                                key={`${i}-${it.name}`}
                                item={{
                                    name: it.name || "",
                                    country: it.country || "",
                                    avatarUrl: it.avatarUrl || "",
                                    quote: it.quote || "",
                                    videoUrl: it.videoUrl || ""
                                }}
                                variant={displayStyle === 'circle' ? 'circle' : 'card'}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

function TestimonialCard({
    item,
    variant = 'card',
}: {
    item: { name?: string; country?: string; videoUrl?: string; quote?: string; avatarUrl?: string }
    variant?: 'card' | 'circle'
}) {
    const hasVideo = !!item.videoUrl

    return (
        <div
            className={
                variant === 'circle'
                    ? 'flex flex-col items-center rounded-2xl border border-gray-200 p-6 bg-white shadow-sm'
                    : 'rounded-2xl border border-gray-200 p-6 bg-white shadow-sm'
            }
        >
            <div className={variant === 'circle' ? 'flex flex-col items-center' : 'flex items-center gap-4'}>
                {item.avatarUrl ? (
                    <img
                        src={item.avatarUrl}
                        alt={item.name || 'avatar'}
                        className={
                            variant === 'circle'
                                ? 'h-20 w-20 rounded-full object-cover ring-2 ring-gray-200'
                                : 'h-12 w-12 rounded-full object-cover ring-2 ring-gray-200'
                        }
                        loading="lazy"
                    />
                ) : (
                    <div
                        className={
                            variant === 'circle'
                                ? 'h-20 w-20 rounded-full bg-gray-100 ring-2 ring-gray-200'
                                : 'h-12 w-12 rounded-full bg-gray-100 ring-2 ring-gray-200'
                        }
                        aria-hidden
                    />
                )}

                <div className={variant === 'circle' ? 'mt-3 text-center' : ''}>
                    {item.name && <p className="font-semibold text-gray-900">{item.name}</p>}
                    {item.country && <p className="text-gray-500 text-sm">{item.country}</p>}
                </div>
            </div>


            <div className={variant === 'circle' ? 'mt-4 w-full' : 'mt-4'}>
                {hasVideo ? (
                    <div className={variant === 'circle' ? '' : ''}>
                        <iframe
                            className="w-full aspect-video rounded-lg"
                            src={item.videoUrl}
                            loading="lazy"
                            allow="autoplay; fullscreen"
                        />
                    </div>
                ) : item.quote ? (
                    <p className="text-gray-700 leading-relaxed">{`“${item.quote}”`}</p>
                ) : (
                    <p className="text-gray-400 text-sm italic">Sin contenido</p>
                )}
            </div>
        </div>
    )
}

function Carousel({
    items,
    showDots,
    showArrows,
}: {
    items: { name?: string; country?: string; videoUrl?: string; quote?: string }[]
    showDots: boolean
    showArrows: boolean
}) {
    const [emblaRef, emblaApi] = useEmblaCarousel(DEFAULT_EMBLA_OPTS)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const onSelect = useCallback((api: EmblaCarouselType) => {
        setSelectedIndex(api.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
        onSelect(emblaApi)
        setScrollSnaps(emblaApi.scrollSnapList())
        emblaApi.on('select', onSelect)
        return () => {
            emblaApi?.off('select', onSelect)
        }
    }, [emblaApi, onSelect])

    const scrollTo = useCallback(
        (idx: number) => emblaApi && emblaApi.scrollTo(idx),
        [emblaApi],
    )

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    return (
        <div className="relative w-full max-w-[1100px]">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {items.map((it, i) => (
                        <div key={`${i}-${it.name}`} className="min-w-0 flex-[0_0_100%] px-3 sm:px-4">
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-xl text-blue-900">{it.name}</span>
                                {it.country && <span className="text-gray-600">{it.country}</span>}

                                <div className="w-full mt-3">
                                    {it.videoUrl ? (
                                        <iframe
                                            className="w-full aspect-[9/16] sm:aspect-video rounded-lg"
                                            src={it.videoUrl}
                                            loading="lazy"
                                            allow="autoplay; fullscreen"
                                            title={`testimonial-${i}`}
                                        />
                                    ) : it.quote ? (
                                        <p className="text-gray-700 leading-relaxed text-lg text-center max-w-3xl mx-auto">
                                            {`“${it.quote}”`}
                                        </p>
                                    ) : (
                                        <p className="text-gray-400 text-center italic">Sin contenido</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showArrows && (
                <>
                    <button
                        type="button"
                        onClick={scrollPrev}
                        className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-6 bg-black/80 hover:bg-black text-white rounded-full p-2"
                        aria-label="Anterior"
                    >
                        <IoIosArrowBack className="text-2xl" />
                    </button>
                    <button
                        type="button"
                        onClick={scrollNext}
                        className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-6 bg-black/80 hover:bg-black text-white rounded-full p-2"
                        aria-label="Siguiente"
                    >
                        <IoIosArrowForward className="text-2xl" />
                    </button>
                </>
            )}

            {showDots && (
                <div className="flex items-center justify-center gap-2 mt-4">
                    {scrollSnaps.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollTo(idx)}
                            className={`h-2.5 w-2.5 rounded-full ${idx === selectedIndex ? 'bg-gray-900' : 'bg-gray-300'
                                }`}
                            aria-label={`Ir al slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
