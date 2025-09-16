import { Block } from "payload";


export const TradingViewNews: Block = {
  slug: 'tradingViewNews',
  labels: {
    singular: 'Noticias (TradingView)',
    plural: 'Noticias (TradingView)',
  },
  imageAltText: 'Widget de noticias de TradingView',
  fields: [
    { name: 'heading', type: 'text', label: 'Título (opcional)' },
    {
      name: 'dimensions',
      type: 'group',
      label: 'Dimensiones',
      fields: [
        { name: 'width', type: 'text', label: 'Ancho', defaultValue: '100%' },
        { name: 'height', type: 'text', label: 'Alto', defaultValue: '600' },
      ],
    },
    {
      name: 'appearance',
      type: 'group',
      label: 'Apariencia',
      fields: [
        {
          name: 'colorTheme',
          type: 'select',
          label: 'Tema',
          defaultValue: 'dark',
          options: [
            { label: 'Oscuro', value: 'dark' },
            { label: 'Claro', value: 'light' },
          ],
        },
        { name: 'isTransparent', type: 'checkbox', label: 'Fondo transparente', defaultValue: false },
        {
          name: 'displayMode',
          type: 'select',
          label: 'Modo de visualización',
          defaultValue: 'regular',
          options: [
            { label: 'Regular', value: 'regular' },
            { label: 'Compacto', value: 'compact' },
          ],
        },
        { name: 'locale', type: 'text', label: 'Locale', defaultValue: 'es' },
      ],
    },
    {
      name: 'feed',
      type: 'group',
      label: 'Fuente de noticias',
      fields: [
        {
          name: 'mode',
          type: 'select',
          label: 'Modo',
          defaultValue: 'all_symbols',
          options: [
            { label: 'Todo el mercado', value: 'all_symbols' },
            { label: 'Por mercado', value: 'market' },
            { label: 'Por símbolo', value: 'symbol' },
          ],
        },
        {
          name: 'market',
          type: 'select',
          label: 'Mercado (si "Por mercado")',
          options: [
            { label: 'Acciones', value: 'stock' },
            { label: 'Forex', value: 'forex' },
            { label: 'Cripto', value: 'crypto' },
          ],
        },
        {
          name: 'symbol',
          type: 'text',
          label: 'Símbolo (si "Por símbolo") — ej: NASDAQ:AAPL',
        },
      ],
    },
  ],
}