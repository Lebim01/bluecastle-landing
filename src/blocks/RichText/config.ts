import { Block } from 'payload'

export const RichText: Block = {
  slug: 'richText',
  labels: { singular: 'Rich Text', plural: 'Rich Text' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Contenido',
      required: true,
      localized: true,
    },
  ],
}
