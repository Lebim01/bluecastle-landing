'use client'
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from 'embla-carousel'
import AutoScroll from "embla-carousel-auto-scroll";
import Link from "next/link";

export type CarouselItem = {
    id: string | number;
    href?: string;
    imageSrc: string;
    alt: string;
    newTab?: boolean;
};

export type SectionCarouselProps = {
    items: CarouselItem[];
    className?: string;
    height?: number;
    options?: EmblaOptionsType;
    autoScroll?: {
        playOnInit?: boolean;
        speed?: number;
        stopOnMouseEnter?: boolean;
        stopOnInteraction?: boolean;
    };

    perView?: {
        base?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
};

const defaultOptions: EmblaOptionsType = { loop: true, align: "center", skipSnaps: false };

export function SectionCarousel({
    items,
    className,
    height = 120,
    options,
    autoScroll,
    perView = { base: 2.5, sm: 3.5, md: 5, lg: 6, xl: 7 },
}: SectionCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ ...defaultOptions, ...(options || {}) }, [
        AutoScroll({
            playOnInit: autoScroll?.playOnInit ?? true,
            speed: autoScroll?.speed ?? 1,
            stopOnMouseEnter: autoScroll?.stopOnMouseEnter ?? true,
            stopOnInteraction: autoScroll?.stopOnInteraction ?? false,
        }),
    ]);

    useEffect(() => {
        if (!emblaApi) return;
        const onVisibility = () => {
            const auto = emblaApi.plugins()?.autoScroll;
            if (!auto) return;
            if (document.hidden) auto.stop();
            else auto.play();
        };
        document.addEventListener("visibilitychange", onVisibility);
        return () => document.removeEventListener("visibilitychange", onVisibility);
    }, [emblaApi]);

    const basisPct = (n?: number) => (n && n > 0 ? `${100 / n}%` : "auto");

    return (
        <div
            className={[
                "relative z-40 w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70",
                "shadow-md ring-1 ring-black/5",
                className || "",
            ].join(" ")}
            style={{ height }}
        >
            <div className="h-full px-3 sm:px-0">
                <div ref={emblaRef} className="embla h-full overflow-hidden">
                    <div className="embla__container flex h-full -ml-3 sm:-ml-4">
                        {items.map((it) => {
                            const content = (
                                <img
                                    src={it.imageSrc}
                                    alt={it.alt}
                                    className="h-10 sm:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity"
                                    loading="lazy"
                                />
                            );
                            return (
                                <div
                                    key={it.id}
                                    className={[
                                        "embla__slide h-full pl-3 sm:pl-4 flex items-center justify-center",
                                        `basis-[${basisPct(perView.base)}]`,
                                        `sm:basis-[${basisPct(perView.sm)}]`,
                                        `md:basis-[${basisPct(perView.md)}]`,
                                        `lg:basis-[${basisPct(perView.lg)}]`,
                                        `xl:basis-[${basisPct(perView.xl)}]`,
                                    ].join(" ")}
                                    style={{ minWidth: 0 }}
                                >
                                    {it.href ? (
                                        <Link
                                            href={it.href}
                                            target={it.newTab ? "_blank" : undefined}
                                            rel={it.newTab ? "noopener noreferrer" : undefined}
                                            className="inline-flex items-center justify-center"
                                            aria-label={it.alt}
                                        >
                                            {content}
                                        </Link>
                                    ) : (
                                        content
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-white/80 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white/80 to-transparent" />
        </div>
    );
}