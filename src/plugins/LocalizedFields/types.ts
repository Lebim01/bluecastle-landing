import { ReactNode } from "react"

export type VariantOption = {
  /** Machine name for the variant, e.g. "richText", "markdown", "ai", "plain" */
  name: string
  /** Human label shown in the UI */
  label: string
  /** Optional description/help text */
  description?: string
}


export type LocalizedVariantFieldOptions = {
  /** Key used to store the variant metadata alongside the value (per locale). Default: "_variant" */
  variantKey?: string
  /** The available input variants */
  variants: VariantOption[]
  /**
  * Renderer map that returns the React element for a given variant.
  * Each renderer receives { path, locale, value, onChange }.
  * You can import your own editors here (Markdown, RichText, etc.).
  */
  renderers: Record<string, (args: {
    path: string
    locale: string
    value: unknown
    onChange: (val: unknown) => void
  }) => ReactNode>
}