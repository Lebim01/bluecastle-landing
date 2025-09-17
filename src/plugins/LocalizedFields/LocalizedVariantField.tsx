import React from 'react'
import { Collapsible, FieldDescription, RowLabel, useField, useLocale, useTranslation } from '@payloadcms/ui'
import type { LocalizedVariantFieldOptions } from './types'

/**
 * LocalizedVariantField wraps any localized field and adds a variant selector per-locale.
 * It stores the chosen variant in sibling metadata at `${path}.${variantKey}` (per locale).
 */
export const LocalizedVariantField: React.FC<{
  /** Path to the actual value in the document, e.g. "title" or "content" */
  path: string
  /** Label for the field */
  label?: string
  /** Description for the field */
  description?: string
  /** The plugin options passed from collection field config */
  options: LocalizedVariantFieldOptions
}> = ({ path, label, description, options }) => {
  const { t } = useTranslation()
  const locale = useLocale()
  const variantKey = options.variantKey ?? '_variant'

  // Value field hook
  const {
    value: fieldValue,
    setValue: setFieldValue,
  } = useField<{ [locale: string]: unknown }>({ path })

  // Variant metadata hook (sibling under the same path)
  const {
    value: meta,
    setValue: setMeta,
  } = useField<{ [locale: string]: { [k: string]: string } }>({ path: `${path}__meta` })

  const currentLocale = locale.code
  const currentVariant = meta?.[currentLocale]?.[variantKey] ?? options.variants[0].name

  const setVariant = (v: string) => {
    const next = { ...(meta || {}), [currentLocale]: { ...(meta?.[currentLocale] || {}), [variantKey]: v } }
    setMeta(next)
  }

  const Renderer = options.renderers[currentVariant]

  return (
    <div className="localized-variant-field">
      {label && <RowLabel label={label} path={path} />}
      {description && <FieldDescription description={description} path={path} />}

      <div className="variant-toolbar" style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        <span style={{ opacity: 0.8 }}>{t('general:locale')}: <strong>{currentLocale}</strong></span>
        <span style={{ marginLeft: 'auto', opacity: 0.8 }}>{t('general:select')}</span>
        <select
          aria-label="Selecciona variante"
          value={currentVariant}
          onChange={(e) => setVariant(e.target.value)}
          style={{ padding: '6px 8px' }}
        >
          {options.variants.map(v => (
            <option key={v.name} value={v.name}>{v.label}</option>
          ))}
        </select>
      </div>

      <div className="variant-renderer">
        {Renderer ? (
          <Renderer
            path={`${path}.${currentLocale}`}
            locale={currentLocale}
            value={fieldValue?.[currentLocale]}
            onChange={(val) => {
              const next = { ...(fieldValue || {}), [currentLocale]: val }
              setFieldValue(next)
            }}
          />
        ) : (
          <em>No hay renderer para la variante "{currentVariant}"</em>
        )}
      </div>

      <Collapsible header={<span style={{ fontWeight: 600 }}>Meta (solo admin)</span>} className="mt-2">
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, opacity: 0.75 }}>
          {JSON.stringify({ locale: currentLocale, [variantKey]: currentVariant }, null, 2)}
        </pre>
      </Collapsible>
    </div>
  )
}