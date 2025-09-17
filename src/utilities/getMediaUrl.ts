import { Media } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (media: Media, cacheTag?: string | null, fromDirectStorage = true): string => {
  if (!media?.url) return ''

  if (fromDirectStorage) {
    return cacheTag
      ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${media.filename}?${cacheTag}`
      : `${process.env.NEXT_PUBLIC_STORAGE_URL}${media.filename}`
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL()
  return cacheTag ? `${baseUrl}${media.url}?${cacheTag}` : `${baseUrl}${media.url}`
}
