import * as React from 'react'
import RichText from '@/components/RichText'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export type RichTextBlock = {
  id: string
  blockType: 'richText'
  content: DefaultTypedEditorState
}

export default function RichTextBlockView(props: RichTextBlock) {
  const { content } = props

  return <RichText data={content} />
}
