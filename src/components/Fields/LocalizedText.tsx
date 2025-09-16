'use client'
import { TextInput, useField, useLocale } from '@payloadcms/ui'
import clsx from 'clsx'
import { TextFieldClientComponent } from 'payload'
import { useState } from 'react'

const LocalizedText: TextFieldClientComponent = (props) => {
  const { value, setValue } = useField({
    path: props.path,
  })
  const locale = useLocale()
  const [selectedLang, setSelectedLang] = useState(locale.code)

  return (
    <>
      <TextInput
        path={props.path}
        value={value as string}
        onChange={(e: any) => setValue(e.target.value)}
        {...props.field}
        Label={
          <div className="flex items-center gap-4 pb-2">
            <span>{props.field.label || props.field.name || ''}</span>
            <div
              className="flex"
              style={{
                gap: 8,
              }}
            >
              {['es', 'pt', 'en'].map((lang) => (
                <div
                  className={clsx(
                    selectedLang == lang && 'bg-blue-400',
                    'px-1 border border-solid border-gray-100 rounded-[8px] select-none uppercase',
                  )}
                  //onClick={() => setSelectedLang(lang)}
                >
                  {lang}
                </div>
              ))}
            </div>
          </div>
        }
      />
    </>
  )
}

export default LocalizedText
