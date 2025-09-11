import type { Block } from 'payload';

export const TradingViewBlock: Block = {
    slug: 'tradingView',
    labels: { singular: 'TradingView', plural: 'TradingViews' },
    fields: [
        {
            name: 'embedHtml',
            type: 'textarea',
            label: 'Embed code (pega aquí el HTML de TradingView)',
            required: true,
            admin: {
                description:
                    'Pega el bloque completo que te da TradingView (incluye <script> y el contenedor).',
            },
        },
        {
            name: 'height',
            type: 'number',
            label: 'Altura (px)',
            defaultValue: 500,
        },
        {
            name: 'fullWidth',
            type: 'checkbox',
            label: 'Usar ancho completo',
            defaultValue: true,
        },
    ],
};
