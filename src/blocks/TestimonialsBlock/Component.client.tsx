"use client"
import dynamic from "next/dynamic"

export const TestimonialsBlock = dynamic(() => import("./Component").then(mod => mod.TestimonialsBlock), {
  ssr: false
})