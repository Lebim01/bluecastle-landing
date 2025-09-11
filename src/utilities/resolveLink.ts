import { LinkField } from '@/payload-types'

export const resolveHref = (link: LinkField): string => {
  console.log(link)
  if (link.type === 'external') {
    const base = link.url ?? '#'
    return link.utm ? `${base}${base.includes('?') ? '&' : '?'}${link.utm}` : base
  }

  if (link.doc?.relationTo == 'posts') {
    const v = link.doc?.value as any
    const slug = typeof v === 'string' ? v : v?.slug
    const base = slug ? `/posts/${slug}` : '#'
    return link.utm ? `${base}?${link.utm}` : base
  }

  const v = link.doc?.value as any
  const slug = typeof v === 'string' ? v : v?.slug
  const base = `/${slug}`
  return link.utm ? `${base}?${link.utm}` : base
}
