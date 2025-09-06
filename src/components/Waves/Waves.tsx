"use client";

import { useEffect, useRef, useMemo } from "react";

interface MovingWavesProps {
    scrollProgress: number;
}

function interpolarColorHex(
    color1: string,
    color2: string,
    porcentaje: number
) {
    // Normaliza el porcentaje al rango [0, 1]
    porcentaje = Math.max(0, Math.min(1, porcentaje));

    // Convierte hexadecimal a valores RGB
    const hexToRgb = (hex: string) => {
        hex = hex.replace("#", "");
        const bigint = parseInt(hex, 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255,
        };
    };

    // Convierte RGB a hexadecimal
    const rgbToHex = ({ r, g, b }: any) => {
        const toHex = (c: any) => c.toString(16).padStart(2, "0");
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);

    // Interpolación lineal por canal
    const interpolado = {
        r: Math.round(c1.r + (c2.r - c1.r) * porcentaje),
        g: Math.round(c1.g + (c2.g - c1.g) * porcentaje),
        b: Math.round(c1.b + (c2.b - c1.b) * porcentaje),
    };

    return rgbToHex(interpolado);
}

export default function MovingWaves({ scrollProgress }: MovingWavesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const bars = useMemo(
        () =>
            Array.from({ length: 100 }, () => ({
                amplitude: Math.random() * 20 + 20,
                frequency: Math.random() * 0.003 + 0.001,
                phase: Math.random() * Math.PI * 2,
            })),
        []
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const render = (time: number) => {
            const width = (canvas.width = canvas.offsetWidth);
            const height = (canvas.height = canvas.offsetHeight);

            ctx.clearRect(0, 0, width, height);

            const barWidth = width / (bars.length * 1.5);
            const gapBetweenBars = 8;

            const baseHeight = height * (0.85 - scrollProgress * 0.4);

            const tops: number[] = [];

            for (let i = 0; i < bars.length; i++) {
                const bar = bars[i];
                const x = i * (barWidth + gapBetweenBars);

                const scrollAmplitudeBoost = scrollProgress * 10;
                const sineMovement =
                    Math.sin(time * bar.frequency + bar.phase) *
                    (bar.amplitude + scrollAmplitudeBoost);

                const topY = baseHeight + sineMovement;
                tops.push(topY);
            }

            for (let i = 0; i < bars.length; i++) {
                const x = i * (barWidth + gapBetweenBars);
                const y = tops[i];
                const nextY = tops[i + 1] ?? y;

                ctx.beginPath();
                ctx.moveTo(x, y);
                const xc = x + (barWidth + gapBetweenBars) / 2;
                const yc = (y + nextY) / 2;
                ctx.quadraticCurveTo(xc, yc, x + barWidth, nextY);
                ctx.lineTo(x + barWidth, height);
                ctx.lineTo(x, height);
                ctx.closePath();

                const gradient = ctx.createLinearGradient(0, y, 0, height);
                gradient.addColorStop(
                    0,
                    interpolarColorHex("#061f47", "#0a50c1", i / bars.length)
                );
                gradient.addColorStop(1, "rgba(10, 80, 193, 0)");

                ctx.fillStyle = gradient;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [bars, scrollProgress]);

    return (
        <div className="w-full h-full overflow-hidden relative">
            <canvas ref={canvasRef} className="absolute bottom-0 w-full h-full" />
        </div>
    );
}
