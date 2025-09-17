export type Media = {
  id: string
  url?: string
  alt?: string
  filename?: string
  width?: number
  height?: number
  sizes?: Record<string, { url: string; width: number; height: number }>
}

export type NewsroomMentionBlock = {
  id: string
  blockType: 'newsroomMention'
  outletName: string
  headline: string
  summary?: string
  date?: string
  logo?: Media | string | null
  link: {
    url: string
    label?: string
  }
  tags?: { id?: string; value?: string }[]
  sponsored?: boolean
  priority?: number
}
