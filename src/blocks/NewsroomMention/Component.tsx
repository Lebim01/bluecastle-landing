import * as React from 'react'
import Image from 'next/image'
import type { NewsroomMentionBlock, Media } from './types'

type Props = NewsroomMentionBlock & {
  className?: string
}

function getMediaUrl(m?: Media | string | null) {
  if (!m) return null
  if (typeof m === 'string') return m
  // prioriza un size optimizado si existe
  const sized = m.sizes && (m.sizes['card'] || m.sizes['thumbnail'])
  return sized?.url || m.url || null
}

export default function NewsroomMentionBlockView(props: Props) {
  const {
    outletName,
    headline,
    summary,
    date,
    logo,
    link,
    tags = [],
    sponsored = false,
    className = '',
  } = props

  const logoUrl = getMediaUrl(logo as Media | string | null)
  const linkLabel = link?.label || 'Ver nota'

  // Accesibilidad y seguridad del enlace externo
  const relExternal = 'noopener noreferrer nofollow'

  return (
    <article
      className={`rounded-2xl border border-gray-200 dark:border-gray-800 p-5 md:p-6 bg-white dark:bg-neutral-900 shadow-sm ${className} h-full`}
      aria-label={`Aparición en prensa: ${outletName}`}
    >
      <header className="flex items-start gap-4">
        {logoUrl ? (
          <div className="relative h-10 w-28 shrink-0 md:h-12 md:w-36">
            <Image
              src={logoUrl}
              alt={typeof logo === 'object' && logo?.alt ? logo.alt : outletName}
              fill
              className="object-contain"
              sizes="144px"
              priority={false}
            />
          </div>
        ) : null}

        <div className="flex-1">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {outletName} {sponsored ? '• Patrocinado' : ''}
          </p>
          <h3 className="mt-1 text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
            {headline}
          </h3>

          {date ? (
            <time className="mt-1 block text-sm text-gray-500 dark:text-gray-400" dateTime={date}>
              {new Date(date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          ) : null}
        </div>
      </header>

      {summary ? (
        <p className="mt-4 text-sm md:text-base leading-6 text-gray-700 dark:text-gray-300">
          {summary}
        </p>
      ) : null}

      {!!tags.length && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((t, i) =>
            t?.value ? (
              <li
                key={t.id || `${t.value}-${i}`}
                className="text-xs px-2 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
              >
                {t.value}
              </li>
            ) : null,
          )}
        </ul>
      )}

      {link?.url ? (
        <div className="mt-5">
          <a
            href={link.url}
            target="_blank"
            rel={relExternal}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-neutral-800"
            aria-label={`${linkLabel}: ${headline} en ${outletName}`}
          >
            {linkLabel}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="opacity-70"
            >
              <path
                fill="currentColor"
                d="M14 3h7v7h-2V6.41l-9.29 9.3l-1.42-1.42l9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"
              />
            </svg>
          </a>
        </div>
      ) : null}
    </article>
  )
}
