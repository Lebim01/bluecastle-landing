// app/blog/[slug]/page.tsx
// Página de detalle de Post para PayloadCMS (Next.js App Router)
// - Obtiene el post por `slug` desde el REST de Payload
// - Muestra portada, título, metadatos (fecha, autor, categorías) y contenido richText
// - Incluye generateMetadata para SEO/OG
// - Tailwind CSS

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// ===== Tipos =====

type Media = {
  id: string
  url?: string
  alt?: string
  width?: number
  height?: number
  sizes?: Record<string, { url: string; width: number; height: number }>
}

type Category = { id: string; title: string; slug?: string }

type Author = { id: string; name?: string; email?: string }

type Post = {
  id: string
  title: string
  slug: string
  excerpt?: string
  richText?: any // richText (Slate o Lexical)
  publishedAt?: string
  coverImage?: Media | string | null
  categories?: Category[]
  author?: Author | string | null
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string
  }
}

type Paginated<T> = {
  docs: T[]
  totalDocs: number
  totalPages: number
  page: number
}

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || process.env.NEXT_PUBLIC_SERVER_URL

function getImageSrc(media?: Media | string | null, sizeKey?: string) {
  if (!media) return null
  if (typeof media === 'string') return media
  if (sizeKey && media.sizes?.[sizeKey]?.url) return media.sizes[sizeKey].url
  return media.url ?? null
}

function formatDate(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: '2-digit' })
}

async function fetchPost(slug: string): Promise<Post | null> {
  if (!CMS_URL) return null
  const params = new URLSearchParams({
    depth: '3',
    limit: '1',
    'where[slug][equals]': slug,
    'where[status][equals]': 'published',
  })
  const url = `${CMS_URL}/api/posts?${params.toString()}`
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) return null
  const data = (await res.json()) as Paginated<Post>
  return data.docs?.[0] || null
}

// ====== SEO ======
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug)
  if (!post) return { title: 'Artículo no encontrado | Blog' }

  const title = post.seo?.metaTitle || post.title
  const description = post.seo?.metaDescription || post.excerpt || ''
  const og =
    getImageSrc(post.coverImage as Media | string | null, 'card') ||
    getImageSrc(post.coverImage as Media | string | null)

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      images: og ? [{ url: og }] : [],
    },
    twitter: {
      card: og ? 'summary_large_image' : 'summary',
      title,
      description,
      images: og ? [og] : [],
    },
  }
}

export const revalidate = 60
export const dynamicParams = true

// ===== Render RichText (soporta Slate y Lexical simples) =====
function TextNodes({ nodes }: { nodes: any[] }) {
  return (
    <>
      {nodes.map((n, idx) => {
        if (!n) return null
        if (n.type === 'link' && n.url) {
          return (
            <a
              key={idx}
              href={n.url}
              className="underline decoration-white/30 hover:decoration-white"
            >
              <TextNodes nodes={n.children || []} />
            </a>
          )
        }
        if (typeof n.text === 'string') {
          const style = [
            n.bold ? 'font-semibold' : '',
            n.italic ? 'italic' : '',
            n.underline ? 'underline' : '',
          ]
            .filter(Boolean)
            .join(' ')
          return (
            <span key={idx} className={style}>
              {n.text}
            </span>
          )
        }
        // Fallback recursivo
        return <TextNodes key={idx} nodes={n.children || []} />
      })}
    </>
  )
}

