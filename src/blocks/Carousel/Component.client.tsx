"use client"
import dynamic from "next/dynamic"

export const CarouselBlockComponent = dynamic(() => import("./Component"), {
  ssr: false
})