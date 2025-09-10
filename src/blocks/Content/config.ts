import type { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

const RT = () =>
  lexicalEditor({
    features: ({ rootFeatures }) => [
      ...rootFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ],
  })

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      { label: 'One Third', value: 'oneThird' },
      { label: 'Half', value: 'half' },
      { label: 'Two Thirds', value: 'twoThirds' },
      { label: 'Full', value: 'full' },
    ],
  },

  {
    name: 'richText',
    type: 'richText',
    editor: RT(),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
      },
    },
  }),

  {
    name: 'elements',
    type: 'blocks',
    admin: { initCollapsed: true },
    blocks: [
      {
        slug: 'text',
        fields: [
          {
            name: 'content',
            type: 'richText',
            editor: RT(),
            required: true,
          },
          {
            name: 'align',
            type: 'select',
            defaultValue: 'start',
            options: [
              { label: 'Start', value: 'start' },
              { label: 'Center', value: 'center' },
              { label: 'End', value: 'end' },
            ],
          },
        ],
      },
      {
        slug: 'media',
        labels: { singular: 'Media', plural: 'Medias' },
        fields: [
          {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            required: false,
          },
          {
            name: 'externalUrl',
            type: 'text',
            required: false,
            admin: { description: 'URL directa de imagen o video (opcional)' },
          },
          {
            name: 'rounded',
            type: 'select',
            defaultValue: '2xl',
            options: [
              { label: 'None', value: 'none' },
              { label: 'md', value: 'md' },
              { label: 'lg', value: 'lg' },
              { label: 'xl', value: 'xl' },
              { label: '2xl', value: '2xl' },
              { label: 'full', value: 'full' },
            ],
          },
          {
            name: 'aspect',
            type: 'select',
            defaultValue: '16/9',
            options: [
              { label: 'Auto', value: 'auto' },
              { label: '16/9', value: '16/9' },
              { label: '4/3', value: '4/3' },
              { label: '1/1', value: '1/1' },
            ],
          },
          {
            name: 'objectFit',
            type: 'select',
            defaultValue: 'cover',
            options: [
              { label: 'Cover', value: 'cover' },
              { label: 'Contain', value: 'contain' },
            ],
          },
          {
            name: 'shadow',
            type: 'checkbox',
            defaultValue: true,
          },
          {
            name: 'videoOptions',
            type: 'group',
            admin: { description: 'Opciones solo para video' },
            fields: [
              {
                name: 'showOverlayControl',
                type: 'checkbox',
                label: 'Mostrar control overlay (play/pausa)',
                defaultValue: true,
              },
              {
                name: 'autoplay',
                type: 'checkbox',
                label: 'Autoplay (recomendado con mute)',
                defaultValue: true,
              },
              {
                name: 'muted',
                type: 'checkbox',
                label: 'Mute',
                defaultValue: true,
              },
              {
                name: 'loop',
                type: 'checkbox',
                label: 'Loop',
                defaultValue: true,
              },
              {
                name: 'poster',
                type: 'text',
                label: 'Poster (URL opcional)',
                required: false,
              },
            ],
          },
        ],
      },
      {
        slug: 'cta',
        fields: [
          { name: 'label', type: 'text', required: true },
          link({}),
          {
            name: 'variant',
            type: 'select',
            defaultValue: 'primary',
            options: [
              { label: 'Primary', value: 'primary' },
              { label: 'Secondary', value: 'secondary' },
              { label: 'Link', value: 'link' },
            ],
          },
          {
            name: 'align',
            type: 'select',
            defaultValue: 'start',
            options: [
              { label: 'Start', value: 'start' },
              { label: 'Center', value: 'center' },
              { label: 'End', value: 'end' },
            ],
          },
          { name: 'fullWidth', type: 'checkbox', defaultValue: false },
        ],
      },
    ],
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: { initCollapsed: true },
      fields: columnFields,
    },
  ],
}
