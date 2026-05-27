import type { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  fields: [
    {
      name: 'sectionTag',
      type: 'text',
      label: 'Section Tag',
      defaultValue: 'Section 04 ⌵',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'FAQ',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Answers to the questions we receive most often regarding transparency. From prospective members, current members, and the general public. We answer them directly, without deflection.',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Side Image',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Preguntas y respuestas',
      minRows: 1,
      defaultValue: [
        {
          question: 'Is Blue Castle Ventures a scam?',
          answer: 'No. Blue Castle Ventures is a legally registered fintech company with over six years of continuous operation across Canada and the United States. We maintain verifiable corporate registrations in Manitoba and Wyoming, annual CPA audits under AICPA standards, and regulatory standing with the U.S. Securities and Exchange Commission.\n\nLike any financial company, we have faced a small number of contractual disputes — none of which have resulted in criminal findings, fraud determinations, or regulatory sanctions. We publish this transparency page precisely because we believe verified facts should inform your judgment — not unverified online commentary.',
        },
        {
          question: 'Is my capital safe? How is it held?',
          answer: 'Member capital is held under institutional custodial arrangements through Interactive Brokers (IBKR), one of the world\'s largest and most regulated electronic brokerage firms. Capital is segregated from our operational funds. It is not used to fund company operations — it is deployed exclusively in the futures trading strategies that underpin your certificate. This structure is verified as part of our annual CPA audit.',
        },
        {
          question: 'What does "SEC-qualified" actually mean?',
          answer: 'In 2024, Blue Castle Ventures obtained a qualification from the U.S. Securities and Exchange Commission to operate a specific regulated financial vehicle in the American market. This qualification is documented in our SEC EDGAR filing (CIK: 0002028954). The precise filing reference will be published on this page once cleared for public disclosure.\n\n"SEC-qualified" does not mean the SEC endorses or guarantees our products — no regulatory body does that for any private company. It means we have satisfied the applicable regulatory requirements to offer our specific financial vehicle to eligible US-based members.',
        },
        {
          question: 'How do I resolve a concern or dispute as a member?',
          answer: 'Contact our compliance team directly at priority@bluecastleventures.ca. We respond to all compliance inquiries within 5 business days. Direct communication with our team is always the fastest and most effective path to resolution. If you have already initiated a formal legal process, please ensure your legal representative contacts us through the appropriate channels.',
        },
        {
          question: 'Has Blue Castle Ventures received any lawsuits or judgments for breach of contract?',
          answer: 'Blue Castle Ventures may have been referenced in claims, contractual complaints, or proceedings initiated by third parties — as is common among companies that manage commercial relationships with clients. It is important, however, to distinguish between a complaint, a grievance, a formal claim, and a final judicial ruling.\n\nTo date, Blue Castle Ventures has not received a definitive judicial ruling against it declaring breach of contract, fraud, or civil liability on the part of the company. In cases where formal claims have been presented, the company has exercised its right to defense, provided documentary evidence, and — where matters have advanced to review or evidence stages — has been able to demonstrate its contractual position.\n\nSome claims have not advanced due to lack of evidentiary support, failure to follow established contractual procedures, or because documentation demonstrates that the claimant\'s interpretation does not correspond to the accepted terms.\n\nBlue Castle Ventures maintains a policy of transparency, contractual documentation, and orderly resolution of any differences with its clients. The existence of a complaint or claim does not constitute a conviction or a determination of non-compliance by the company.',
        },
        {
          question: 'Has Blue Castle Ventures been found guilty of fraud?',
          answer: 'No. There are no criminal convictions, fraud determinations, or regulatory sanctions against Blue Castle Ventures, its affiliated entities, or any of its directors in any jurisdiction — Canada, the United States, or elsewhere. This is publicly verifiable through the records of the relevant regulatory authorities referenced in Section 02 of this page',
        },
      ],
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Pregunta',
          required: true,
          localized: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Respuesta',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action Section',
      fields: [
        {
          name: 'enable',
          type: 'checkbox',
          label: 'Enable CTA',
          defaultValue: true,
        },
        {
          name: 'smallTitle',
          type: 'text',
          label: 'Small Title',
          defaultValue: 'Ready to learn more?',
        },
        {
          name: 'titlePart1',
          type: 'text',
          label: 'Title Part 1',
          defaultValue: 'Verified facts.',
        },
        {
          name: 'titlePart2',
          type: 'text',
          label: 'Title Part 2',
          defaultValue: 'Your decision.',
        },
        {
          name: 'button1Label',
          type: 'text',
          label: 'Button 1 Label',
          defaultValue: 'REQUEST MEMBERSHIP',
        },
        {
          name: 'button1Url',
          type: 'text',
          label: 'Button 1 URL',
        },
        {
          name: 'button2Label',
          type: 'text',
          label: 'Button 2 Label',
          defaultValue: 'DOWNLOAD CATALOG',
        },
        {
          name: 'button2Url',
          type: 'text',
          label: 'Button 2 URL',
        },
      ],
    },
  ],
}
