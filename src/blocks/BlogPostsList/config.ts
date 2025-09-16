import type { Block } from "payload";

export const BlogPostsList: Block = {
  slug: 'blogPostsList',
  labels: {
    singular: 'Listado de Posts',
    plural: 'Listados de Posts',
  },
  imageAltText: 'Listado de posts del blog',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Título (opcional)',
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Variante de diseño',
      defaultValue: 'cards',
      options: [
        { label: 'Tarjetas', value: 'cards' },
        { label: 'Listado simple', value: 'list' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'limit',
          type: 'number',
          label: 'Cantidad a mostrar',
          defaultValue: 6,
          min: 1,
          max: 48,
        },
        {
          name: 'columns',
          type: 'number',
          label: 'Columnas (grid)',
          defaultValue: 3,
          min: 1,
          max: 4,
        },
      ],
    },
    {
      name: 'filters',
      type: 'group',
      label: 'Filtros',
      fields: [
        {
          name: 'search',
          type: 'text',
          label: 'Buscar en título/extracto (opcional)'
        },
        {
          name: 'categories',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: true,
          label: 'Categorías a incluir (opcional)'
        },
        {
          name: 'excludeIDs',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          label: 'Posts a excluir (opcional)'
        },
        {
          name: 'sort',
          type: 'select',
          label: 'Orden',
          defaultValue: '-publishedAt',
          options: [
            { label: 'Más recientes', value: '-publishedAt' },
            { label: 'Más antiguos', value: 'publishedAt' },
            { label: 'Título (A→Z)', value: 'title' },
            { label: 'Título (Z→A)', value: '-title' },
          ],
        },
      ]
    },
    {
      name: 'show',
      type: 'group',
      label: 'Mostrar',
      fields: [
        { name: 'showImage', type: 'checkbox', defaultValue: true, label: 'Imagen de portada' },
        { name: 'showCategories', type: 'checkbox', defaultValue: true, label: 'Categorías' },
        { name: 'showDate', type: 'checkbox', defaultValue: true, label: 'Fecha' },
        { name: 'showAuthor', type: 'checkbox', defaultValue: false, label: 'Autor' },
        { name: 'showExcerpt', type: 'checkbox', defaultValue: true, label: 'Extracto' },
        { name: 'showPaginationLink', type: 'checkbox', defaultValue: false, label: 'Enlace a /blog' },
      ],
    },
    {
      name: 'advanced',
      type: 'group',
      label: 'Avanzado',
      fields: [
        {
          name: 'manualItems',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          label: 'Seleccionar posts manualmente (prioritarios)'
        },
        {
          name: 'cardAspect',
          type: 'select',
          label: 'Proporción de tarjeta',
          defaultValue: '16/9',
          options: [
            { label: '16/9', value: '16/9' },
            { label: '4/3', value: '4/3' },
            { label: '1/1', value: '1/1' },
          ],
        },
      ],
    },
  ],
}