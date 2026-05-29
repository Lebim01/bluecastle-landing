import type { Block } from "payload";
import { RichText } from "../RichText/config";

export const LimitedEdition: Block = {
  slug: "limitedEdition",
  labels: { singular: "Limited Edition", plural: "Limited Editions" },
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
          defaultValue: 'Limited Edition',
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
                          text: 'When the window open, ',
                          type: 'text',
                          version: 1,
                        },
                        {
                          text: 'it closes.',
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
                          text: 'Limited edition certificates are issued in exclusive windows with fixed availability. Once the window closes, they are no longer offered.',
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
      maxRows: 2,
      defaultValue: [
        {
          title: 'Brooklyn Heights',
          description: 'A Merchant Cash Advance instrument under Wyoming law. BCV advances capital to U.S. businesses in exchange for a percentage of future revenues, delivering a fixed 30% return at maturity in just 6 months.',
          features: [
            { label: 'Minimum', value: '$25,000 USD' },
            { label: 'Return', value: '5% monthly' },
            { label: 'Term', value: '6 months • fixed' },
            { label: 'Structure', value: 'Merchant Cash Advance' },
          ],
          buttonLabel: 'Request Info',
        },
        {
          title: 'Hudson certificate',
          description: 'An accessible fixed-term certificate with a competitive annual yield. The Hudson is designed for investors looking to enter the BCV ecosystem with a lower minimum while locking in a structured, transparent return.',
          features: [
            { label: 'Minimum', value: '$1,000 USD' },
            { label: 'Return', value: '12% anual' },
            { label: 'Term', value: '12 months • fixed' },
            { label: 'Withdrawls', value: 'At maturity' },
          ],
          buttonLabel: 'Request Info',
        }
      ],
      fields: [
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

export default LimitedEdition;
