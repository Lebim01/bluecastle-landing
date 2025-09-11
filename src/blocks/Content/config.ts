import type { Block, Field } from 'payload'
import { link } from '@/fields/link'

const when =
  (pred: (p: any) => boolean) =>
    (_data: any, _sibling: any, parent: any) =>
      pred(parent)


const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      { label: '1/3', value: 'oneThird' },
      { label: '1/2', value: 'half' },
      { label: '2/3', value: 'twoThirds' },
      { label: 'Full', value: 'full' },
    ],
  },

  {
    name: 'richText',
    type: 'richText',
    label: 'Content',
    localized: true,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
      },
    },
  }),
  {
    name: 'surface',
    type: 'group',
    fields: [
      {
        name: 'bgColor',
        type: 'select',
        defaultValue: 'transparent',
        options: [
          { label: 'Transparente', value: 'transparent' },
          { label: 'Blanco', value: 'white' },
          { label: 'Negro', value: 'black' },
          { label: 'Slate 50', value: 'slate-50' },
          { label: 'Slate 100', value: 'slate-100' },
          { label: 'Slate 900', value: 'slate-900' },
        ],
      },
      {
        name: 'rounded',
        type: 'select',
        defaultValue: '2xl',
        options: [
          { label: 'None', value: 'none' },
          { label: 'md', value: 'md' },
          { label: 'lg', value: 'lg' },
          { label: 'xl', value: 'xl' },
          { label: '2xl', value: '2xl' },
          { label: 'full', value: 'full' },
        ],
      },
      { name: 'shadow', type: 'checkbox', defaultValue: true },
    ],
  },
  {
    name: 'Imagen de Fondo',
    type: 'group',
    fields: [
      { name: 'enabled', type: 'checkbox', defaultValue: false },

      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        admin: { condition: (_data, siblingData) => !!siblingData?.enabled },
      },
      {
        name: 'externalUrl',
        type: 'text',
        admin: {
          description: 'Prioridad sobre "image" (opcional)',
          condition: (_data, siblingData) => !!siblingData?.enabled,
        },
      },
      {
        name: 'size',
        type: 'select',
        defaultValue: 'cover',
        options: [
          { label: 'Cover (llena)', value: 'cover' },
          { label: 'Contain', value: 'contain' },
          { label: 'Original', value: 'original' },
        ],
        admin: { condition: (_data, siblingData) => !!siblingData?.enabled },
      },
      {
        name: 'position',
        type: 'select',
        defaultValue: 'bottom',
        options: [
          { label: 'Top', value: 'top' },
          { label: 'Center', value: 'center' },
          { label: 'Bottom', value: 'bottom' },
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
          { label: 'Top Left', value: 'top-left' },
          { label: 'Top Right', value: 'top-right' },
          { label: 'Bottom Left', value: 'bottom-left' },
          { label: 'Bottom Right', value: 'bottom-right' },
        ],
        admin: { condition: (_data, siblingData) => !!siblingData?.enabled },
      },
      {
        name: 'opacity',
        type: 'number',
        defaultValue: 100,
        admin: {
          description: '0–100 (porcentaje)',
          condition: (_data, siblingData) => !!siblingData?.enabled,
        },
      },
    ],
  },
  {
    label: 'Alto',
    name: 'height',
    type: 'select',
    defaultValue: 'auto',
    options: [
      { label: 'Auto', value: 'auto' },
      { label: 'Chica (~260px)', value: 'sm' },
      { label: 'Media (~360px)', value: 'md' },
      { label: 'Grande (~480px)', value: 'lg' },
      { label: 'XL (~600px)', value: 'xl' },
      { label: 'Pantalla (100vh)', value: 'screen' },
      { label: 'Auto Full', value: 'full' },
      { label: 'Personalizada (px)', value: 'custom' },
    ],
  },
  {
    name: 'customHeightPx',
    type: 'number',
    admin: {
      description: 'Aplica cuando Height = Personalizada',
      condition: when((p) => p?.height === 'custom'),
    },
  },

  // — PADDING Y —
  {
    label: 'Espaciado Vertical',
    name: 'paddingY',
    type: 'select',
    defaultValue: 'md',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Sm', value: 'sm' },
      { label: 'Md', value: 'md' },
      { label: 'Lg', value: 'lg' },
      { label: 'Xl', value: 'xl' },
    ],
  },
  {
    label: "Elementos",
    name: 'elements',
    type: 'blocks',
    admin: { initCollapsed: true },
    blocks: [
      {
        slug: 'text',
        fields: [
          {
            name: 'content',
            type: 'richText',
            label: 'Content',
            required: true,
            localized: true,
          },
          {
            name: 'align',
            type: 'select',
            defaultValue: 'start',
            options: [
              { label: 'Start', value: 'start' },
              { label: 'Center', value: 'center' },
              { label: 'End', value: 'end' },
            ],
          },
        ],
      },
      {
        slug: 'media',
        labels: { singular: 'Media', plural: 'Medias' },
        fields: [
          {
            label: 'Multimedia',
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            required: false,
          },
          {
            label: 'Link externo',
            name: 'externalUrl',
            type: 'text',
            required: false,
            admin: { description: 'URL directa de imagen o video (opcional)' },
          },
          {
            label: 'Redondeado',
            name: 'rounded',
            type: 'select',
            defaultValue: '2xl',
            options: [
              { label: 'None', value: 'none' },
              { label: 'md', value: 'md' },
              { label: 'lg', value: 'lg' },
              { label: 'xl', value: 'xl' },
              { label: '2xl', value: '2xl' },
              { label: 'full', value: 'full' },
            ],
          },
          {
            name: 'aspect',
            type: 'select',
            defaultValue: '16/9',
            options: [
              { label: 'Auto', value: 'auto' },
              { label: '16/9', value: '16/9' },
              { label: '4/3', value: '4/3' },
              { label: '1/1', value: '1/1' },
            ],
          },
          {
            label: 'Ajustar',
            name: 'objectFit',
            type: 'select',
            defaultValue: 'cover',
            options: [
              { label: 'Cover', value: 'cover' },
              { label: 'Contain', value: 'contain' },
            ],
          },
          {
            label: 'Sombra',
            name: 'shadow',
            type: 'checkbox',
            defaultValue: true,
          },
          {
            name: 'videoOptions',
            type: 'group',
            admin: { description: 'Opciones solo para video' },
            fields: [
              {
                name: 'showOverlayControl',
                type: 'checkbox',
                label: 'Mostrar control overlay (play/pausa)',
                defaultValue: true,
              },
              {
                name: 'autoplay',
                type: 'checkbox',
                label: 'Autoplay (recomendado con mute)',
                defaultValue: true,
              },
              {
                name: 'muted',
                type: 'checkbox',
                label: 'Mute',
                defaultValue: true,
              },
              {
                name: 'loop',
                type: 'checkbox',
                label: 'Loop',
                defaultValue: true,
              },
              {
                name: 'poster',
                type: 'text',
                label: 'Poster (URL opcional)',
                required: false,
              },
            ],
          },
        ],
      },
      {
        slug: 'cta',
        fields: [
          { name: 'label', type: 'text', required: true },
          link({}),
          {
            name: 'variant',
            type: 'select',
            defaultValue: 'primary',
            options: [
              { label: 'Primary', value: 'primary' },
              { label: 'Secondary', value: 'secondary' },
              { label: 'Link', value: 'link' },
            ],
          },
          {
            name: 'align',
            type: 'select',
            defaultValue: 'start',
            options: [
              { label: 'Start', value: 'start' },
              { label: 'Center', value: 'center' },
              { label: 'End', value: 'end' },
            ],
          },
          { name: 'fullWidth', type: 'checkbox', defaultValue: false },
        ],
      },
    ],
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: { initCollapsed: true },
      fields: columnFields,
    },
  ],
}
