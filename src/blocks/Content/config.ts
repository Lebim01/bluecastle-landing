import type { Block, Field } from 'payload'
import { link } from '@/fields/link'

const when =
  (pred: (p: any) => boolean) =>
    (_data: any, _sibling: any, parent: any) =>
      pred(parent)

const validateUrl = (val: unknown) =>
  !val
    ? true
    : typeof val === 'string' && /^https?:\/\//i.test(val)
      ? true
      : 'Debe ser una URL válida que inicie con http:// o https://'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    label: 'Ancho de columna',
    defaultValue: 'oneThird',
    admin: { description: 'Porcentaje del ancho total que ocupa esta columna' },
    options: [
      { label: '1/3', value: 'oneThird' },
      { label: '1/2', value: 'half' },
      { label: '2/3', value: 'twoThirds' },
      { label: '100% (Full)', value: 'full' },
    ],
  },

  {
    name: 'richText',
    type: 'richText',
    label: 'Contenido',
    localized: true,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    label: 'Agregar enlace al contenido',
    defaultValue: false,
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
        description: 'Se mostrará el enlace si activas "Agregar enlace al contenido".',
      },
    },
  }),
  {
    name: 'surface',
    type: 'group',
    label: 'Superficie',
    admin: { description: 'Fondo y estilo del contenedor de esta columna' },
    fields: [
      {
        name: 'bgColor',
        type: 'select',
        label: 'Color de fondo',
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
        label: 'Bordes redondeados',
        defaultValue: '2xl',
        options: [
          { label: 'Sin bordes', value: 'none' },
          { label: 'md', value: 'md' },
          { label: 'lg', value: 'lg' },
          { label: 'xl', value: 'xl' },
          { label: '2xl', value: '2xl' },
          { label: 'Redondo total', value: 'full' },
        ],
      },
      {
        name: 'shadow',
        type: 'checkbox',
        label: 'Sombra',
        defaultValue: true,
      },
    ],
  },
  {
    name: 'bgImage',
    type: 'group',
    label: 'Imagen de fondo',
    admin: { description: 'Activa para colocar una imagen o URL como fondo de esta columna' },
    fields: [
      { name: 'enabled', type: 'checkbox', label: 'Activar imagen de fondo', defaultValue: false },

      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Imagen subida',
        admin: { condition: (_data, siblingData) => !!siblingData?.enabled },
      },
      {
        name: 'externalUrl',
        type: 'text',
        label: 'URL externa de imagen',
        validate: validateUrl,
        admin: {
          description: 'Tiene prioridad sobre “Imagen subida”. Ej: https://.../imagen.jpg',
          condition: (_data, siblingData) => !!siblingData?.enabled,
          placeholder: 'https://ejemplo.com/imagen.jpg',
        },
      },
      {
        name: 'size',
        type: 'select',
        label: 'Ajuste de imagen',
        defaultValue: 'cover',
        options: [
          { label: 'Cover (cubre todo)', value: 'cover' },
          { label: 'Contain (encaja)', value: 'contain' },
          { label: 'Original (sin ajuste)', value: 'original' },
        ],
        admin: { condition: (_data, siblingData) => !!siblingData?.enabled },
      },
      {
        name: 'position',
        type: 'select',
        label: 'Posición de la imagen',
        defaultValue: 'bottom',
        options: [
          { label: 'Arriba', value: 'top' },
          { label: 'Centro', value: 'center' },
          { label: 'Abajo', value: 'bottom' },
          { label: 'Izquierda', value: 'left' },
          { label: 'Derecha', value: 'right' },
          { label: 'Arriba Izquierda', value: 'top-left' },
          { label: 'Arriba Derecha', value: 'top-right' },
          { label: 'Abajo Izquierda', value: 'bottom-left' },
          { label: 'Abajo Derecha', value: 'bottom-right' },
        ],
        admin: { condition: (_data, siblingData) => !!siblingData?.enabled },
      },
      {
        name: 'opacity',
        type: 'number',
        label: 'Opacidad',
        defaultValue: 100,
        min: 0,
        max: 100,
        admin: {
          description: '0–100 (porcentaje)',
          condition: (_data, siblingData) => !!siblingData?.enabled,
          step: 1,
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
    label: 'Alto personalizado (px)',
    min: 40,
    max: 4000,
    admin: {
      description: 'Se aplica cuando “Alto” = Personalizada (px)',
      condition: when((p) => p?.height === 'custom'),
      step: 10,
      placeholder: 'Ej. 520',
    },
  },

  {
    label: 'Espaciado Vertical',
    name: 'paddingY',
    type: 'select',
    defaultValue: 'md',
    options: [
      { label: 'Sin espaciado', value: 'none' },
      { label: 'Pequeño', value: 'sm' },
      { label: 'Medio', value: 'md' },
      { label: 'Grande', value: 'lg' },
      { label: 'Muy grande', value: 'xl' },
    ],
  },
  {
    label: 'Elementos',
    name: 'elements',
    type: 'blocks',
    admin: { initCollapsed: true, description: 'Agrega bloques de texto, multimedia o llamados a la acción' },
    blocks: [
      {
        slug: 'text',
        labels: { singular: 'Texto', plural: 'Textos' },
        fields: [
          {
            name: 'content',
            type: 'richText',
            label: 'Contenido',
            required: true,
            localized: true,
          },
          {
            name: 'align',
            type: 'select',
            label: 'Alineación',
            defaultValue: 'start',
            options: [
              { label: 'Izquierda', value: 'start' },
              { label: 'Centro', value: 'center' },
              { label: 'Derecha', value: 'end' },
            ],
          },
        ],
      },
      {
        slug: 'media',
        labels: { singular: 'Multimedia', plural: 'Multimedias' },
        fields: [
          {
            label: 'Archivo multimedia',
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
            validate: validateUrl,
            admin: { description: 'URL directa de imagen o video (opcional)', placeholder: 'https://...' },
          },
          {
            label: 'Redondeado',
            name: 'rounded',
            type: 'select',
            defaultValue: '2xl',
            options: [
              { label: 'Sin bordes', value: 'none' },
              { label: 'md', value: 'md' },
              { label: 'lg', value: 'lg' },
              { label: 'xl', value: 'xl' },
              { label: '2xl', value: '2xl' },
              { label: 'Redondo total', value: 'full' },
            ],
          },
          {
            name: 'aspect',
            type: 'select',
            label: 'Relación de aspecto',
            defaultValue: '16/9',
            options: [
              { label: 'Auto', value: 'auto' },
              { label: '16:9', value: '16/9' },
              { label: '4:3', value: '4/3' },
              { label: '1:1', value: '1/1' },
            ],
          },
          {
            label: 'Ajuste',
            name: 'objectFit',
            type: 'select',
            defaultValue: 'cover',
            options: [
              { label: 'Cover (cubre)', value: 'cover' },
              { label: 'Contain (encaja)', value: 'contain' },
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
            label: 'Opciones de video',
            admin: { description: 'Se aplican cuando el archivo o URL es un video' },
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
                validate: validateUrl,
                admin: { placeholder: 'https://.../poster.jpg' },
              },
            ],
          },
        ],
      },
      {
        slug: 'cta',
        labels: { singular: 'Botón / CTA', plural: 'Botones / CTA' },
        fields: [
          { name: 'label', type: 'text', required: true, label: 'Texto del botón' },
          link({}),
          {
            name: 'variant',
            type: 'select',
            label: 'Estilo',
            defaultValue: 'primary',
            options: [
              { label: 'Primario', value: 'primary' },
              { label: 'Secundario', value: 'secondary' },
              { label: 'Enlace', value: 'link' },
            ],
          },
          {
            name: 'align',
            type: 'select',
            label: 'Alineación',
            defaultValue: 'start',
            options: [
              { label: 'Izquierda', value: 'start' },
              { label: 'Centro', value: 'center' },
              { label: 'Derecha', value: 'end' },
            ],
          },
          { name: 'fullWidth', type: 'checkbox', defaultValue: false, label: 'Ocupar todo el ancho' },
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
      label: 'Columnas',
      admin: {
        initCollapsed: true,
        description: 'Agrega una o más columnas y configura su contenido y estilo',
      },
      fields: columnFields,
      minRows: 1,
    },
  ],
}
