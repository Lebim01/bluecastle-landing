import { Field } from 'payload'

export const linkField = (opts?: { label?: string }): Field => ({
  interfaceName: 'LinkField',
  type: 'group',
  name: 'link',
  label: opts?.label ?? 'Enlace',
  admin: { description: 'Enlace interno o externo' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { width: '50%' },
          localized: true,
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'internal',
          options: [
            { label: 'Interno (Documento)', value: 'internal' },
            { label: 'Externo (URL)', value: 'external' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'doc',
      label: 'Documento',
      type: 'relationship',
      relationTo: ['pages', 'posts'],
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'internal',
      },
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      admin: {
        placeholder: 'https://…',
        condition: (_, siblingData) => siblingData?.type === 'external',
      },
      validate: (val: any, { siblingData }: any) => {
        if (siblingData?.type === 'external' && !val) return 'URL requerida'
        return true
      },
    },
    {
      name: 'newTab',
      label: 'Abrir en nueva pestaña',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'utm',
      label: 'UTM (opcional)',
      type: 'text',
      admin: { placeholder: 'utm_source=nav&utm_medium=header', hidden: true },
    },
  ],
})
