import type { Block } from 'payload';

const validateUrl = (val: unknown) =>
  !val
    ? true
    : typeof val === 'string' && /^https?:\/\//i.test(val)
      ? true
      : 'Debe ser una URL válida que inicie con http:// o https://';

export const Carousel: Block = {
  slug: 'carousel',
  labels: { singular: 'Carrusel', plural: 'Carruseles' },
  fields: [
    {
      name: 'items',
      type: 'array',
      labels: { singular: 'Logo', plural: 'Logos' },
      minRows: 1,
      admin: { description: 'Agrega, elimina o reordena logos libremente.' },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Imagen del logo',
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
          localized: true,
          label: 'Texto alternativo (accesibilidad)',
          admin: { placeholder: 'Ej. “Logo de Empresa X”' },
        },
        {
          name: 'href',
          type: 'text',
          label: 'Enlace del logo (opcional)',
          admin: { description: 'Se abrirá al hacer clic en el logo.', placeholder: 'https://ejemplo.com' },
          validate: validateUrl,
        },
        {
          name: 'newTab',
          type: 'checkbox',
          defaultValue: true,
          label: 'Abrir en nueva pestaña',
        },
      ],
    },

    {
      name: 'height',
      type: 'number',
      label: 'Altura del carrusel',
      defaultValue: 120,
      min: 40,
      max: 400,
      admin: {
        description: 'Altura en píxeles (px).',
        step: 1,
      },
    },

    {
      name: 'perView',
      type: 'group',
      label: 'Logos visibles por breakpoint',
      admin: {
        description: 'Cuántos logos se muestran según el tamaño de pantalla.',
      },
      fields: [
        {
          name: 'base',
          type: 'number',
          defaultValue: 2.5,
          label: 'Tamaño base (móvil)',
          min: 1,
          admin: { description: '< 640px', step: 0.5 },
        },
        {
          name: 'sm',
          type: 'number',
          defaultValue: 3.5,
          label: 'Small (≥ 640px)',
          min: 1,
          admin: { step: 0.5 },
        },
        {
          name: 'md',
          type: 'number',
          defaultValue: 5,
          label: 'Medium (≥ 768px)',
          min: 1,
          admin: { step: 0.5 },
        },
        {
          name: 'lg',
          type: 'number',
          defaultValue: 6,
          label: 'Large (≥ 1024px)',
          min: 1,
          admin: { step: 0.5 },
        },
        {
          name: 'xl',
          type: 'number',
          defaultValue: 7,
          label: 'XL (≥ 1280px)',
          min: 1,
          admin: { step: 0.5 },
        },
      ],
    },
    {
      name: 'autoScroll',
      type: 'group',
      label: 'Auto-scroll',
      fields: [
        {
          name: 'playOnInit',
          type: 'checkbox',
          defaultValue: true,
          label: 'Reproducir automáticamente',
        },
        {
          name: 'speed',
          type: 'number',
          defaultValue: 1,
          label: 'Velocidad',
          min: 0.25,
          max: 5,
          admin: {
            description: '1 = normal. Ajusta entre 0.25 y 5.',
            step: 0.25,
          },
        },
        {
          name: 'stopOnMouseEnter',
          type: 'checkbox',
          defaultValue: true,
          label: 'Pausar al pasar el cursor',
        },
        {
          name: 'stopOnInteraction',
          type: 'checkbox',
          defaultValue: false,
          label: 'Pausar al interactuar',
        },
      ],
    },
  ],
};

export default Carousel;
