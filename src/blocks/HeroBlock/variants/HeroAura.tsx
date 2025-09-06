"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { FiArrowRight } from "react-icons/fi";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import type { Page } from "@/payload-types";

const StarsCanvas = dynamic(() => import("./r3f/StarsCanvas").then(m => m.StarsCanvas), { ssr: false });

export type AuroraProps = Extract<Page["layout"][number], { blockType: "heroBlock" }> & {
    aurora?: { colors?: { color: string }[]; starsCount?: number; starsSpeed?: number } | null;
};

const DEFAULT_COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const HeroAurora: React.FC<AuroraProps> = (props) => {
    const { title, subcopy, cta, aurora } = props as any;

    const color = useMotionValue((aurora?.colors?.[0]?.color as string) || DEFAULT_COLORS[0]);
    const palette = (aurora?.colors?.map((c: any) => c.color).filter(Boolean) as string[]) || DEFAULT_COLORS;

    useEffect(() => {
        const controls = animate(color, palette, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        });
        return () => controls.stop();
    }, [palette.join("|")]);

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
    const border = useMotionTemplate`1px solid ${color}`;
    const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

    return (
        <motion.section style={{ backgroundImage }} className="relative grid min-h-[70vh] place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200">
            <div className="relative z-10 flex flex-col items-center">
                {title ? (
                    <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl md:text-7xl">
                        {title}
                    </h1>
                ) : null}
                {subcopy ? (
                    <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg">{subcopy}</p>
                ) : null}
                {cta?.href && cta?.label ? (
                    <motion.a
                        href={cta.href}
                        style={{ border, boxShadow }}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
                    >
                        {cta.label}
                        <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
                    </motion.a>
                ) : null}
            </div>

            <div className="absolute inset-0 z-0">
                <StarsCanvas count={aurora?.starsCount ?? 2500} speed={aurora?.starsSpeed ?? 2} />
            </div>
        </motion.section>
    );
};

export default HeroAurora;