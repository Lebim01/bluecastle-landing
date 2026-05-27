import type { Block } from 'payload'

export const CorporateStructure: Block = {
  slug: 'corporateStructure',
  labels: {
    singular: 'Corporate Structure',
    plural: 'Corporate Structures',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Corporate Structure.',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
      defaultValue: 'Blue Castle Ventures operates through legally registered entities in Canada and the United States. Both are verifiable through their respective public corporate registries.',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Side Image',
      required: true,
    },
    {
      name: 'entities',
      type: 'array',
      label: 'Entities / Cards',
      minRows: 1,
      maxRows: 4,
      defaultValue: [
        {
          tag: 'CANADA — PARENT ENTITY',
          name: 'Blue Castle Ventures Ltd.',
          details: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '330 St. Mary Avenue, Suite 300\nWinnipeg, Manitoba R3C 3Z5, Canada',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '+1 (204) 809-5650 · info@bluecastleventures.ca',
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
          footer: 'Founded 2019 · Formerly Davero International',
        },
        {
          tag: 'UNITED STATES — OPERATING ENTITY',
          name: 'Blue Castle Ventures LLC',
          details: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: '165 Broadway, One Liberty Plaza, 23rd Floor\nNew York, NY 10006',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Legal entity: 1309 Coffeen Ave STE 1200\nSheridan, Wyoming 82801',
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
          footerLink: 'SEC EDGAR CIK: 0002028954',
          footerUrl: 'https://www.sec.gov/edgar/browse/?CIK=0002028954',
        },
        {
          tag: 'UNITED STATES — FINANCIAL OPERATIONS',
          name: 'Blue Castle Ventures US, Inc.',
          details: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Formed to serve the American market under US federal and state regulatory compliance framework.',
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
          footer: 'Formed 2023',
        },
        {
          tag: 'BIOTECHNOLOGY DIVISION',
          name: 'Evocraft Labs™',
          details: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Research and development division focused on longevity science, regenerative medicine, and human performance optimization.',
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
          footer: 'Active since 2025 · America',
        },
      ],
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag / Header',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          label: 'Entity Name',
          required: true,
        },
        {
          name: 'details',
          type: 'richText',
          label: 'Details / Address',
          required: true,
        },
        {
          name: 'footer',
          type: 'text',
          label: 'Footer Info',
        },
        {
          name: 'footerLink',
          type: 'text',
          label: 'Footer Link Text (Optional)',
        },
        {
          name: 'footerUrl',
          type: 'text',
          label: 'Footer URL (Optional)',
        },
      ],
    },
  ],
}

export default CorporateStructure
