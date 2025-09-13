
import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { inter } from './fonts'
import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import RemoveDarkModeProvider from '@/providers/RemoveDarkModeProvider'
import Footer from '@/Footer/Component'

import "@/utilities/i18n";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <Providers>
          <RemoveDarkModeProvider>
            <Header />
            {children}
            <Footer />
          </RemoveDarkModeProvider>
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/site-settings?depth=1`, {
    cache: 'no-store',
  })
  const site = await res.json()

  const faviconUrl =
    site?.favicon && typeof site.favicon === 'object' ? site.favicon.url : '/favicon.ico'

  return {
    title: site?.defaultTitle || 'Blue Castle',
    metadataBase: new URL(getServerSideURL()),
    openGraph: {
      ...mergeOpenGraph(),
      images: site?.defaultOgImage && typeof site.defaultOgImage === 'object'
        ? [site.defaultOgImage.url]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@payloadcms',
    },
    icons: {
      icon: [
        { url: faviconUrl, sizes: '32x32' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
    },
  }
}