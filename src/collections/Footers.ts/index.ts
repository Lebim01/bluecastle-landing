import type { CollectionConfig } from 'payload';

export const Footers: CollectionConfig = {
  slug: 'footers',
  admin: { useAsTitle: 'name', defaultColumns: ['name','updatedAt'] },
  access: { read: () => true, create: ({ req }) => !!req.user, update: ({ req }) => !!req.user, delete: ({ req }) => !!req.user },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'columns',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text' },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'social',
      label: 'Redes',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text' },
        { name: 'href', type: 'text' },
      ],
    },
    { name: 'legal', type: 'textarea' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
};
