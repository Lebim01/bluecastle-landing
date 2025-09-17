import { CollectionConfig } from 'payload'

const Contacts: CollectionConfig = {
  slug: 'contacts',
  labels: { singular: 'Contacto', plural: 'Contactos' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'email', 'subject', 'createdAt'] },
  access: {
    read: ({ req }) => !!req.user, // solo admin ve los leads
    create: () => true, // público puede crear
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    { name: 'last_name', label: 'Apellido', type: 'text', required: true },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      unique: false,
      validate: (val) => /\S+@\S+\.\S+/.test(val || '') || 'Email inválido',
    },
    { name: 'phone', label: 'Teléfono', type: 'text' },
    { name: 'message', label: 'Mensaje', type: 'textarea', required: true },
    // tracking opcional
    { name: 'source', label: 'Source', type: 'text' },
    {
      name: 'utm',
      type: 'group',
      label: 'UTM',
      fields: [
        { name: 'campaign', type: 'text' },
        { name: 'source', type: 'text' },
        { name: 'medium', type: 'text' },
        { name: 'term', type: 'text' },
        { name: 'content', type: 'text' },
      ],
    },
    // anti-spam honeypot
    { name: '_hp', type: 'text', label: 'No completar', hidden: true, admin: { readOnly: true } },
    // consentimiento
    {
      name: 'consent',
      label: 'Acepto términos y contacto',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
  ],
}

export default Contacts
