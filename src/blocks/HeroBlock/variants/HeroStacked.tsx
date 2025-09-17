"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Media, Page } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getMediaUrl";
import Link from "next/link";
import clsx from "clsx";

type LayoutBlock = Page["layout"][number];
type HeroStackedBlock =
    Extract<LayoutBlock, { blockType: "heroBlock" }> & {
        stacked?: {
            height?: "twoThirds" | "full" | "auto";
            layout?: "left" | "center";
            container?: "lg" | "xl" | "2xl" | "full";
            pattern?: { show?: boolean; image?: number | Media | null; size?: "auto" | "contain" | "cover"; position?: string; repeat?: "repeat" | "no-repeat" };
            overlay?: { show?: boolean; from?: string; to?: string; direction?: string }; // acepta HEX con alpha (#000000ad)
            bgImage?: { show?: boolean; image?: number | Media | null; fit?: "cover" | "contain"; position?: string };
            baseGradient?: { show?: boolean; from?: string; to?: string; direction?: string };
            baseColor?: { show?: boolean; color?: string };
            sideImage?: { image?: number | Media | null; alt?: string | null; width?: "md" | "lg"; disableOnMobile?: boolean };
            animate?: { enable?: boolean; delayMs?: number; durationMs?: number };
        };
    };

function containerClass(c?: string) {
    if (c === "full") return "w-full";
    return clsx(
        "mx-auto",
        (!c || c === "lg") && "max-w-screen-lg px-6",
        c === "xl" && "max-w-screen-xl px-6",
        c === "2xl" && "max-w-screen-2xl px-6",
    );
}

function useInView<T extends HTMLElement>(opts: IntersectionObserverInit = { threshold: 0.2 }) {
    const ref = useRef<T | null>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), opts);
        io.observe(el);
        return () => io.disconnect();
    }, [opts.rootMargin, opts.threshold]);
    return { ref, visible };
}

