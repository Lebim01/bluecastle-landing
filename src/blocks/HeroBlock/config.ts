import type { Block } from 'payload'

const validateUrl = (val: unknown) =>
    !val
        ? true
        : typeof val === 'string' && /^https?:\/\//i.test(val)
            ? true
            : 'Debe ser una URL válida que inicie con http:// o https://'

const validateHex = (val: unknown) =>
    typeof val === 'string' && /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(val)
        ? true
        : 'Usa un color HEX válido, por ejemplo #0553A2'

export const HeroBlock: Block = {
    slug: 'heroBlock',
    labels: { singular: 'Hero', plural: 'Heroes' },
    fields: [
        {
            name: 'variant',
            type: 'select',
            label: 'Diseño',
            defaultValue: 'waves',
            required: true,
            options: [
                { label: 'Waves', value: 'waves' },
                { label: 'Aurora (3D)', value: 'aurora' },
                { label: 'Carousel', value: 'carousel' },
            ],
            admin: { description: 'Elige el estilo visual del hero' },
        },


        { name: 'title', type: 'text', label: 'Título', localized: true, admin: { placeholder: 'Escribe un encabezado atractivo' }, maxLength: 140, },
        { name: 'subcopy', type: 'textarea', label: 'Descripción', localized: true, admin: { placeholder: 'Texto breve que complemente el título' }, maxLength: 320, },
        {
            name: 'cta',
            type: 'group',
            label: 'CTA',
            admin: { description: 'Botón principal de acción' },
            fields: [
                { name: 'label', type: 'text', label: 'Texto del botón', localized: true },
                { name: 'href', type: 'text', label: 'Enlace', validate: validateUrl, admin: { placeholder: 'https://tu-sitio.com' } },
            ],
        },
        { name: 'disclaimer', type: 'textarea', label: 'Aviso/Disclaimer', localized: true, admin: { description: 'Texto legal o aclaratorio opcional' }, maxLength: 500, },
        { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo', admin: { description: 'Imagen opcional para mostrar como marca' } },

        {
            name: 'waves',
            type: 'group',
            label: 'Ajustes: Waves',
            admin: {
                condition: (data, sibling) => (sibling?.variant ?? data?.variant) === 'waves',
                description: 'Configura el degradado y la altura del hero',
            },
            fields: [
                { name: 'gradientStart', type: 'text', label: 'Color inicial', defaultValue: '#0553A2', validate: validateHex, admin: { placeholder: '#0553A2' } },
                { name: 'gradientEnd', type: 'text', label: 'Color final', defaultValue: '#0b0f1a', validate: validateHex, admin: { placeholder: '#0B0F1A' } },
                { name: 'heightVH', type: 'number', label: 'Altura del hero (vh)', defaultValue: 70, min: 30, max: 100, admin: { description: 'Porcentaje de la altura de pantalla (30–100)', step: 5 } },
            ],
        },


        {
            name: 'aurora',
            type: 'group',
            label: 'Ajustes: Aurora',
            admin: {
                condition: (data, sibling) => (sibling?.variant ?? data?.variant) === 'aurora',
                description: 'Configura colores, cantidad y velocidad de estrellas',
            },
            fields: [
                {
                    name: 'colors',
                    type: 'array',
                    labels: { singular: 'Color', plural: 'Colores' },
                    minRows: 2,
                    defaultValue: [{ color: '#13FFAA' }, { color: '#1E67C6' }, { color: '#CE84CF' }, { color: '#DD335C' }],
                    fields: [{ name: 'color', type: 'text', label: 'Color HEX', validate: validateHex, admin: { placeholder: '#13FFAA' } }],
                },
                { name: 'starsCount', type: 'number', label: 'Cantidad de estrellas', defaultValue: 2500, min: 0, max: 10000, admin: { description: '0–10,000', step: 100 } },
                { name: 'starsSpeed', type: 'number', label: 'Velocidad de estrellas', defaultValue: 2, min: 0.1, max: 10, admin: { description: '0.1–10 (1 = normal)', step: 0.1 } },
            ],
        },
        {
            name: 'carousel',
            type: 'group',
            label: 'Ajustes: Carousel',
            admin: {
                condition: (data, sibling) => (sibling?.variant ?? data?.variant) === 'carousel',
                description: 'Hero tipo carrusel (Embla) con slides configurables',
            },
            fields: [
                { name: 'heightVH', type: 'number', label: 'Altura (vh)', defaultValue: 70, min: 40, max: 100, admin: { step: 5 } },
                { name: 'loop', type: 'checkbox', label: 'Loop infinito', defaultValue: true },
                { name: 'autoplayMs', type: 'number', label: 'Autoplay (ms)', defaultValue: 4500, min: 0, admin: { description: '0 = desactivado' } },
                {
                    name: 'slides',
                    type: 'array',
                    required: true,
                    labels: { singular: 'Slide', plural: 'Slides' },
                    fields: [
                        { name: 'image', type: 'upload', relationTo: 'media', label: 'Imagen', required: true },
                        { name: 'title', type: 'text', label: 'Título', localized: true },
                        { name: 'text', type: 'textarea', label: 'Texto', localized: true, maxLength: 320 },
                        {
                            name: 'cta',
                            type: 'group',
                            label: 'CTA del slide',
                            fields: [
                                { name: 'label', type: 'text', label: 'Texto', localized: true },
                                { name: 'href', type: 'text', label: 'Enlace', validate: validateUrl },
                            ],
                        },
                        { name: 'overlayFrom', type: 'text', label: 'Overlay desde (HEX)', defaultValue: '#00000099', validate: validateHex },
                        { name: 'overlayTo', type: 'text', label: 'Overlay hasta (HEX)', defaultValue: '#00000033', validate: validateHex },
                        { name: 'align', type: 'select', label: 'Alineación contenido', defaultValue: 'center', options: ['start', 'center', 'end'] },
                        { name: 'lightText', type: 'checkbox', label: 'Texto claro (blanco)', defaultValue: true },
                    ],
                },
            ],
        },
    ],
}

export default HeroBlock
