import type { Block } from "payload";
import { RichText } from "../RichText/config";

export const ProductsHero: Block = {
  slug: "productsHero",
  labels: { singular: "Products Hero", plural: "Products Heros" },
  fields: [
    {
      type: 'upload',
      relationTo: 'media',
      name: 'bg',
      label: 'Imagen de fondo',
    },
    {
      type: 'group',
      label: 'Contenido (Abajo Izquierda)',
      name: 'content',
      defaultValue: {
        heading: [
          {
            blockType: 'richText',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    children: [
                      {
                        text: 'Three certificates.',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    type: 'paragraph',
                    version: 1,
                  },
                  {
                    children: [
                      {
                        text: 'One Collection.',
                        type: 'text',
                        format: 2, // Italic in Lexical (usually 2)
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
        description: [
          {
            blockType: 'richText',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    children: [
                      {
                        text: 'Each product is designed for a specific financial profile, horizon, and goal.\nEvery investment is contract-backed, independently audited,\nand structured to deliver clarity from day one.',
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
      fields: [
        {
          type: 'blocks',
          name: 'heading',
          label: 'Título',
          blocks: [RichText],
        },
        {
          type: 'blocks',
          name: 'description',
          label: 'Descripción',
          blocks: [RichText],
        }
      ]
    }
  ],
};

export default ProductsHero;
