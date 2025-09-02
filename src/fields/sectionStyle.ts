import type { Field } from 'payload';

export const sectionStyleFields: Field[] = [
  {
    name: 'container',
    type: 'select',
    label: 'Container',
    options: ['sm','md','lg','xl','full'],
    defaultValue: 'lg',
  },
  {
    name: 'paddingY',
    type: 'select',
    label: 'Padding vertical',
    options: ['none','sm','md','lg','xl'],
    defaultValue: 'lg',
  },
  {
    name: 'background',
    type: 'select',
    label: 'Background',
    options: ['default','muted','brand','dark','image'],
    defaultValue: 'default',
  },
  {
    name: 'bgImage',
    type: 'upload',
    relationTo: 'media',
    admin: { condition: (_, s) => s?.background === 'image' },
  },
  { name: 'id', type: 'text', label: 'Anchor ID (#seccion)' },
];
