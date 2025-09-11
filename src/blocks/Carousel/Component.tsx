"use client";
import React from "react";
import type { Page, Media } from "@/payload-types";
import { SectionCarousel, type CarouselItem } from "./components/SectionBlock";

type CarouselProps = Extract<Page["layout"][number], { blockType: "carousel" }> & {

    disableInnerContainer?: boolean;
};

function mediaUrl(m: number | Media | null | undefined): string {
    if (!m) return "";
    if (typeof m === "number") return "";
    if (m.filename) return `${process.env.NEXT_PUBLIC_STORAGE_URL}${m.filename}`
    return m.url ?? m?.sizes?.thumbnail?.url ?? "";
}

const CarouselBlockComponent: React.FC<CarouselProps> = (props) => {
    const {
        items,
        height = 120,
        perView,
        autoScroll,
    } = props;

    const safeItems = Array.isArray(items) ? items : [];

    const mapped: CarouselItem[] = safeItems.map((it: any, idx: number) => ({
        id: it?.id ?? idx,
        href: it?.href ?? undefined,
        imageSrc: mediaUrl(it?.media ?? null),
        alt: it?.alt ?? "logo",
        newTab: it?.newTab ?? true,
    }));

    return (
        <SectionCarousel
            items={mapped}
            height={height ?? 120}
            perView={{
                base: perView?.base ?? 2.5,
                sm: perView?.sm ?? 3.5,
                md: perView?.md ?? 5,
                lg: perView?.lg ?? 6,
                xl: perView?.xl ?? 7,
            }}
            autoScroll={
                autoScroll
                    ? {
                        playOnInit: autoScroll.playOnInit ?? true,
                        speed: autoScroll.speed ?? 1,
                        stopOnMouseEnter: autoScroll.stopOnMouseEnter ?? true,
                        stopOnInteraction: autoScroll.stopOnInteraction ?? false,
                    }
                    : undefined
            }
            className="sticky bottom-0 left-0 right-0"
            options={{ loop: true }}
        />
    );
};

export default CarouselBlockComponent;
