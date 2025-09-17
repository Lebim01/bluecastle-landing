import { Block } from 'payload'

export const NewsroomMention: Block = {
  slug: 'newsroomMention',
  labels: {
    singular: 'Aparición en prensa',
    plural: 'Apariciones en prensa',
  },
  fields: [
    {
      name: 'outletName',
      type: 'text',
      label: 'Medio / Outlet',
      required: true,
      localized: true,
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Título / Headline',
      required: true,
      localized: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Resumen breve',
      localized: true,
    },
    {
      name: 'date',
      type: 'date',
      label: 'Fecha de publicación',
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Logo del medio',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'link',
      type: 'group',
      label: 'Enlace a la nota',
      fields: [
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
          admin: { placeholder: 'https://...' },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Texto del botón',
          localized: true,
          admin: { placeholder: 'Ver nota' },
        },
      ],
    },
  ],
}
