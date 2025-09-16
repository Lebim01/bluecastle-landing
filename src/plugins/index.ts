import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateImage, GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { gcsStorage } from '@payloadcms/storage-gcs'

import { Media, Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

type Locale = 'all' | 'es' | 'en' | 'pt' | undefined
const normalizeLocale = (l: unknown): Locale =>
  l === 'es' || l === 'en' || l === 'pt' || l === 'all' ? l : undefined

const getUploadUrl = (f: number | Media | undefined) =>
  typeof f === 'object' && f ? f.url : undefined

const generateTitle: import('@payloadcms/plugin-seo/types').GenerateTitle<Post | Page> = async ({ doc, req, locale }) => {
  const site = await req.payload.findGlobal({
    slug: 'site-settings',
    locale: normalizeLocale(locale),
    depth: 1,
  })
  const base = site?.defaultTitle || 'Website'
  return doc?.title ? `${doc.title} | ${base}` : base
}

const generateURL: import('@payloadcms/plugin-seo/types').GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()
  return doc?.slug ? `${url}/${doc.slug}` : url
}

const generateImage: import('@payloadcms/plugin-seo/types').GenerateImage<Post | Page> = async ({ req, locale }) => {
  const url = getServerSideURL()
  const site = await req.payload.findGlobal({
    slug: 'site-settings',
    locale: normalizeLocale(locale),
    depth: 1,
  })
  const og = getUploadUrl(site?.defaultOgImage as number | Media | undefined)
  return og ? `${url}${og}` : `${url}/favicon.ico`
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  seoPlugin({
    generateTitle,
    generateURL,
    generateImage,
  }),
  searchPlugin({
    collections: ['posts', 'pages'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
  gcsStorage({
    enabled: true,
    collections: {
      media: true,
    },
    bucket: process.env.GCS_BUCKET!,
    options: {
      projectId: process.env.GCS_PROJECT_ID!,
      credentials: {
        client_email: process.env.GCS_CLIENT_EMAIL!,
        private_key: process.env.GCS_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      },
    },
    acl: 'Public',
  }),
]
