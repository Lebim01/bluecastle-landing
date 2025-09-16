import { CollectionConfig, Field, Plugin } from 'payload'
import type { LocalizedVariantFieldOptions } from './types'
import { makeLocalizedVariantField } from './register'

export type LocalizedVariantsPluginArgs = {
  /**
   * Field matcher: choose which fields to transform into LocalizedVariantField.
   * Return `true` for fields where you want to enable variants.
   */
  match: (field: Field, ctx: { collection: CollectionConfig }) => boolean
  /** Options passed to the variant component (variants + renderers) */
  options: LocalizedVariantFieldOptions
}

export const localizedVariantsPlugin = (args: LocalizedVariantsPluginArgs): Plugin => (config) => {
  const transformFields = (fields: Field[], collection: CollectionConfig): Field[] =>
    fields.map((f) => {
      if ('type' in f) {
        // Recurse into row/tabs/array/blocks, etc.
        if (f.type === 'row' && f.fields) return { ...f, fields: transformFields(f.fields, collection) }
        if (f.type === 'tabs' && f.tabs) return { ...f, tabs: f.tabs.map(tab => ({ ...tab, fields: transformFields(tab.fields || [], collection) })) }
        if (f.type === 'group' && f.fields) return { ...f, fields: transformFields(f.fields, collection) }
        if (f.type === 'array' && f.fields) return { ...f, fields: transformFields(f.fields, collection) }
        if (f.type === 'blocks' && f.blocks) return { ...f, blocks: f.blocks.map(b => ({ ...b, fields: transformFields(b.fields, collection) })) }

        const isLocalized = (f as any).localized === true
        const shouldMatch = isLocalized && args.match(f, { collection })

        if (shouldMatch) {
          // Replace the original field's admin component with our variant wrapper
          return {
            ...f,
            // Ensure localized stays true
            localized: true,
            admin: {
              ...(f as any).admin,
              components: {
                ...(f as any).admin?.components,
                Field: makeLocalizedVariantField(args.options),
              },
            },
          } as Field
        }
      }
      return f
    })

  return {
    ...config,
    collections: (config.collections || []).map((col) => ({
      ...col,
      fields: transformFields(col.fields, col),
    })),
  }
}

const PlainInput = ({ value, onChange }: any) => (
  <input style={{ width: '100%' }} value={value || ''} onChange={(e) => onChange(e.target.value)} />
)
const Textarea = ({ value, onChange }: any) => (
  <textarea rows={6} style={{ width: '100%' }} value={value || ''} onChange={(e) => onChange(e.target.value)} />
)

export const options: LocalizedVariantFieldOptions = {
  variantKey: '_variant',
  variants: [
    { name: 'plain', label: 'Texto plano' },
    { name: 'long', label: 'Textarea' },
    // aquí podrías agregar { name: 'rich', label: 'RichText' } y su renderer
  ],
  renderers: {
    plain: ({ value, onChange }) => <PlainInput value={value} onChange={onChange} />,
    long: ({ value, onChange }) => <Textarea value={value} onChange={onChange} />,
  },
}