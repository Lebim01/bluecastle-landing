'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import type { Page } from '@/payload-types';

export type TradingViewBlockType = Extract<
    Page['layout'][number],
    { blockType: 'tradingView' }
>;

const extractParts = (html: string) => {
    const scriptTagMatch = html?.match(
        /<script\b[^>]*src=["']([^"']+)["'][^>]*>([\s\S]*?)<\/script>/i
    );
    const scriptSrc = scriptTagMatch?.[1] ?? null;
    const scriptInner = scriptTagMatch?.[2]?.trim() ?? '';
    const containerHtml = (html || '').replace(scriptTagMatch?.[0] ?? '', '').trim();

    let config: any = null;
    if (scriptInner) {
        try {
            config = JSON.parse(scriptInner);
        } catch {
            config = scriptInner;
        }
    }

    return { scriptSrc, config, containerHtml };
};

export const TradingViewBlock: React.FC<TradingViewBlockType> = (props) => {
    const { embedHtml, height, fullWidth } = (props || {}) as any;
    const hostRef = useRef<HTMLDivElement>(null);

    if (!props || !('embedHtml' in (props as any))) {
        if (process.env.NODE_ENV !== 'production') {
            console.warn('[TradingViewBlock] props vacíos o sin embedHtml:', props);
        }
        return null;
    }

    const parts = useMemo(() => extractParts(embedHtml ?? ''), [embedHtml]);

    useEffect(() => {
        if (!hostRef.current || !parts.scriptSrc) return;

        hostRef.current.innerHTML = parts.containerHtml || '';

        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = parts.scriptSrc;

        if (typeof parts.config === 'string') {
            s.innerHTML = parts.config;
        } else if (parts.config && typeof parts.config === 'object') {
            const cfg = { ...parts.config, autosize: true, width: '100%', height: '100%' };
            s.text = JSON.stringify(cfg);
        }

        hostRef.current.appendChild(s);

        return () => {
            if (hostRef.current) hostRef.current.innerHTML = '';
        };
    }, [parts]);

    return (
        <div
            className={`my-8 ${fullWidth ? 'w-full' : 'max-w-screen-2xl px-4 xl:px-6 mx-auto'}`}
            style={{ minHeight: height ?? 500 }}
        >
            <div ref={hostRef} style={{ width: '100%', height: height ?? 500 }} />
        </div>
    );
};
