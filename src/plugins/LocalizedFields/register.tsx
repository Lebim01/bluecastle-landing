import React from 'react'

import { LocalizedVariantField } from './LocalizedVariantField'
import type { LocalizedVariantFieldOptions } from './types'

// Factory that returns a Payload-compatible custom field component
export const makeLocalizedVariantField = (opts: LocalizedVariantFieldOptions) => {
  const Field: React.FC<any> = (props) => {
    const { path, label, admin } = props
    return (
      <LocalizedVariantField
        path={path}
        label={label}
        description={admin?.description}
        options={opts}
      />
    )
  }
  // Ensure admin HOCs are applied (permissions, condition, width, etc.)
  return Field
}