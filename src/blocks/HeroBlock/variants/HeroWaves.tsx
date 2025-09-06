"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Media, Page } from "@/payload-types";
import MovingWaves from "@/components/Waves/Waves";


export type WavesProps = Extract<Page["layout"][number], { blockType: "heroBlock" }> & {
    waves?: {
        gradientStart?: string | null;
        gradientEnd?: string | null;
        heightVH?: number | null;
    } | null;
};

function mediaUrl(m: number | Media | null | undefined): string {
    if (!m) return "";
    if (typeof m === "number") return "";
    return m.url ?? m?.sizes?.thumbnail?.url ?? "";
}

const HeroWaves: React.FC<WavesProps> = (props) => {
    const { title, subcopy, cta, disclaimer, logo, waves } = props as any;
    const heroSectionRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = 800;
            const progress = Math.min(scrollTop / windowHeight, 1);
            setScrollProgress(progress);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const height = Math.max(30, Math.min(100, Number(waves?.heightVH ?? 70)));
    const bgA = waves?.gradientStart ?? "#0553A2";
    const bgB = waves?.gradientEnd ?? "#0b0f1a";

    return (
        <section className="relative w-full" style={{ height: `min(${height}vh, 900px)` }} ref={heroSectionRef}>
            <div className="sticky top-0 h-full w-full flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${bgA} 20%, ${bgB} 80%)` }} />

                <div className="relative z-10 flex flex-col items-center gap-4 px-4 text-white text-center">
                    {logo ? (
                        <img src={mediaUrl(logo as any)} alt="logo" className="w-full max-w-xs md:max-w-md opacity-90" />
                    ) : null}

                    {title ? (
                        <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-balance max-w-4xl">{title}</h1>
                    ) : null}

                    {subcopy ? (
                        <p className="text-base md:text-lg text-white/90 max-w-2xl">{subcopy}</p>
                    ) : null}

                    {cta?.href && cta?.label ? (
                        <Link href={cta.href} className="inline-flex items-center gap-2 rounded-full bg-white text-gray-900 px-6 py-2 font-medium shadow hover:shadow-md transition">
                            {cta.label}
                        </Link>
                    ) : null}

                    {disclaimer ? (
                        <span className="text-[12px] text-white/60 max-w-xl">{disclaimer}</span>
                    ) : null}
                </div>

                <div className="absolute bottom-0 w-full h-full">
                    <MovingWaves scrollProgress={scrollProgress} />
                </div>
            </div>
        </section>
    );
};

export default HeroWaves;