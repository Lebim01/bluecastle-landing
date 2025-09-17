// BlogPostsListBlock con paginación para PayloadCMS + Next.js (App Router)
// - Paginación en cliente (botones Anterior/Siguiente y números)
// - Respeta filtros de búsqueda/categorías/excluir IDs y manualItems (pinea manuales en página 1)
// - Tailwind seguro (sin clases dinámicas no registrables)

'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

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

type Paginated<T> = {
  docs: T[]
  page: number
  totalPages: number
  totalDocs: number
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

function looksLikeId(v: string) {
  return /^[0-9a-f-]{10,}$/i.test(v) || /^\d+$/.test(v)
}

function buildWhereFromFilters(
  block: BlogPostsListBlockProps,
  pageCatsKey: 'categories' | 'categories.slug',
) {
  const where: Record<string, string> = {
    'where[status][equals]': 'published',
  }
  const q = block?.filters?.search?.trim()
  if (q) {
    where['where[or][0][title][like]'] = q
    where['where[or][1][excerpt][like]'] = q
  }
  const cats = block?.filters?.categories ?? []
  cats.forEach((c, idx) => {
    const val = typeof c === 'string' ? c : (c.slug ?? c.id)
    if (!val) return
    if (pageCatsKey === 'categories') {
      where[`where[categories][in][${idx}]`] = String(val)
    } else {
      where[`where[categories.slug][in][${idx}]`] = String(val)
    }
  })
  const excludes = block?.filters?.excludeIDs ?? []
  excludes.forEach((p, idx) => {
    const val = typeof p === 'string' ? p : p.id
    if (val) where[`where[id][not_in][${idx}]`] = String(val)
  })
  return where
}

async function fetchPosts(
  cmsURL: string,
  block: BlogPostsListBlockProps,
  page = 1,
): Promise<Paginated<Post>> {
  const manual = block.advanced?.manualItems?.filter(Boolean) ?? []
  const manualResolved: Post[] = manual.filter((i): i is Post => typeof i === 'object')
  const manualIDs: string[] = manual
    .map((i) => (typeof i === 'string' ? i : i.id))
    .filter(Boolean) as string[]

  const limit = Math.max(block.limit ?? 6, 1)
  const sort = block?.filters?.sort ?? '-publishedAt'

  // Si hay manuales y es la primera página, los pineamos arriba y restamos al fetch
  const isFirstPage = page === 1 && manualResolved.length > 0
  const effectiveLimit = isFirstPage ? Math.max(limit - manualResolved.length, 0) : limit

  // ¿Filtrar categorías por slug o por id?
  const pageCatsKey: 'categories' | 'categories.slug' = (block?.filters?.categories ?? []).some(
    (c) => {
      const val = typeof c === 'string' ? c : (c.slug ?? c.id)
      return val ? !looksLikeId(val) : false
    },
  )
    ? 'categories.slug'
    : 'categories'

  const where = buildWhereFromFilters(block, pageCatsKey)

  // Evitar duplicar manualItems en la primera página
  if (isFirstPage) {
    manualIDs.forEach((id, idx) => {
      where[`where[id][not_in_manual][${idx}]`] = id
    })
  }

  const params = new URLSearchParams({
    depth: '2',
    draft: 'false',
    limit: String(effectiveLimit),
    sort,
    page: String(page),
    ...where,
  })

  const url = `${cmsURL}/api/posts?${params.toString()}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) {
    // Si falla, al menos devolvemos manuales en página 1
    return {
      docs: isFirstPage ? manualResolved.slice(0, limit) : [],
      page: 1,
      totalPages: 1,
      totalDocs: isFirstPage ? manualResolved.length : 0,
    }
  }
  const data = await res.json()
  const docs: Post[] = data?.docs ?? []
  const totalDocs: number = data?.totalDocs ?? docs.length
  const totalPages: number = data?.totalPages ?? 1
  const currentPage: number = data?.page ?? page

  // Combinar manuales + docs de API en página 1
  const finalDocs = isFirstPage ? [...manualResolved.slice(0, limit), ...docs] : docs
  return { docs: finalDocs, page: currentPage, totalPages, totalDocs }
}

export default function BlogPostsListBlock(block: BlogPostsListBlockProps) {
  const { t } = useTranslation()

  const baseURL = React.useMemo(
    () => process.env.NEXT_PUBLIC_CMS_URL || process.env.NEXT_PUBLIC_SERVER_URL || '',
    [],
  )

  const [page, setPage] = React.useState(1)
  const [posts, setPosts] = React.useState<Post[] | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [totalPages, setTotalPages] = React.useState(1)

  const limit = Math.max(block.limit ?? 6, 1)

  const load = React.useCallback(
    async (p: number) => {
      setLoading(true)
      const data = await fetchPosts(baseURL, block, p)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      setPosts(data.docs)
      setTotalPages(data.totalPages || 1)
      setLoading(false)
    },
    [baseURL, JSON.stringify(block)],
  )

  React.useEffect(() => {
    setPage(1)
    load(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseURL, JSON.stringify(block)])

  const cols = Math.min(Math.max(block.columns ?? 3, 1), 4)
  const gridColsClass = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  }[cols as 1 | 2 | 3 | 4]

  function Pagination() {
    if (totalPages <= 1) return null

    const go = (p: number) => () => {
      const target = Math.min(Math.max(p, 1), totalPages)
      if (target !== page) {
        setPage(target)
        load(target)
      }
    }

    // Ventana de páginas (máx 5)
    const windowSize = 5
    let start = Math.max(1, page - Math.floor(windowSize / 2))
    let end = start + windowSize - 1
    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - windowSize + 1)
    }

    const items = []
    for (let i = start; i <= end; i++) items.push(i)

    return (
      <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Paginación">
        <button
          onClick={go(page - 1)}
          disabled={page <= 1}
          className="rounded-xl border border-white/20 px-3 py-2 text-sm disabled:opacity-40"
        >
          ← {t('buttons.prev')}
        </button>
        {start > 1 && (
          <>
            <button onClick={go(1)} className="rounded-md px-2 text-sm hover:underline">
              1
            </button>
            <span className="px-1 text-neutral-500">…</span>
          </>
        )}
        {items.map((i) => (
          <button
            key={i}
            onClick={go(i)}
            aria-current={i === page ? 'page' : undefined}
            className={clsx(
              `rounded-md px-2 py-1 text-sm`,
              i === page && 'bg-blue-400 text-white',
              i !== page && 'hover:bg-black/30',
            )}
          >
            {i}
          </button>
        ))}
        {end < totalPages && (
          <>
            <span className="px-1 text-neutral-500">…</span>
            <button onClick={go(totalPages)} className="rounded-md px-2 text-sm hover:underline">
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={go(page + 1)}
          disabled={page >= totalPages}
          className="rounded-xl border border-white/20 px-3 py-2 text-sm disabled:opacity-40"
        >
          {t('buttons.next')} →
        </button>
      </nav>
    )
  }

  return (
    <section className="w-full" id="blog-container">
      {block.heading && <h2 className="mb-4 text-2xl font-bold">{block.heading}</h2>}

      {loading && posts?.length == 0 && (
        <div className="rounded-xl border border-white/10 bg-neutral-900/10 p-6 text-sm text-neutral-400">
          Cargando posts…
        </div>
      )}

      {!loading && posts && posts.length === 0 && (
        <div className="rounded-xl border border-white/10 bg-neutral-900/10 p-6 text-sm text-neutral-400">
          No hay artículos para mostrar.
        </div>
      )}

      {!loading &&
        posts &&
        posts.length > 0 &&
        (block.variant === 'list' ? (
          <ul className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
            {posts.map((p) => {
              const imgSrc =
                typeof p.coverImage === 'string'
                  ? p.coverImage
                  : p.coverImage?.sizes?.card?.url || p.coverImage?.url
              return (
                <li key={p.id} className="flex items-start gap-4 p-4">
                  {block.show?.showImage && imgSrc && (
                    <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-neutral-800">
                      <Image
                        src={imgSrc}
                        alt={
                          typeof p.coverImage === 'object'
                            ? (p.coverImage as Media).alt || p.title
                            : p.title
                        }
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="text-base font-semibold hover:underline"
                    >
                      {p.title}
                    </Link>
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
              )
            })}
          </ul>
        ) : (
          <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 ${gridColsClass}`}>
            {posts.map((p) => {
              const imgSrc =
                typeof p.coverImage === 'string'
                  ? p.coverImage
                  : p.coverImage?.sizes?.card?.url || p.coverImage?.url
              return (
                <article
                  key={p.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-100 transition hover:border-white/20"
                >
                  <Link href={`/blog/${p.slug}`} className="block">
                    {block.show?.showImage && imgSrc && (
                      <div
                        className={`relative w-full ${aspectToClass(block.advanced?.cardAspect)} overflow-hidden bg-neutral-800`}
                      >
                        <Image
                          src={imgSrc}
                          alt={
                            typeof p.coverImage === 'object'
                              ? p.coverImage?.alt || p.title
                              : p.title
                          }
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
                            <span
                              key={c.id}
                              className="rounded-full border border-black/20 px-2 py-0.5 text-xs text-neutral-500"
                            >
                              {c.title}
                            </span>
                          ))}
                        </div>
                      )}
                      <h3 className="line-clamp-2 text-lg font-semibold">{p.title}</h3>
                      {block.show?.showExcerpt && p.excerpt && (
                        <p className="line-clamp-3 text-sm text-neutral-400">{p.excerpt}</p>
                      )}
                      <div className="mt-1 flex items-center gap-3 text-xs text-neutral-500">
                        {block.show?.showDate && <span>{formatDate(p.publishedAt)}</span>}
                        {block.show?.showAuthor &&
                          typeof p.author === 'object' &&
                          p.author?.name && <span>• Por {p.author.name}</span>}
                      </div>
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>
        ))}

      {/* Paginación */}
      {!loading && totalPages > 1 && <Pagination />}

      {block.show?.showPaginationLink && (
        <div className="mt-6 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
          >
            Ver todos
          </Link>
        </div>
      )}
    </section>
  )
}
