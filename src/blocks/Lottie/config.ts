import { Block } from "payload";


export const LottieAnimation: Block = {
  slug: 'lottieAnimation',
  labels: { singular: 'Lottie', plural: 'Lotties' },
  fields: [
    {
      name: 'sourceType',
      type: 'select',
      label: 'Fuente',
      required: true,
      defaultValue: 'upload',
      options: [
        { label: 'URL (CDN)', value: 'url' },
        { label: 'JSON embebido', value: 'inline' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, s) => s?.sourceType === 'url',
        description: 'Ej. https://cdn.site.com/anim.json',
      },
    },
    {
      name: 'json',
      type: 'json', // si no tienes este field-type, usa { type: 'code', admin: { language: 'json' } }
      admin: { condition: (_, s) => s?.sourceType === 'inline' },
    },

    // Comportamiento
    {
      type: 'row',
      fields: [
        { name: 'autoplay', type: 'checkbox', label: 'Autoplay', defaultValue: true },
        { name: 'loop', type: 'checkbox', label: 'Loop', defaultValue: true },
        { name: 'playOnHover', type: 'checkbox', label: 'Reproducir al hover', defaultValue: false },
        { name: 'playOnView', type: 'checkbox', label: 'Reproducir al entrar en viewport', defaultValue: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'speed', type: 'number', label: 'Velocidad', defaultValue: 1, min: 0.1, max: 4 },
        {
          name: 'direction',
          type: 'select',
          label: 'Dirección',
          defaultValue: 1,
          options: [
            { label: 'Normal (1)', value: '1' },
            { label: 'Invertida (-1)', value: '-1' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'renderer',
          type: 'select',
          label: 'Renderer',
          defaultValue: 'svg',
          options: [
            { label: 'SVG (recomendado)', value: 'svg' },
            { label: 'Canvas', value: 'canvas' },
            { label: 'HTML', value: 'html' },
          ],
        },
        {
          name: 'preserveAspectRatio',
          type: 'text',
          label: 'preserveAspectRatio',
          defaultValue: 'xMidYMid meet', // igual que SVG
        },
      ],
    },

    // Presentación
    {
      type: 'row',
      fields: [
        { name: 'width', type: 'text', label: 'Width (CSS)', defaultValue: '100%' },
        { name: 'height', type: 'text', label: 'Height (CSS)', defaultValue: 'auto' },
        { name: 'background', type: 'text', label: 'Fondo (CSS)', defaultValue: 'transparent' },
      ],
    },
    { name: 'className', type: 'text', label: 'Clase extra' },
    { name: 'ariaLabel', type: 'text', label: 'Aria label', defaultValue: 'Animación' },

    // Fallback
    {
      name: 'fallbackImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen fallback (opcional)',
    },

    // Avanzado
    {
      name: 'rendererSettings',
      type: 'json',
      label: 'Renderer settings (opcional)',
      admin: { description: 'Se fusiona con la config por defecto de lottie-web' },
    },
  ],
}
