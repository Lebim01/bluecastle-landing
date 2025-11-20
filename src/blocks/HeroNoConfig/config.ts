import type { Block } from "payload";
import { RichText } from "../RichText/config";
import { CTABlock } from "../CTAButton/config";


export const HeroBlockNoC: Block = {
  slug: "heroBlockNoConfig",
  labels: { singular: "Hero NoC", plural: "Hero NoC" },
  fields: [
    {
      type: 'upload',
      relationTo: 'media',
      name: 'bg',
      label: 'Imagen de fondo',
    },
    {
      type: 'select',
      name: 'height-aspect',
      label: 'Tamaño de la pantalla',
      options: [
        {
          label: 'Completa',
          value: 'full'
        },
        {
          label: 'Porcentaje',
          value: 'percent'
        }
      ]
    },
    {
      type: 'number',
      name: 'height',
      label: 'Porcentaje',
      admin: {
        condition: (data, sibling) => {
          return sibling['height-aspect'] == 'percent'
        },
        placeholder: '(0-100)',
      },
      min: 0,
      max: 100
    },
    {
      type: 'group',
      label: 'Lado izquierdo',
      name: 'left-side',
      fields: [
        {
          type: 'select',
          name: 'align',
          options: [
            {
              label: 'Arriba',
              value: 'top'
            },
            {
              label: 'Abajo',
              value: 'bottom'
            }
          ]
        },
        {
          type: 'blocks',
          name: 'content',
          label: 'Bloques de texto',
          blocks: [RichText],
        }
      ]
    },
    {
      type: 'group',
      label: 'Lado derecho',
      name: 'right-side',
      fields: [
        {
          type: 'select',
          name: 'align',
          options: [
            {
              label: 'Arriba',
              value: 'top'
            },
            {
              label: 'Abajo',
              value: 'bottom'
            }
          ]
        },
        {
          type: 'blocks',
          name: 'content',
          label: 'Bloques de texto',
          blocks: [RichText, CTABlock],
        }
      ]
    }
  ],
};

export default HeroBlockNoC;
