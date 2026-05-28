import type { Block } from "payload";
import { RichText } from "../RichText/config";

export const TransparentHero: Block = {
  slug: "transparentHero",
  labels: { singular: "Transparent Hero", plural: "Transparent Heros" },
  fields: [
    {
      type: 'upload',
      relationTo: 'media',
      name: 'bg',
      label: 'Imagen de fondo',
    },
    {
      type: 'group',
      label: 'Cabecera (Derecha)',
      name: 'heading',
      defaultValue: {
        content: [
          {
            blockType: 'richText',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    children: [
                      {
                        text: 'Built on trust. Proven by results',
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
          name: 'content',
          label: 'Contenido',
          blocks: [RichText],
        }
      ]
    },
    {
      type: 'group',
      label: 'Descripción (Izquierda)',
      name: 'description',
      defaultValue: {
        content: [
          {
            blockType: 'richText',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    children: [
                      {
                        text: 'We publish this page because transparency is an operating principle. Here you will find accurate, verifiable information about our corporate structure, regulatory standing, how our products work, and how we handle legal matters.',
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
          name: 'content',
          label: 'Contenido',
          blocks: [RichText],
        }
      ]
    }
  ],
};

export default TransparentHero;
