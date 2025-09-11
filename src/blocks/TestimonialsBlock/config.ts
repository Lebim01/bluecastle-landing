import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
    slug: 'testimonials',
    labels: {
        singular: 'Testimonials',
        plural: 'Testimonials',
    },
    imageAltText: 'Testimonials block',
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Título',
            required: false,
            admin: { placeholder: 'Lo que dicen nuestros alumnos' },
            localized: true,
        },
        {
            name: 'displayStyle',
            type: 'select',
            label: 'Estilo de visualización',
            required: true,
            defaultValue: 'grid',
            options: [
                { label: 'Grid', value: 'grid' },
                { label: 'Circles', value: 'circle' },
                { label: 'Carousel (Embla)', value: 'carousel' },
            ],
        },
        {
            name: 'columns',
            type: 'number',
            label: 'Columnas en Grid/Circles (lg)',
            defaultValue: 3,
            admin: {
                description: 'Número de columnas en pantallas grandes para grid/circles.',
                condition: (data) =>
                    data?.displayStyle === 'grid' || data?.displayStyle === 'circle',
            },
        },
        {
            name: 'showDots',
            type: 'checkbox',
            label: 'Mostrar dots (solo Carousel)',
            defaultValue: true,
            admin: {
                condition: (data) => data?.displayStyle === 'carousel',
            },
        },
        {
            name: 'showArrows',
            type: 'checkbox',
            label: 'Mostrar flechas (solo Carousel)',
            defaultValue: true,
            admin: {
                condition: (data) => data?.displayStyle === 'carousel',
            },
        },
        {
            name: 'items',
            type: 'array',
            label: 'Testimonios',
            minRows: 1,
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    label: 'Nombre',
                    required: true,
                    localized: true,
                },
                {
                    name: 'country',
                    type: 'text',
                    label: 'País',
                    required: false,
                    localized: true,
                },
                {
                    name: 'videoUrl',
                    type: 'text',
                    label: 'URL de Video (Vimeo/YouTube embed)',
                    required: false,
                },
                {
                    name: 'quote',
                    type: 'textarea',
                    label: 'Testimonio (texto)',
                    required: false,
                    localized: true,
                },
                {
                    name: 'avatarUrl',
                    type: 'text',
                    label: 'Avatar (URL de imagen)',
                    required: false,
                },
            ],
        },
    ],
}
