"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { Page } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getMediaUrl";

type CarouselSlide = {
    image: any;
    title?: string | null;
    text?: string | null;
    cta?: { label?: string | null; href?: string | null } | null;
    overlayFrom?: string | null;
    overlayTo?: string | null;
    align?: "start" | "center" | "end";
    lightText?: boolean;
};

type CarouselSettings = {
    heightVH?: number | null;
    loop?: boolean | null;
    autoplayMs?: number | null;
    slides?: CarouselSlide[] | null;
};

export type CarouselProps = Extract<Page["layout"][number], { blockType: "heroBlock" }> & {
    carousel?: CarouselSettings | null;
};

const HeroCarousel: React.FC<CarouselProps> = (props) => {
    const { carousel } = props as any;
    const height = Math.max(40, Math.min(100, Number(carousel?.heightVH ?? 70)));

    const autoplayMs = Number(carousel?.autoplayMs ?? 4500);
    const loop = Boolean(carousel?.loop ?? true);

    const plugin = useRef(
        autoplayMs > 0
            ? Autoplay({ delay: autoplayMs, stopOnInteraction: false, stopOnMouseEnter: true })
            : undefined
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop, align: "start", dragFree: false, skipSnaps: false },
        plugin.current ? [plugin.current] : []
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    return (
        <section className="relative w-full" style={{ height: `min(${height}vh, 900px)` }}>
            <div className="absolute inset-0 embla_hero">
                <div className="embla_hero__viewport" ref={emblaRef}>
                    <div className="embla_hero__container">
                        {(carousel?.slides ?? []).map((s: CarouselSlide, i: number) => {
                            const imgUrl = s?.image ? getMediaUrl(s.image) : undefined;
                            const from = s?.overlayFrom ?? "#00000099";
                            const to = s?.overlayTo ?? "#00000033";
                            const align = s?.align ?? "center";
                            const lightText = s?.lightText ?? true;

                            return (
                                <div className="embla_hero__slide" key={i}>
                                    <div className="embla_hero__slide__inner">
                                        {imgUrl ? (

                                            <img
                                                src={imgUrl}
                                                alt={s?.title ?? `slide-${i + 1}`}
                                                className="embla_hero__bg"
                                            />
                                        ) : null}


                                        <div
                                            className="embla_hero__overlay"
                                            style={{ background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)` }}
                                        />


                                        <div
                                            className={[
                                                "embla_hero__content",
                                                align === "start" && "items-start text-left",
                                                align === "center" && "items-center text-center",
                                                align === "end" && "items-end text-right",
                                                lightText ? "text-white" : "text-gray-900",
                                            ].filter(Boolean).join(" ")}
                                        >
                                            {s?.title ? (
                                                <h2 className="text-3xl md:text-5xl font-semibold leading-tight max-w-4xl text-balance">
                                                    {s.title}
                                                </h2>
                                            ) : null}

                                            {s?.text ? (
                                                <p className="text-base md:text-lg opacity-90 max-w-2xl mt-3">
                                                    {s.text}
                                                </p>
                                            ) : null}

                                            {s?.cta?.href && s?.cta?.label ? (
                                                <Link
                                                    href={s.cta.href}
                                                    className={[
                                                        "inline-flex items-center gap-2 rounded-full px-6 py-2 font-medium shadow transition mt-5",
                                                        lightText ? "bg-white text-gray-900 hover:shadow-md" : "bg-gray-900 text-white hover:opacity-90",
                                                    ].join(" ")}
                                                >
                                                    {s.cta.label}
                                                </Link>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="embla_hero__controls">
                    <div className="embla_hero__dots">
                        {scrollSnaps.map((_, i) => (
                            <button
                                key={i}
                                className={["embla_hero__dot", i === selectedIndex && "embla_hero__dot--selected"].filter(Boolean).join(" ")}
                                onClick={() => scrollTo(i)}
                                aria-label={`Ir al slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroCarousel;
