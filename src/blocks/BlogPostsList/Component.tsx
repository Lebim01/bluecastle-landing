'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Ajusta estos tipos a tu schema real
export type Media = {
  id: string
  url?: string
  alt?: string
  width?: number
  height?: number
  sizes?: Record<string, { url: string; width: number; height: number }>
}

export type Category = { id: string; title: string; slug?: string }
export type Author = { id: string; name: string }
export type Post = {
  id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  coverImage?: Media | string | null
  categories?: Category[]
  author?: Author | string | null
}

export type BlogPostsListBlockProps = {

  heading?: string
  variant?: 'cards' | 'list'
  limit?: number
  columns?: number
  filters?: {
    search?: string
    categories?: (string | Category)[]
    excludeIDs?: (string | Post)[]
    sort?: '-publishedAt' | 'publishedAt' | 'title' | '-title'
  }
  show?: {
    showImage?: boolean
    showCategories?: boolean
    showDate?: boolean
    showAuthor?: boolean
    showExcerpt?: boolean
    showPaginationLink?: boolean
  }
  advanced?: {
    manualItems?: (string | Post)[]
    cardAspect?: '16/9' | '4/3' | '1/1'
  }

}

function formatDate(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: '2-digit' })
}

function aspectToClass(aspect?: '16/9' | '4/3' | '1/1') {
  switch (aspect) {
    case '4/3':
      return 'aspect-[4/3]'
    case '1/1':
      return 'aspect-square'
    default:
      return 'aspect-video'
  }
}

async function fetchPosts(cmsURL: string, block: BlogPostsListBlockProps): Promise<Post[]> {
  // Prioriza manualItems si existen
  const manual = block.advanced?.manualItems?.filter(Boolean) ?? []
  const manualResolved: Post[] = manual.filter((i): i is Post => typeof i === 'object')
  const manualIDs: string[] = manual
    .map((i) => (typeof i === 'string' ? i : i.id))
    .filter(Boolean) as string[]

  // Si ya tenemos posts manuales resolvidos y son >= limit, no hagas fetch adicional
  const limit = block.limit ?? 6
  if (manualResolved.length >= limit) return manualResolved.slice(0, limit)

  const where: Record<string, string> = {
    'where[status][equals]': 'published',
  }

  const q = block?.filters?.search?.trim()
  if (q) {
    where['where[or][0][title][like]'] = q
    where['where[or][1][excerpt][like]'] = q
  }

  const cats = block?.filters?.categories ?? []
  if (cats.length > 0) {
    // admite slug o id
    cats.forEach((c, idx) => {
      const val = typeof c === 'string' ? c : c.slug ?? c.id
      where[`where[categories.slug][in][${idx}]`] = String(val)
    })
  }

  const excludes = block?.filters?.excludeIDs ?? []
  if (excludes.length > 0) {
    excludes.forEach((p, idx) => {
      const val = typeof p === 'string' ? p : p.id
      where[`where[id][not_in][${idx}]`] = String(val)
    })
  }

  if (manualIDs.length > 0) {
    manualIDs.forEach((id, idx) => {
      where[`where[id][not_in_manual][${idx}]`] = id // evita duplicados con manualItems
    })
  }

  const params = new URLSearchParams({
    depth: '2',
    draft: 'false',
    limit: String(limit - manualResolved.length),
    sort: block?.filters?.sort ?? '-publishedAt',
    ...where,
  })

  const url = `${cmsURL}/api/posts?${params.toString()}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return manualResolved
  const data = await res.json()
  const docs: Post[] = data?.docs ?? []
  return [...manualResolved, ...docs]
}

export default function BlogPostsListBlock(block: BlogPostsListBlockProps) {
  const baseURL = process.env.NEXT_PUBLIC_SERVER_URL
  const [posts, setPosts] = React.useState<Post[] | null>(null)
  const [loading, setLoading] = React.useState(true)


  React.useEffect(() => {
    let mounted = true
    fetchPosts(baseURL, block).then((docs) => {
      if (mounted) {
        setPosts(docs)
        setLoading(false)
      }
    })
    return () => {
      mounted = false
    }
  }, [baseURL, JSON.stringify(block)])

  const cols = Math.min(Math.max(block.columns ?? 3, 1), 4)

  return (
    <section className="w-full">
      {block.heading && <h2 className="mb-4 text-2xl font-bold">{block.heading}</h2>}

      {loading && (
        <div className="rounded-xl border border-white/10 bg-neutral-900/40 p-6 text-sm text-neutral-400">Cargando posts…</div>
      )}

      {!loading && posts && posts.length === 0 && (
        <div className="rounded-xl border border-white/10 bg-neutral-900/40 p-6 text-sm text-neutral-400">No hay artículos para mostrar.</div>
      )}

      {!loading && posts && posts.length > 0 && (
        block.variant === 'list' ? (
          <ul className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
            {posts.map((p) => (
              <li key={p.id} className="flex items-start gap-4 p-4">
                {block.show?.showImage && p.coverImage && (
                  <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-neutral-800">
                    <Image
                      src={typeof p.coverImage === 'string' ? p.coverImage : p.coverImage?.sizes?.card?.url || p.coverImage?.url || ''}
                      alt={typeof p.coverImage === 'object' ? (p.coverImage.alt || p.title) : p.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <Link href={`/blog/${p.slug}`} className="text-base font-semibold hover:underline">{p.title}</Link>
                  {block.show?.showExcerpt && p.excerpt && (
                    <p className="mt-1 line-clamp-2 text-sm text-neutral-400">{p.excerpt}</p>
                  )}
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                    {block.show?.showDate && <span>{formatDate(p.publishedAt)}</span>}
                    {block.show?.showAuthor && typeof p.author === 'object' && p.author?.name && (
                      <span>• Por {p.author.name}</span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${cols}`}>
            {posts.map((p) => (
              <article key={p.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/40 transition hover:border-white/20">
                <Link href={`/blog/${p.slug}`} className="block">
                  {block.show?.showImage && (
                    <div className={`relative w-full ${aspectToClass(block.advanced?.cardAspect)} overflow-hidden bg-neutral-800`}>
                      <Image
                        src={typeof p.coverImage === 'string' ? p.coverImage : p.coverImage?.sizes?.card?.url || p.coverImage?.url || ''}
                        alt={typeof p.coverImage === 'object' ? (p.coverImage?.alt || p.title) : p.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-3 p-4">
                    {block.show?.showCategories && (p.categories ?? []).length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {(p.categories ?? []).slice(0, 3).map((c) => (
                          <span key={c.id} className="rounded-full border border-white/20 px-2 py-0.5 text-xs text-neutral-300">{c.title}</span>
                        ))}
                      </div>
                    )}
                    <h3 className="line-clamp-2 text-lg font-semibold">{p.title}</h3>
                    {block.show?.showExcerpt && p.excerpt && (
                      <p className="line-clamp-3 text-sm text-neutral-400">{p.excerpt}</p>
                    )}
                    <div className="mt-1 flex items-center gap-3 text-xs text-neutral-500">
                      {block.show?.showDate && <span>{formatDate(p.publishedAt)}</span>}
                      {block.show?.showAuthor && typeof p.author === 'object' && p.author?.name && (
                        <span>• Por {p.author.name}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )
      )}

      {block.show?.showPaginationLink && (
        <div className="mt-6 text-center">
          <Link href="/blog" className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90">Ver todos</Link>
        </div>
      )}
    </section>
  )
}