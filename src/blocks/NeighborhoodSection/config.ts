import type { Block } from "payload";
import { RichText } from "../RichText/config";

export const NeighborhoodSection: Block = {
  slug: "neighborhoodSection",
  labels: { singular: "Neighborhood Section", plural: "Neighborhood Sections" },
  fields: [
    {
      type: 'group',
      name: 'content',
      label: 'Contenido Izquierdo',
      fields: [
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
                          text: 'Names that are ',
                          type: 'text',
                          version: 1,
                        },
                        {
                          text: 'no coincidence.',
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
                          text: "SoHo, Tribeca, and Hamptons are three of New York's most iconic neighborhoods. Each with its own identity, pace, and profile. Our products reflect exactly that.",
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
        }
      ]
    },
    {
      name: 'items',
      type: 'array',
      label: 'Elementos de la derecha',
      minRows: 3,
      maxRows: 3,
      defaultValue: [
        { neighborhood: 'Soho', productName: 'Monthly Growth' },
        { neighborhood: 'Tribeca', productName: 'Capitalization' },
        { neighborhood: 'Hamptons', productName: 'Legacy' },
      ],
      fields: [
        {
          name: 'neighborhood',
          type: 'text',
          label: 'Barrio',
        },
        {
          name: 'productName',
          type: 'text',
          label: 'Nombre del Producto',
        }
      ]
    }
  ],
};

export default NeighborhoodSection;
