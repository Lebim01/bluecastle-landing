import type { Block } from "payload";
import { RichText } from "../RichText/config";

export const ComparisonBlock: Block = {
  slug: "comparisonBlock",
  labels: { singular: "Comparison Block", plural: "Comparison Blocks" },
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
          defaultValue: 'Full comparison',
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
                        { text: 'All products, ', type: 'text', version: 1 },
                        { text: 'side by side.', type: 'text', format: 2, version: 1 },
                      ],
                      type: 'heading', tag: 'h2', version: 1,
                    },
                  ],
                },
              },
            },
          ]
        }
      ]
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Filas de la Tabla',
      defaultValue: [
        { product: 'SoHo Certificate', type: 'Monthly Growth', minimum: '$1,000', return: 'Up to 20% anual', term: '12 Months', statuts: 'ACTIVE' },
        { product: 'Tribeca Growth', type: 'Capitalization', minimum: '$10,000', return: 'Up to 2.5x capital', term: '36 Months', statuts: 'ACTIVE' },
        { product: 'Hamptons Legacy', type: 'Retirement', minimum: '$25,000', return: 'Monthly for life', term: '72 Months', statuts: 'ACTIVE' },
        { product: 'Brooklyn Heights', type: 'Limited', minimum: '$25,000', return: '30% fixed', term: '6 Months', statuts: 'LIMITED' },
        { product: 'Hudson Certificate', type: 'Limited', minimum: '$1,000', return: '12% anual', term: '12 Months', statuts: 'LIMITED' },
      ],
      fields: [
        { name: 'product', type: 'text', label: 'Product' },
        { name: 'type', type: 'text', label: 'Type' },
        { name: 'minimum', type: 'text', label: 'Minimum' },
        { name: 'return', type: 'text', label: 'Return' },
        { name: 'term', type: 'text', label: 'Term' },
        { name: 'statuts', type: 'text', label: 'Status' },
      ],
    },
    {
      type: 'group',
      name: 'cta',
      label: 'Call to Action (Tarjeta Inferior)',
      fields: [
        { name: 'label', type: 'text', label: 'Etiqueta', defaultValue: 'Ready to invest?' },
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
                        { text: 'Find the certificate that fits your ', type: 'text', version: 1 },
                        { text: 'goals.', type: 'text', format: 2, version: 1 },
                      ],
                      type: 'heading', tag: 'h3', version: 1,
                    },
                  ],
                },
              },
            },
          ]
        },
        { name: 'primaryButton', type: 'text', label: 'Botón Primario', defaultValue: 'REQUEST MEMBERSHIP' },
        { name: 'secondaryButton', type: 'text', label: 'Botón Secundario', defaultValue: 'DOWNLOAD CATALOG' },
      ]
    }
  ],
};

export default ComparisonBlock;
