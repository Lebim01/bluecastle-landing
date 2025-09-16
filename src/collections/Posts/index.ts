import { CollectionConfig, FieldHook } from 'payload'
import slugify from 'slugify'
import { v4 as uuidv4 } from 'uuid'

// --- Hook: generar slug a partir del título ---
const formatSlug: FieldHook = ({ data, value }) => {
  const base = value || data?.title || ''
  return slugify(String(base), { lower: true, strict: true, trim: true })
}

// --- Hook: si se publica y no hay fecha, setear publishedAt ---
const setPublishedAt: FieldHook = ({ data, value, originalDoc }) => {
  const wasDraft = (originalDoc as any)?.status !== 'published'
  const nowPublishing = data?.status === 'published'
  if (nowPublishing && wasDraft && !value) {
    return new Date().toISOString()
  }
  return value
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Posts' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'author', 'categories'],
    listSearchableFields: ['title', 'slug', 'excerpt'],
  },
  versions: {
    drafts: true,
    maxPerDoc: 25,

  },
  access: {
    read: ({ req }) => true, // público; si necesitas restringir, cambia la condición
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  timestamps: true,
  defaultSort: '-publishedAt',
  fields: [
    {
      name: 'id',
      type: 'text',
      defaultValue: () => uuidv4(),
      admin: {
        components: {
          Field: undefined,
        },
      },
    },

    // Estado del post
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },

    // Título
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
    },

    // Slug
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [formatSlug],
      },
      admin: { description: 'URL del post' },
    },

    // Fecha de publicación
    {
      name: 'publishedAt',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' }, position: 'sidebar' },
      hooks: { beforeValidate: [setPublishedAt] },
    },

    // Autor (ajusta a tu colección real de usuarios/autores)
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: 'Autor',
      admin: { position: 'sidebar' },
    },

    // Categorías
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Categorías',
    },

    // Imagen de portada
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen de portada',
    },

    // Extracto
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Extracto',
      admin: { description: 'Resumen corto para listados y meta.' },
    },

    {
      type: 'richText',
      name: 'richText',
      required: true,
      localized: true,
    },

    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Meta title' },
        { name: 'metaDescription', type: 'textarea', label: 'Meta description', maxLength: 180 },
        { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'Imagen OG' },
        { name: 'noIndex', type: 'checkbox', label: 'No index (robots)' },
        { name: 'keywords', type: 'text', label: 'Keywords' },
      ],
    },

    // Etiquetas opcionales
    {
      name: 'tags',
      type: 'array',
      labels: { singular: 'Tag', plural: 'Tags' },
      fields: [
        { name: 'value', type: 'text', required: true },
      ],
    },

    // Lectura estimada (puedes calcular en hook afterChange)
    {
      name: 'readingTime',
      type: 'number',
      admin: { position: 'sidebar', description: 'Minutos (opcional, puede calcularse automáticamente).' },
    },
  ],

  // Índices de utilidad (si usas Postgres, ve plugin correspondiente; en Mongo, index:true en campos)
  // hooks: {
  //   afterChange: [revalidateFrontendRoutes],
  // },
}
