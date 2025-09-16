'use client'

import React from 'react'

export type TradingViewNewsBlockProps = {
  heading?: string
  dimensions?: { width?: string; height?: string }
  appearance?: {
    colorTheme?: 'light' | 'dark'
    isTransparent?: boolean
    displayMode?: 'regular' | 'compact'
    locale?: string
  }
  feed?: {
    mode?: 'all_symbols' | 'market' | 'symbol'
    market?: 'stock' | 'forex' | 'crypto'
    symbol?: string
  }
}

// Utilidad para limpiar y reinyectar el script cada vez que cambian props
function useTradingViewTimeline(config: any) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const container = ref.current
    if (!container) return

    // Limpia instancias previas
    container.innerHTML = ''

    // Contenedor requerido por TW
    const widgetInner = document.createElement('div')
    widgetInner.className = 'tradingview-widget-container__widget'

    const copyright = document.createElement('div')
    copyright.className = 'tradingview-widget-copyright'
    copyright.innerHTML = '<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">News by TradingView</a>'

    // Script de TradingView (Timeline / Top Stories)
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js'
    script.innerHTML = JSON.stringify(config)

    container.appendChild(widgetInner)
    container.appendChild(script)
    container.appendChild(copyright)

    return () => {
      // Limpieza al desmontar
      container.innerHTML = ''
    }
  }, [JSON.stringify(config)])

  return ref
}

export default function TradingViewNewsBlock(props: TradingViewNewsBlockProps) {
  const width = props.dimensions?.width ?? '100%'
  const height = props.dimensions?.height ?? '600'

  // Construimos la config esperada por el widget de TradingView
  const config = React.useMemo(() => {
    const base: any = {
      colorTheme: props.appearance?.colorTheme ?? 'dark',
      isTransparent: props.appearance?.isTransparent ?? false,
      displayMode: props.appearance?.displayMode ?? 'regular',
      locale: props.appearance?.locale ?? 'es',
      width,
      height,
      // feedMode / market / symbol según lo configurado
      feedMode: props.feed?.mode ?? 'all_symbols',
    }
    if (props.feed?.mode === 'market' && props.feed?.market) {
      base.market = props.feed.market
    }
    if (props.feed?.mode === 'symbol' && props.feed?.symbol) {
      base.symbol = props.feed.symbol
    }
    return base
  }, [width, height, JSON.stringify(props.appearance), JSON.stringify(props.feed)])

  const containerRef = useTradingViewTimeline(config)

  return (
    <section className="w-full">
      {props.heading && <h2 className="mb-4 text-2xl font-bold">{props.heading}</h2>}
      <div
        ref={containerRef}
        className="tradingview-widget-container"
        style={{ width: typeof width === 'string' ? width : undefined }}
      />
    </section>
  )
}