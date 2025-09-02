import type { CollectionConfig } from 'payload';

export const Headers: CollectionConfig = {
  slug: 'headers',
  admin: { useAsTitle: 'name', defaultColumns: ['name','updatedAt'] },
  access: { read: () => true, create: ({ req }) => !!req.user, update: ({ req }) => !!req.user, delete: ({ req }) => !!req.user },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'nav',
      label: 'Navegación',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        // Puedes reutilizar tu link.ts o un link simple:
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'Href (ej. /#features o /landing)',
        },
      ],
    },
    { name: 'sticky', type: 'checkbox', defaultValue: true },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
};
