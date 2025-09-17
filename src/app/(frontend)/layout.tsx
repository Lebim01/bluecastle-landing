import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { inter } from './fonts'
import './globals.css'
import RemoveDarkModeProvider from '@/providers/RemoveDarkModeProvider'
import Footer from '@/Footer/Component'

import "@/utilities/i18n";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
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