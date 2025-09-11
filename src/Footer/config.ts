import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: () => true },
  fields: [
    {
      name: 'brand',
      type: 'group',

      label: 'Brand',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Brand name',
          required: false,
          defaultValue: 'BLUE CASTLE',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo (optional)',
        },
        {
          name: 'logoAlt',
          type: 'text',
          label: 'Logo alt text',
          defaultValue: 'Brand logo',
        },
        {
          name: 'social',
          type: 'group',
          label: 'Social & WhatsApp',
          fields: [
            { name: 'facebook', type: 'text', label: 'Facebook URL' },
            { name: 'twitter', type: 'text', label: 'Twitter / X URL' },
            { name: 'instagram', type: 'text', label: 'Instagram URL' },
            {
              name: 'whatsappPhone',
              type: 'text',
              label: 'WhatsApp (solo dígitos, p. ej. 5216691234567)',
            },
          ],
        },
      ],
    },

    {
      name: 'columns',
      type: 'array',
      label: 'Columns',
      labels: { plural: 'Columns', singular: 'Column' },
      minRows: 1,
      maxRows: 4,
      admin: { initCollapsed: true },
      fields: [
        { name: 'title', type: 'text', label: 'Title' },
        {
          name: 'items',
          type: 'array',
          label: 'Links',
          admin: { initCollapsed: true },
          fields: [
            link({ appearances: false }),
          ],
        },
      ],
      defaultValue: [
        { title: 'Company', items: [] },
        { title: 'Products', items: [] },
        { title: 'Help & Legal', items: [] },
        { title: 'Address', items: [] },
      ],
    },

    {
      name: 'address',
      type: 'textarea',
      label: 'Address (simple text, multiline)',
      admin: { placeholder: 'Blue Castle Ventures Ltd.\n1 World Trade Center, 57th Floor,\nNew York, NY 10007.' },
    },

    {
      type: 'row',
      fields: [
        {
          name: 'legalLeft',
          type: 'textarea',
          label: 'Legal text (left column)',
          admin: { width: '50%', rows: 16 },
        },
        {
          name: 'legalRight',
          type: 'textarea',
          label: 'Legal notes (right column)',
          admin: { width: '50%', rows: 16 },
        },
      ],
    },

    {
      name: 'ssl',
      type: 'group',
      label: 'SSL / Badges',

      fields: [
        { name: 'badge', type: 'upload', relationTo: 'media', label: 'SSL badge' },
        { name: 'badgeAlt', type: 'text', label: 'Badge alt text', defaultValue: 'SSL Secure' },
      ],
    },

    {
      name: 'developedBy',
      type: 'group',
      label: 'Developed by',
      fields: [
        link({ appearances: false, overrides: { name: 'credit' } }),
      ],
    },

    {
      name: 'styles',
      type: 'group',
      label: 'Styles',
      fields: [
        {
          name: 'background',
          type: 'text',
          label: 'Background color',
          defaultValue: '#131217',
        },
        {
          name: 'textColor',
          type: 'text',
          label: 'Text color',
          defaultValue: '#ADADAD',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
