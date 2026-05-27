import type { Block } from 'payload'

export const RegulatoryStanding: Block = {
  slug: 'regulatoryStanding',
  labels: {
    singular: 'Regulatory Standing',
    plural: 'Regulatory Standings',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Regulatory standing.',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
      defaultValue: 'We are committed to operating within applicable regulatory frameworks in every jurisdiction where we do business. The following is a summary of our current regulatory and compliance standing, with verifiable references for each item.',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Side Image',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Regulatory Items',
      minRows: 1,
      defaultValue: [
        {
          title: 'SEC Qualification',
          badge: 'ACTIVE',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Blue Castle Ventures obtained qualification from the SEC to launch a regulated financial vehicle in the American market. This qualification provides additional safeguards for member deposits.',
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
          linkText: 'EDGAR CIK: 0002028954',
          linkUrl: 'https://www.sec.gov/edgar/browse/?CIK=0002028954',
        },
        {
          title: 'Manitoba Corporate Registry',
          badge: 'REGISTERED',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Registry\nCanadian Companies Office · Since 2019',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Blue Castle Ventures Ltd. is registered and in good standing under Canadian corporate law since 2019, continuously operating in Manitoba and serving members across Canada.',
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
          linkText: 'U.S.-licensed CPA firm · AICPA Standards',
        },
        {
          title: 'Annual CPA Audit',
          badge: 'AUDITED',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Our financial outcomes are independently audited annually by a U.S.-licensed CPA firm under American Institute of Certified Public Accountants (AICPA) standards. Audit reports are available to members upon request.',
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
          linkText: 'U.S.-licensed CPA firm · AICPA Standards',
        },
        {
          title: 'Interactive Brokers (IBKR)',
          badge: 'CUSTODIAN',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Our financial outcomes are independently audited annually by a U.S.-licensed CPA firm under American Institute of Certified Public Accountants (AICPA) standards. Audit reports are available to members upon request.',
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
          linkText: 'U.S.-licensed CPA firm · AICPA Standards',
        },
        {
          title: 'BMO Harris Bank',
          badge: 'PARTNER',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Banking services across North America are maintained through BMO Harris Bank, a subsidiary of Bank of Montreal, one of Canada\'s largest financial institutions.',
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
          linkText: 'Banking partner · North America',
        },
        {
          title: 'Fintech Sandbox',
          badge: 'HISTORICAL',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'In 2020, Blue Castle Ventures was recognized under a regulatory sandbox program, enabling development of innovative financial products under direct regulatory supervision before full market launch.',
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
          linkText: 'Banking partner · North America',
        },
      ],
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Item Title',
          required: true,
        },
        {
          name: 'badge',
          type: 'text',
          label: 'Status Badge Content',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Description / Content',
          required: true,
        },
        {
          name: 'linkText',
          type: 'text',
          label: 'Link Text',
        },
        {
          name: 'linkUrl',
          type: 'text',
          label: 'Link URL',
        },
      ],
    },
  ],
}

export default RegulatoryStanding
