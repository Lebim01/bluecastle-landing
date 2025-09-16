'use client'
import React from 'react'
import { useRowLabel } from '@payloadcms/ui'

type RowData = { title?: string }

export default function TimelineEntryRowLabel({
    prefix = '',
    fallback = 'Entrada',
    showIndex = true,
}: {
    prefix?: string
    fallback?: string
    showIndex?: boolean
}) {
    const { data, rowNumber } = useRowLabel<RowData>()
    const title = data?.title || fallback
    const idx = showIndex ? ` ${String(rowNumber).padStart(2, '0')}` : ''
    return <span>{`${prefix}${title}${idx}`}</span>
}