function RenderSlate({ value }: { value: any[] }) {
  return (
    <div className="prose max-w-none prose-headings:scroll-mt-24 prose-a:underline-offset-2">
      {value.map((node, i) => {
        const children = <TextNodes nodes={node.children || []} />
        switch (node.type) {
          case 'h1':
            return (
              <h1 key={i} className="mt-8 text-3xl font-bold">
                {children}
              </h1>
            )
          case 'h2':
            return (
              <h2 key={i} className="mt-8 text-2xl font-bold">
                {children}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={i} className="mt-6 text-xl font-semibold">
                {children}
              </h3>
            )
          case 'ul':
            return (
              <ul key={i} className="my-4 list-disc pl-6">
                {(node.children || []).map((li: any, idx: number) => (
                  <li key={idx}>
                    <TextNodes nodes={li.children || []} />
                  </li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i} className="my-4 list-decimal pl-6">
                {(node.children || []).map((li: any, idx: number) => (
                  <li key={idx}>
                    <TextNodes nodes={li.children || []} />
                  </li>
                ))}
              </ol>
            )
          case 'blockquote':
            return (
              <blockquote key={i} className="my-6 border-l-4 border-black/30 pl-4 italic">
                {children}
              </blockquote>
            )
          default:
            return (
              <p key={i} className="my-4 leading-7 text-neutral-500">
                {children}
              </p>
            )
        }
      })}
    </div>
  )
}

function RenderLexical({ value }: { value: any }) {
  const root = value?.root
  if (!root?.children) return null
  const renderNodes = (nodes: any[]): any =>
    nodes.map((n, i) => {
      if (!n) return null
      if (n.type === 'paragraph') {
        return (
          <p key={i} className="my-4 leading-7 text-neutral-500">
            {renderNodes(n.children || [])}
          </p>
        )
      }
      if (n.type === 'heading') {
        const Tag = (n.tag || 'h2') as any
        return (
          <Tag key={i} className="mt-8 text-2xl font-bold">
            {renderNodes(n.children || [])}
          </Tag>
        )
      }
      if (n.type === 'list') {
        const ListTag = (n.listType === 'number' ? 'ol' : 'ul') as 'ul' | 'ol'
        return (
          <ListTag
            key={i}
            className={`my-4 pl-6 ${ListTag === 'ol' ? 'list-decimal' : 'list-disc'}`}
          >
            {renderNodes(n.children || [])}
          </ListTag>
        )
      }
      if (n.type === 'listitem') {
        return <li key={i}>{renderNodes(n.children || [])}</li>
      }
      if (n.type === 'link' && n.url) {
        return (
          <a key={i} href={n.url} className="underline decoration-white/30 hover:decoration-white">
            {renderNodes(n.children || [])}
          </a>
        )
      }
      if (n.type === 'text') {
        const className = [
          n.format & 1 ? 'font-semibold' : '',
          n.format & 2 ? 'italic' : '',
          n.underline ? 'underline' : '',
        ]
          .filter(Boolean)
          .join(' ')
        return (
          <span key={i} className={className}>
            {n.text}
          </span>
        )
      }
      // Fallback
      return renderNodes(n.children || [])
    })
  return (
    <div className="prose max-w-none prose-a:underline-offset-2">{renderNodes(root.children)}</div>
  )
}

function RenderContent({ value }: { value: any }) {
  if (!value) return null
  // Slate (array) o Lexical (obj con root)
  if (Array.isArray(value)) return <RenderSlate value={value} />
  if (typeof value === 'object' && value.root) return <RenderLexical value={value} />
  // Fallback: texto plano/JSON
  return (
    <pre className="rounded-xl bg-black/30 p-4 text-sm text-neutral-500">
      {JSON.stringify(value, null, 2)}
    </pre>
  )
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug)
  if (!post) return notFound()

  const img =
    getImageSrc(post.coverImage as Media | string | null, 'card') ||
    getImageSrc(post.coverImage as Media | string | null)

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <nav className="mb-6">
        <Link href="/blog" className="text-sm text-neutral-400 hover:text-blue-400">
          ← Volver al blog
        </Link>
      </nav>

      {img && (
        <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-800">
          <Image
            src={img}
            alt={(post.coverImage as Media)?.alt || post.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <header className="mb-6">
        <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          )}
          {typeof post.author === 'object' && (post.author?.name || post.author?.email) && (
            <span>• Por {post.author.name || post.author.email}</span>
          )}
        </div>
        {(post.categories ?? []).length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {(post.categories ?? []).map((c) => (
              <span
                key={c.id}
                className="rounded-full border border-black/20 px-2 py-0.5 text-xs text-neutral-400"
              >
                {c.title}
              </span>
            ))}
          </div>
        )}
      </header>

      {post.excerpt && (
        <p className="mb-6 rounded-2xl bg-white/5 p-4 text-neutral-500 border-l-2">
          {post.excerpt}
        </p>
      )}

      <article className="mb-12">
        <RenderContent value={post.richText} />
      </article>

      <footer className="mt-10 border-t border-white/10 pt-6 text-sm text-neutral-500">
        <div className="flex items-center justify-between">
          <span>Compartir:</span>
          <div className="flex gap-3">
            <Link
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window === 'undefined' ? '' : window.location.href)}`}
              target="_blank"
              className="underline decoration-white/30 hover:decoration-white"
            >
              X/Twitter
            </Link>
            <Link
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window === 'undefined' ? '' : window.location.href)}`}
              target="_blank"
              className="underline decoration-white/30 hover:decoration-white"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}

// (Opcional) Pre-render de rutas populares
// export async function generateStaticParams() {
//   if (!CMS_URL) return []
//   const res = await fetch(`${CMS_URL}/api/posts?limit=100&depth=0&select=slug&where[status][equals]=published`)
//   if (!res.ok) return []
//   const data = (await res.json()) as Paginated<{ slug: string }>
//   return data.docs.map((d) => ({ slug: d.slug }))
// }
