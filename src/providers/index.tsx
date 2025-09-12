import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { HeroUIProvider } from "@heroui/react";
import I18nProvider from '@/utilities/i18n/Provider';

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <HeroUIProvider>
      <ThemeProvider>
        <HeaderThemeProvider>
          {children}
        </HeaderThemeProvider>
      </ThemeProvider>
    </HeroUIProvider>
  )
}
