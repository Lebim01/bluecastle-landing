"use client";
import React from "react";
import type { Page, Media } from "@/payload-types";
import HeroAurora from "./variants/HeroAura";
import HeroWaves from "./variants/HeroWaves";


export type ExtractHero = Extract<Page["layout"][number], { blockType: "heroBlock" }>; // spread-friendly


export type HeroFallback = {
    blockType: "heroBlock";
    variant?: "waves" | "aurora";
    title?: string | null;
    subcopy?: string | null;
    cta?: { label?: string | null; href?: string | null } | null;
    disclaimer?: string | null;
    logo?: number | Media | null;
    waves?: { gradientStart?: string | null; gradientEnd?: string | null; heightVH?: number | null } | null;
    aurora?: { colors?: { color: string }[] | null; starsCount?: number | null; starsSpeed?: number | null } | null;
    id?: string;
    blockName?: string | null;
};

export type HeroProps = [ExtractHero] extends [never] ? HeroFallback : ExtractHero;

export default function HeroBlockComponent(props: HeroProps & { disableInnerContainer?: boolean }) {
    const { variant = "waves" } = props as any;

    switch (variant) {
        case "aurora":
            return <HeroAurora {...(props as any)} />;
        case "waves":
        default:
            return <HeroWaves {...(props as any)} />;
    }
}