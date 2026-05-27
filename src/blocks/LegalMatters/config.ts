import type { Block } from 'payload'

export const LegalMatters: Block = {
  slug: 'legalMatters',
  labels: {
    singular: 'Legal Matters',
    plural: 'Legal Matters',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Legal & Contractual matters.',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
      defaultValue: 'We believe in addressing legal matters openly. Silence is not our policy. The following is an honest and accurate summary of our current legal standing, presented without defensiveness and without minimization.',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Side Image',
      required: true,
    },
    {
      name: 'subSectionTitle',
      type: 'text',
      label: 'Sub-section Title',
      required: true,
      defaultValue: 'Terms & Conditions.',
    },
    {
      name: 'subSectionContent',
      type: 'richText',
      label: 'Sub-section Body Text',
      required: true,
      defaultValue: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'BCV membership is governed by a formal Terms and Conditions agreement that covers membership access, payment structure, platform use, data privacy, dispute resolution, and the nature of our certificates as private membership benefits — not securities or regulated financial instruments. The agreement is governed by the laws of the Province of Manitoba, Canada. All disputes are resolved through binding arbitration. We encourage all prospective and current members to read the full document before committing to any certificate. Membership implies full acceptance of these terms.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    {
      name: 'boxTitle',
      type: 'text',
      label: 'Highlighted Box Title',
      required: true,
      defaultValue: 'Terms & Conditions Covers',
    },
    {
      name: 'boxItems',
      type: 'array',
      label: 'Highlighted Box Items',
      defaultValue: [
        { text: 'Membership access & platform use' },
        { text: 'Payment terms & membership activation' },
        { text: 'Nature of certificates — private membership benefits, not securities' },
        { text: 'Data privacy & account security' },
        { text: 'Dispute resolution — binding arbitration, Manitoba law' },
        { text: 'Intellectual property & platform modifications' },
        { text: 'Limitation of liability' },
      ],
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
      defaultValue: 'See our Terms & Conditions page',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'CTA Button URL',
      defaultValue: '/terms',
    },
  ],
}

export default LegalMatters
