import {
  InlineToolbarFeature,
  FixedToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { BgColorFeature, HighlightColorFeature, } from 'payloadcms-lexical-ext';
import {
  TextColorFeature,
  TextSizeFeature,
  TextLetterSpacingFeature,
  TextLineHeightFeature,
  TextFontFamilyFeature,
} from "payload-lexical-typography";

export const defaultLexical = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    //BgColorFeature(),
    //HighlightColorFeature(),
    TextColorFeature(),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    TextFontFamilyFeature(),
    TextLineHeightFeature(),
    TextLetterSpacingFeature(),
    TextSizeFeature(),
  ],
})
