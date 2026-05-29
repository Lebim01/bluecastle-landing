import type { Block } from "payload";
import { RichText } from "../RichText/config";

export const CoreCollection: Block = {
  slug: "coreCollection",
  labels: { singular: "Core Collection", plural: "Core Collections" },
  fields: [
    {
      type: 'group',
      name: 'header',
      label: 'Cabecera',
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Etiqueta',
          defaultValue: 'Core Collection',
        },
        {
          name: 'title',
          type: 'blocks',
          label: 'Título',
          blocks: [RichText],
          defaultValue: [
            {
              blockType: 'richText',
              content: {
                root: {
                  type: 'root',
                  children: [
                    {
                      children: [
                        {
                          text: 'Built for every ',
                          type: 'text',
                          version: 1,
                        },
                        {
                          text: 'horizon.',
                          type: 'text',
                          format: 2, // Italic
                          version: 1,
                        },
                      ],
                      type: 'heading',
                      tag: 'h2',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
        {
          name: 'description',
          type: 'blocks',
          label: 'Descripción',
          blocks: [RichText],
          defaultValue: [
            {
              blockType: 'richText',
              content: {
                root: {
                  type: 'root',
                  children: [
                    {
                      children: [
                        {
                          text: 'Three foundational certificates, each inspired by an iconic New York neighborhood, each designed for a different investor profile and time horizon.',
                          type: 'text',
                          version: 1,
                        },
                      ],
                      type: 'paragraph',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
      ]
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Tarjetas de Productos',
      minRows: 1,
      maxRows: 3,
      defaultValue: [
        {
          badge: 'MONTHLY GROWTH • SHORT TERM',
          title: 'SoHo certificate',
          description: 'Steady, compounding growth with consistent monthly performance. Designed for investors who want measurable results on a shorter horizon without sacrificing returns.',
          features: [
            { label: 'Minimum', value: '$1,000 USD' },
            { label: 'Return', value: 'Up to 20% anual' },
            { label: 'Term', value: '12 months • fixed' },
            { label: 'Withdrawls', value: 'At maturity' },
          ],
          buttonLabel: 'Request Info',
        },
        {
          badge: 'CAPITALIZATION • MEDIUM TERM',
          title: 'Tribeca Growth',
          description: 'Strategic capitalization for those who think long. Reinvestment compounding and high-yield potential designed to multiply your principal over a structured 36-month period.',
          features: [
            { label: 'Minimum', value: '$10,000 USD' },
            { label: 'Return', value: 'Up to x2.5 capitall' },
            { label: 'Term', value: '36 months • fixed' },
            { label: 'Withdrawls', value: 'At maturity' },
          ],
          buttonLabel: 'Request Info',
        },
        {
          badge: 'RETIREMENT • LONG TERM',
          title: 'Hamptons Legacy',
          description: 'Lifelong income from a single investment. Monthly payments for life, calculated based on your age at the time of entry. Available for members aged 24 to 59.',
          features: [
            { label: 'Minimum', value: '$25,000 USD' },
            { label: 'Return', value: 'Payments for lifel' },
            { label: 'Term', value: '72 months • fixed' },
            { label: 'Withdrawls', value: 'From ages 30' },
          ],
          buttonLabel: 'Request Info',
        }
      ],
      fields: [
        {
          name: 'badge',
          type: 'text',
          label: 'Badge (Superior)',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Especificaciones',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Etiqueta',
            },
            {
              name: 'value',
              type: 'text',
              label: 'Valor',
            }
          ]
        },
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Texto del Botón',
          defaultValue: 'Request Info',
        }
      ]
    }
  ],
};

export default CoreCollection;
