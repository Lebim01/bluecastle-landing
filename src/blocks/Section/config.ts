// src/blocks/Section/config.ts
import type { Block } from 'payload';
import { sectionStyleFields } from '@/fields/sectionStyle';

// Importa tus bloques para permitirlos como “hijos”
import { CallToAction } from '@/blocks/CallToAction/config';
import { Content } from '@/blocks/Content/config';
import { MediaBlock } from '@/blocks/MediaBlock/config';
import { Archive } from '@/blocks/ArchiveBlock/config';

export const Section: Block = {
  slug: 'section',
  interfaceName: 'SectionBlock',
  labels: { singular: 'Section', plural: 'Sections' },
  fields: [
    ...sectionStyleFields,
    {
      name: 'content',
      label: 'Content',
      type: 'blocks',
      required: true,
      admin: { initCollapsed: true },
      blocks: [
        // aquí van los bloques “hijos” permitidos dentro de la sección
        CallToAction,
        Content,
        MediaBlock,
        Archive,
      ],
    },
  ],
};
