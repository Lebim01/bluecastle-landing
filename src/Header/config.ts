import { NavItem } from '@/blocks/NavItem'
import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'branding',
      label: 'Branding',
      type: 'group',
      fields: [
        {
          name: 'style',
          label: 'Estilo de logo',
          type: 'select',
          defaultValue: 'wordmark',
          options: [
            { label: 'Wordmark (solo texto)', value: 'wordmark' },
            { label: 'Isotipo (símbolo)', value: 'isotype' },
            { label: 'Isologo (símbolo + texto)', value: 'isologo' },
            { label: 'Solo texto (fallback)', value: 'text' },
          ],
          admin: { description: 'Define cómo se presentará el logo en el header.' },
        },
        {
          name: 'size',
          label: 'Tamaño',
          type: 'select',
          defaultValue: 'md',
          interfaceName: 'HeaderLogoSize',
          options: [
            { label: 'Pequeño', value: 'sm' },
            { label: 'Mediano', value: 'md' },
            { label: 'Grande', value: 'lg' },
            { label: 'XL', value: 'xl' },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'logoLight',
              label: 'Logo (modo claro)',
              type: 'upload',
              relationTo: 'media',
              admin: { width: '50%' },
            },
            {
              name: 'logoDark',
              label: 'Logo (modo oscuro)',
              type: 'upload',
              relationTo: 'media',
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt/Aria label',
          admin: { description: 'Texto alternativo accesible para el logo.' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'sticky',
          type: 'checkbox',
          label: 'Sticky al hacer scroll',
          defaultValue: true,
          admin: { width: '25%' },
        },
        {
          name: 'showSearch',
          type: 'checkbox',
          label: 'Mostrar buscador',
          defaultValue: true,
          admin: { width: '25%', hidden: true },
        },
      ],
    },
    {
      name: 'nav',
      type: 'blocks',
      label: 'Navegación',
      blocks: [NavItem],
      admin: {
        description:
          'Agrega ítems de navegación. Usa "Dropdown" o "Mega menú" para menús anidados.',
      },
    },
  ]
}
