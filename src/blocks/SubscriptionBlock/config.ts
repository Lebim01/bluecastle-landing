import type { Block, Field } from 'payload'
import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'


const RT = () =>
    lexicalEditor({
        features: ({ rootFeatures }) => [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4', 'h5'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
        ],
    })

const validateUrl = (val: unknown) =>
    !val
        ? true
        : typeof val === 'string' && /^https?:\/\//i.test(val)
            ? true
            : 'Debe iniciar con http:// o https://'

const THEME_OPTIONS = [
    { label: 'Indigo → Violet', value: 'indigo' },
    { label: 'Emerald → Teal', value: 'emerald' },
    { label: 'Sky → Indigo', value: 'sky' },
    { label: 'Amber → Orange', value: 'amber' },
    { label: 'Rose → Pink', value: 'rose' },
    { label: 'Slate (oscuro)', value: 'slate' },
] as const


const planFields: Field[] = [
    {
        name: 'title',
        type: 'text',
        label: 'Título del plan',
        required: true,
    },
    {
        name: 'tagline',
        type: 'text',
        label: 'Resumen corto (tagline)',
    },
    {
        name: 'badge',
        type: 'text',
        label: 'Badge (opcional, ej: “Popular”)',
    },
    {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Imagen (opcional)',
    },
    {
        name: 'features',
        type: 'array',
        label: 'Características (máx. 5)',
        maxRows: 5,
        labels: { singular: 'Característica', plural: 'Características' },
        fields: [
            { name: 'field', type: 'text', label: 'Campo (ej. INVERSIÓN)', required: true },
            { name: 'value', type: 'text', label: 'Valor (ej. “USD $1,000 a $100,000”)', required: true },
        ],
    },
    {
        type: 'row',
        fields: [
            {
                name: 'ctaLabel',
                type: 'text',
                label: 'Texto del botón (CTA)',
                admin: { width: '50%' },
            },
            {
                name: 'ctaUrl',
                type: 'text',
                label: 'URL del CTA',
                validate: validateUrl,
                admin: { width: '50%' },
            },
        ],
    },
    {
        name: 'accentTheme',
        type: 'select',
        label: 'Tema (opcional, para sobreescribir el del grupo)',
        options: THEME_OPTIONS as any,
        admin: { description: 'Si no eliges, usará el tema del grupo.' },
    },
]

export const SubscriptionsBlock: Block = {
    slug: 'subscriptions',
    labels: { singular: 'Suscripciones', plural: 'Suscripciones' },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'heading',
                    type: 'text',
                    label: 'Título principal (opcional)',
                    admin: { width: '50%' },
                },
                {
                    name: 'subheading',
                    type: 'text',
                    label: 'Subtítulo (opcional)',
                    admin: { width: '50%' },
                },
            ],
        },

        {
            name: 'groups',
            type: 'array',
            label: 'Grupos (p. ej. Ingreso mensual, Capitalización, Retiro)',
            minRows: 1,
            labels: { singular: 'Grupo', plural: 'Grupos' },
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            label: 'Título del grupo',
                            required: true,
                            admin: { width: '50%' },
                        },
                        {
                            name: 'theme',
                            type: 'select',
                            label: 'Tema del grupo (degradado)',
                            options: THEME_OPTIONS as any,
                            defaultValue: 'indigo',
                            admin: { width: '50%' },
                        },
                    ],
                },
                {
                    name: 'description',
                    type: 'text',
                    label: 'Descripción corta (una línea)',
                },
                {
                    name: 'columns',
                    type: 'select',
                    label: 'Columnas en desktop',
                    defaultValue: '3',
                    options: [
                        { label: '2 columnas', value: '2' },
                        { label: '3 columnas', value: '3' },
                        { label: '4 columnas', value: '4' },
                    ],
                    admin: { description: 'En mobile es 1 columna; aquí defines md+.' },
                },
                {
                    name: 'plans',
                    type: 'array',
                    label: 'Planes del grupo',
                    minRows: 1,
                    labels: { singular: 'Plan', plural: 'Planes' },
                    fields: planFields,
                },
            ],
        },
    ],
}
