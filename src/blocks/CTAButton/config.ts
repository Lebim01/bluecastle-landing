import type { Block } from 'payload'
import { link } from '@/fields/link'

export const CTABlock: Block = {
    slug: 'ctaBlock',
    labels: { singular: 'Botón / CTA', plural: 'Botones / CTA' },
    interfaceName: 'CTABlock',
    fields: [
        { name: 'label', type: 'text', required: true, label: 'Texto del botón', localized: true },

        link({}),

        {
            name: 'variant',
            type: 'select',
            label: 'Estilo',
            defaultValue: 'primary',
            options: [

                { label: 'Primario', value: 'primary' },
                { label: 'Secundario', value: 'secondary' },
                { label: 'Enlace', value: 'link' },
                { label: 'Solid', value: 'solid' },
                { label: 'Bordered', value: 'bordered' },
                { label: 'Faded', value: 'faded' },
                { label: 'Light', value: 'light' },
                { label: 'Ghost', value: 'ghost' },
                { label: 'Shadow', value: 'shadow' },
            ],
        },

        {
            name: 'size',
            type: 'select',
            label: 'Tamaño',
            defaultValue: 'md',
            options: [
                { label: 'XS', value: 'xs' },
                { label: 'SM', value: 'sm' },
                { label: 'MD', value: 'md' },
                { label: 'LG', value: 'lg' },
                { label: 'XL', value: 'xl' },
            ],
        },
        {
            name: 'radius',
            type: 'select',
            label: 'Radio',
            defaultValue: '2xl',
            options: [
                { label: 'None', value: 'none' },
                { label: 'MD', value: 'md' },
                { label: 'LG', value: 'lg' },
                { label: 'XL', value: 'xl' },
                { label: '2XL', value: '2xl' },
                { label: 'Full', value: 'full' },
            ],
        },
        {
            name: 'fullWidth',
            type: 'checkbox',
            defaultValue: false,
            label: 'Ocupar todo el ancho',
        },

        {
            name: 'align',
            type: 'select',
            label: 'Alineación',
            defaultValue: 'start',
            options: [
                { label: 'Izquierda', value: 'start' },
                { label: 'Centro', value: 'center' },
                { label: 'Derecha', value: 'end' },
            ],
        },

        {
            name: 'isDisabled',
            type: 'checkbox',
            label: 'Deshabilitado',
            defaultValue: false,
        },
        {
            name: 'isLoading',
            type: 'checkbox',
            label: 'Mostrar estado "Cargando"',
            defaultValue: false,
            admin: { description: 'Útil si el CTA dispara acciones asincrónicas.' },
        },
    ],
}
