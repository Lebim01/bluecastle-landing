import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
    label: 'Site Settings',
    fields: [
        {
            name: 'defaultTitle',
            type: 'text',
            label: 'Default Title',
            localized: true,
            required: true,
        },
        {
            name: 'favicon',
            type: 'upload',
            relationTo: 'media',
            label: 'Favicon',
            required: true,
        },
        {
            name: 'defaultOgImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Default OG Image',
        },
    ],
}
