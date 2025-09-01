import { LinkField } from '@/payload-types'

export const resolveHref = (link: LinkField): string => {
  if (link.type === 'external') {
    const base = link.url ?? '#'
    return link.utm ? `${base}${base.includes('?') ? '&' : '?'}${link.utm}` : base
  }
  // Interno: ajusta según tu router (slug, path, etc.)
  const v = link.doc?.value as any
  const slug = typeof v === 'string' ? v : v?.slug
  const base = slug ? `/${slug}` : '#'
  return link.utm ? `${base}?${link.utm}` : base
}
