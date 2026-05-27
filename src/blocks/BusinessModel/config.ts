import type { Block } from 'payload'

export const BusinessModel: Block = {
  slug: 'businessModel',
  labels: {
    singular: 'Business Model',
    plural: 'Business Models',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'How our model works.',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
      defaultValue: 'We believe members deserve to understand exactly how their capital is deployed and how returns are generated. This section explains our business model with the same precision we apply to our trading operations.',
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
      label: 'Model Steps / Items',
      minRows: 1,
      defaultValue: [
        {
          number: '01',
          title: 'Private Membership. Not a Public Fund',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Blue Castle Ventures is not a public fund, a brokerage, or a bank. We operate as a private membership platform, meaning access is granted through a formal membership agreement, and investment certificates are structured around specific financial strategies managed internally by our trading team. There are no external fund managers or intermediaries involved in our trading decisions.',
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
          badges: [
            { text: 'Private Access' },
            { text: 'Contract - Backed' },
            { text: 'No intermediaries' },
          ],
        },
        {
          number: '02',
          title: 'How Contract-Defined Returns Work',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Depending on the certificate, returns are generated through one of three strategies: futures trading positions with defined parameters (FIC), active equity market management, or deployment into BCV\'s business verticals. In futures-based certificates (limited edition), entry and exit parameters are set at contract signing — making the return contractually defined at inception, not a projection. In market-based and vertical-based certificates, returns have a defined ceiling based on strategy performance within the term. Each product page details the specific mechanism for that certificate.',
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
          badges: [
            { text: 'Futures' },
            { text: 'Active Market' },
            { text: 'Verticals' },
          ],
        },
        {
          number: '03',
          title: 'Capital Control & Custody',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Member capital is held under third-party institutional custody through Interactive Brokers, not commingled with operational funds. Trading decisions are made exclusively by our internal team led by David Rojas, with 17+ years of market experience. We do not use external managers, algorithmic black boxes, or speculative instruments outside our defined strategy parameters.',
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
          badges: [
            { text: 'Institutional custody' },
            { text: 'Segregated capital' },
            { text: 'Internal team only' },
          ],
        },
      ],
      fields: [
        {
          name: 'number',
          type: 'text',
          label: 'Step Number',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Step Title',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Description',
          required: true,
        },
        {
          name: 'badges',
          type: 'array',
          label: 'Badges',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

export default BusinessModel
