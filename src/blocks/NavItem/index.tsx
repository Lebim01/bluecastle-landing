import { linkField } from '@/fields/linkField'
import type { Block } from 'payload'

export const NavItem: Block = {
  slug: 'navItem',
  interfaceName: 'HeaderNavItem',
  labels: { singular: 'Item de navegación', plural: 'Items de navegación' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'idKey',
          type: 'text',
          label: 'Clave (opcional para tracking)',
          admin: { width: '33%' },
        },
        {
          name: 'style',
          type: 'select',
          label: 'Estilo',
          defaultValue: 'link',
          options: [
            { label: 'Enlace simple', value: 'link' },
            { label: 'Dropdown', value: 'dropdown' },
            { label: 'Mega menú', value: 'mega' },
          ],
          admin: { width: '33%' },
        },
        {
          name: 'visible',
          type: 'checkbox',
          label: 'Visible',
          defaultValue: true,
          admin: { width: '33%' },
        },
      ],
    },

    linkField({ label: 'Enlace principal' }),

    // Dropdown simple
    {
      name: 'children',
      type: 'array',
      label: 'Hijos (para dropdown)',
      admin: {
        condition: (_, siblingData) => siblingData?.style === 'dropdown',
      },
      fields: [linkField({ label: 'Enlace hijo' })],
    },

    // Mega menú: columnas y grupos
    {
      type: 'group',
      name: 'mega',
      label: 'Mega menú',
      admin: {
        condition: (_, siblingData) => siblingData?.style === 'mega',
      },
      fields: [
        {
          name: 'columns',
          type: 'array',
          label: 'Columnas',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Título de columna',
            },
            {
              name: 'items',
              type: 'array',
              label: 'Enlaces',
              fields: [linkField({ label: 'Enlace' })],
            },
          ],
        },
        {
          name: 'promo',
          type: 'group',
          label: 'Bloque promo (opcional)',
          fields: [
            { name: 'headline', type: 'text' },
            { name: 'subhead', type: 'text' },
            { name: 'image', type: 'upload', relationTo: 'media' },
            linkField({ label: 'CTA' }),
          ],
        },
      ],
    },

    // Control de visibilidad por rol / etiqueta
    {
      name: 'audience',
      label: 'Público objetivo (opcional)',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Todos', value: 'all' },
        { label: 'Guests', value: 'guest' },
        { label: 'Usuarios logueados', value: 'user' },
        { label: 'Admins', value: 'admin' },
      ],
      defaultValue: ['all'],
    },

    // Orden
    {
      name: 'order',
      label: 'Orden',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
