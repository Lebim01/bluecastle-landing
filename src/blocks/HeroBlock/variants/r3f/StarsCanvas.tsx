"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export function StarsCanvas({ count = 2500, speed = 2 }: { count?: number; speed?: number }) {
    return (
        <Canvas>
            <Stars radius={50} count={count} factor={4} fade speed={speed} />
        </Canvas>
    );
}