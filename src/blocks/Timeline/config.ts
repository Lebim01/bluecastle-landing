import type { Block, RowLabelComponent } from 'payload'
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import React from 'react';

const RT = () =>
    lexicalEditor({
        features: ({ rootFeatures }) => [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4', 'h5'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
        ],
    })


export const TimelineBlock: Block = {
    slug: 'timeline',
    labels: { singular: 'Timeline', plural: 'Timelines' },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'heading',
                    type: 'text',
                    label: 'Título',
                    required: false,
                    admin: { width: '50%' },
                },
                {
                    name: 'subheading',
                    type: 'text',
                    label: 'Subtítulo',
                    admin: { width: '50%' },
                },
            ],
        },
        {
            name: 'items',
            type: 'array',
            label: 'Entradas',
            minRows: 1,
            labels: { singular: 'Entrada', plural: 'Entradas' },
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    label: 'Título del hito (ej. “2024”, “Early 2023”)',
                    required: true,
                },
                {
                    name: 'description',
                    type: 'richText',
                    label: 'Descripción',
                    editor: RT(),
                    required: false,
                },
                {
                    name: 'checklist',
                    type: 'array',
                    label: 'Checklist (opcional)',
                    labels: { singular: 'Ítem', plural: 'Ítems' },
                    fields: [{ name: 'text', type: 'text', label: 'Texto', required: true }],
                },
                {
                    name: 'gallery',
                    type: 'array',
                    label: 'Galería (opcional)',
                    labels: { singular: 'Imagen', plural: 'Imágenes' },
                    fields: [
                        {
                            name: 'image',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                            label: 'Imagen',
                        },
                        { name: 'alt', type: 'text', label: 'Alt', required: false },
                    ],
                },
            ],
            admin: {
                components: {
                    RowLabel: {
                        path: '@/blocks/Timeline/Component.client.tsx',
                        clientProps: { prefix: '', fallback: 'Entrada', showIndex: true },
                    },
                },
            },
        },
        // (Opcional) estilos de sección si los usas globalmente
        // ...sectionStyleFields
    ],
}
