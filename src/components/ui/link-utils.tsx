// src/lib/link-utils.ts
export type CMSLink = {
    linkType?: 'custom' | 'internal' | 'external'
    type?: 'custom' | 'internal' | 'external' // algunas configs usan "type"
    url?: string
    reference?: {
        relationTo?: string
        value?: any // { slug?: string; url?: string; path?: string; id?: string } | string
    }
    anchor?: string
    hash?: string
    newTab?: boolean
}

const isAbsolute = (u?: string) => !!u && /^https?:\/\//i.test(u)

export function getHrefFromLink(link?: CMSLink): string {
    if (!link) return '#'
    const anchor = link.anchor ?? link.hash
    const append = (u: string) => (anchor ? `${u}#${anchor.replace(/^#/, '')}` : u)

    const kind = link.linkType ?? link.type

    // Custom / External
    if (kind === 'custom' || kind === 'external') {
        const raw = link.url?.trim()
        if (!raw) return '#'
        return append(raw)
    }

    // Internal / Reference
    const ref = link.reference
    if (ref) {
        const doc =
            typeof ref.value === 'object' && ref.value
                ? ref.value
                : undefined

        const candidate =
            doc?.url ?? doc?.path ?? doc?.slug ?? link.url

        if (candidate) {
            const clean = candidate.toString().trim()
            const href = isAbsolute(clean) ? clean : `/${clean.replace(/^\/+/, '')}`
            return append(href)
        }
    }

    // Fallback
    if (link.url) return append(link.url)
    return '#'
}

export function getLinkAttrsFromLink(link?: CMSLink): { href: string; target?: string; rel?: string } {
    const href = getHrefFromLink(link)
    const target = link?.newTab ? '_blank' : undefined
    const rel = link?.newTab ? 'noopener noreferrer' : undefined
    return { href, target, rel }
}
