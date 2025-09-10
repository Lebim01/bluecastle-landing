import type { Field } from 'payload';

export const sectionStyleFields: Field[] = [
  {
    name: 'container',
    type: 'select',
    label: 'Container',
    options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
    defaultValue: 'lg',
  },
  {
    name: 'paddingY',
    type: 'select',
    label: 'Padding vertical',
    options: ['none', 'sm', 'md', 'lg', 'xl'],
    defaultValue: 'lg',
  },
  {
    name: 'height',
    type: 'select',
    label: 'Altura',
    options: [
      { label: 'Auto', value: 'auto' },
      { label: 'Media pantalla', value: 'half' },
      { label: 'Pantalla completa', value: 'screen' },
      { label: 'Personalizada (px)', value: 'custom' },
    ],
    defaultValue: 'auto',
  },
  {
    name: 'customHeight',
    type: 'number',
    label: 'Altura (px)',
    admin: { condition: (_, s) => s?.height === 'custom', step: 1 },
  },
  {
    name: 'background',
    type: 'select',
    label: 'Background',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Muted', value: 'muted' },
      { label: 'Brand', value: 'brand' },
      { label: 'Dark', value: 'dark' },
      { label: 'Imagen', value: 'image' },
      { label: 'Video', value: 'video' },
    ],
    defaultValue: 'default',
  },
  {
    name: 'bgImage',
    type: 'upload',
    relationTo: 'media',
    admin: { condition: (_, s) => s?.background === 'image' },
  },
  {
    name: 'video',
    type: 'group',
    admin: { condition: (_, s) => s?.background === 'video' },
    fields: [
      {
        name: 'sourceType',
        type: 'radio',
        label: 'Fuente de video',
        options: [
          { label: 'Upload', value: 'upload' },
          { label: 'URL externa', value: 'external' },
        ],
        defaultValue: 'upload',
        admin: { layout: 'horizontal' },
      },
      {
        name: 'file',
        label: 'Archivo (Media)',
        type: 'upload',
        relationTo: 'media',
        admin: { condition: (_, s) => s?.sourceType === 'upload' },
      },
      {
        name: 'url',
        label: 'URL (mp4/webm)',
        type: 'text',
        admin: { condition: (_, s) => s?.sourceType === 'external' },
      },
      {
        name: 'poster',
        label: 'Poster (opcional)',
        type: 'upload',
        relationTo: 'media',
      },
      {
        name: 'fit',
        type: 'select',
        label: 'Object fit',
        options: [
          { label: 'Cover (recomendado)', value: 'cover' },
          { label: 'Contain', value: 'contain' },
        ],
        defaultValue: 'cover',
      },
      { name: 'autoplay', type: 'checkbox', defaultValue: true },
      { name: 'muted', type: 'checkbox', defaultValue: true },
      { name: 'loop', type: 'checkbox', defaultValue: true },
      { name: 'playsInline', type: 'checkbox', defaultValue: true },
      {
        name: 'disableOnMobile',
        type: 'checkbox',
        label: 'Ocultar video en móviles (usar poster)',
        defaultValue: true,
      },
      {
        name: 'overlay',
        type: 'group',
        label: 'Overlay',
        fields: [
          { name: 'show', type: 'checkbox', defaultValue: false },
          { name: 'color', type: 'text', defaultValue: '#000000', label: 'Color (hex)' },
          {
            name: 'opacity',
            type: 'number',
            label: 'Opacidad (0–1)',
            defaultValue: 0.35,
            admin: { step: 0.05 },
          },
        ],
      },
    ],
  },

  { name: 'id', type: 'text', label: 'Anchor ID (#seccion)' },
];
