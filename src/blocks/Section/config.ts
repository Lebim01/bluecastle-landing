import type { Block } from 'payload'
import { sectionStyleFields } from '@/fields/sectionStyle'
import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { BlogPostsList } from '../BlogPostsList/config'
import { Row } from '../Row/config'

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
      blocks: [CallToAction, Content, MediaBlock, BlogPostsList, Row],
    },
  ],
}
