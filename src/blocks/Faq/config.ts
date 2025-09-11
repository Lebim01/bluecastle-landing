import type { Block } from 'payload'

export const FAQBlock: Block = {
    slug: 'faq',
    labels: {
        singular: 'FAQ',
        plural: 'FAQs',
    },
    imageAltText: 'FAQ block',
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Título',
            required: false,
            admin: { placeholder: 'FAQ' },
            localized: true,
        },
        {
            name: 'items',
            type: 'array',
            label: 'Preguntas y respuestas',
            minRows: 1,
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
    ],
}