export default function HeroStacked(props: HeroStackedBlock & { disableInnerContainer?: boolean }) {
    const {
        title,
        subcopy,
        cta,
        disclaimer,
        stacked,
    } = props;

    const {
        height = "twoThirds",
        layout = "left",
        container = "xl",
        pattern,
        overlay,
        bgImage,
        baseGradient,
        baseColor,
        sideImage,
        animate,
    } = stacked ?? {};

    const urlLayer = (u?: string) => (u ? `url("${encodeURI(u)}")` : null);
    const patternUrl = pattern?.show && pattern?.image ? getMediaUrl(pattern.image as Media) : undefined;
    const bgImageUrl = bgImage?.show && bgImage.image ? getMediaUrl(bgImage.image as Media) : undefined;

    const bgImageList = useMemo(() => {
        const images: string[] = [];
        const positions: string[] = [];
        const sizes: string[] = [];
        const repeats: string[] = [];

        if (patternUrl) {
            images.push(urlLayer(patternUrl)!);
            positions.push(pattern?.position || "top left");
            sizes.push(pattern?.size || "auto");
            repeats.push(pattern?.repeat || "repeat");
        }

        if (bgImageUrl) {
            images.push(urlLayer(bgImageUrl)!);
            positions.push(bgImage?.position || "center");
            sizes.push(bgImage?.fit === "contain" ? "contain" : "cover");
            repeats.push("no-repeat");
        }

        if (overlay?.show) {
            const from = overlay.from || '#000000ad';
            const to = overlay.to || '#000000ad';
            const dir = overlay.direction || 'to bottom';
            const toRGBA = (hex: string) => {

                const clean = hex.replace('#', '');
                const r = parseInt(clean.slice(0, 2), 16);
                const g = parseInt(clean.slice(2, 4), 16);
                const b = parseInt(clean.slice(4, 6), 16);
                const a = clean.length === 8 ? parseInt(clean.slice(6, 8), 16) / 255 : 1;
                return `rgba(${r}, ${g}, ${b}, ${isFinite(a) ? a : 1})`;
            };
            images.push(`linear-gradient(${dir}, ${toRGBA(from)}, ${toRGBA(to)})`);
            positions.push('center');
            sizes.push('auto');
            repeats.push('no-repeat');
        }

        if (!baseColor?.show && baseGradient?.show !== false) {
            const dir2 = baseGradient?.direction || "180deg";
            images.push(
                `linear-gradient(${dir2}, ${baseGradient?.from || "#0b1e3a"}, ${baseGradient?.to || "#091a38"})`
            );
            positions.push("center");
            sizes.push("auto");
            repeats.push("no-repeat");
        }



        return {
            backgroundImage: images.join(","),
            backgroundPosition: positions.join(","),
            backgroundSize: sizes.join(","),
            backgroundRepeat: repeats.join(","),
            backgroundColor: baseColor?.show ? (baseColor.color || "#2b68c3ff") : undefined,
        } as React.CSSProperties;
    }, [
        patternUrl, pattern?.position, pattern?.size, pattern?.repeat,
        overlay?.show, overlay?.from, overlay?.to, overlay?.direction,
        bgImageUrl, bgImage?.fit, bgImage?.position,
        baseGradient?.show, baseGradient?.from, baseGradient?.to, baseGradient?.direction,
        baseColor?.show, baseColor?.color
    ]);


    const minH =
        height === "full" ? "min-h-screen"
            : height === "twoThirds" ? "min-h-[66vh]"
                : "min-h-[50vh]";

    const isCentered = layout === "center";

    const { ref: textRef, visible: textIn } = useInView<HTMLDivElement>();
    const { ref: imgRef, visible: imgIn } = useInView<HTMLDivElement>();
    const animDelay = animate?.delayMs ?? 80;
    const animDur = animate?.durationMs ?? 500;
    const shouldAnimate = animate?.enable !== false;

    return (
        <section
            className={clsx("relative overflow-hidden", minH)}
            style={bgImageList}
        >
            <div className={clsx(containerClass(container))}>
                <div
                    className={clsx(
                        "grid gap-8 py-16",
                        isCentered ? "grid-cols-1 place-items-center text-center" : "grid-cols-1 md:grid-cols-2 items-center text-white",
                    )}
                >

                    <div
                        ref={textRef}
                        className={clsx(
                            shouldAnimate && "opacity-0 translate-y-6",
                            shouldAnimate && textIn && "opacity-100 translate-y-0 transition-all",
                        )}
                        style={shouldAnimate && textIn ? { transitionDuration: `${animDur}ms`, transitionDelay: `${animDelay}ms` } : undefined}
                    >
                        {title && <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-12">{title}</h1>}
                        {subcopy && <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12">{subcopy}</p>}

                        {cta?.label && cta?.href && (
                            <div className={clsx(isCentered ? "justify-center" : "justify-start", "flex gap-4")}>
                                <Link
                                    href={cta.href}
                                    className="inline-flex items-center rounded-xl px-6 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                                >
                                    {cta.label}
                                </Link>
                            </div>
                        )}

                        {disclaimer && <p className="mt-4 text-sm text-white/60">{disclaimer}</p>}
                    </div>


                    {!isCentered && sideImage?.image && (
                        <div
                            ref={imgRef}
                            className={clsx(
                                "relative flex justify-center",
                                shouldAnimate && "opacity-0 translate-y-6",
                                shouldAnimate && imgIn && "opacity-100 translate-y-0 transition-all",
                            )}
                            style={shouldAnimate && imgIn ? { transitionDuration: `${animDur}ms`, transitionDelay: `${animDelay + 80}ms` } : undefined}
                        >
                            <img
                                src={getMediaUrl(sideImage.image as Media)}
                                alt={sideImage.alt || ""}
                                className={clsx(
                                    sideImage.width === "lg" ? "max-w-[560px]" : "max-w-[440px]",
                                    sideImage?.disableOnMobile ? "hidden md:block" : "block",
                                )}
                                style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,.25))" }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
