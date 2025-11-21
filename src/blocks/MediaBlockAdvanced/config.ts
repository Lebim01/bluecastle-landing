import type { Block } from 'payload'

export const MediaBlockAdvanced: Block = {
  slug: 'mediaAdvancedBlock',
  labels: {
    singular: 'Bloque de media',
    plural: 'Bloques de media',
  },
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'tituloInterno',
      label: 'Título interno (opcional)',
      type: 'text',
      admin: {
        description:
          'Solo sirve para que tú identifiques este bloque dentro del editor. No se muestra en la página.',
      },
    },
    {
      name: 'tipoDeContenido',
      label: '¿Qué vas a mostrar?',
      type: 'radio',
      required: true,
      defaultValue: 'imagen',
      options: [
        { label: 'Imagen', value: 'imagen' },
        { label: 'Video', value: 'video' },
      ],
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'origen',
      label: '¿De dónde viene el archivo?',
      type: 'radio',
      required: true,
      defaultValue: 'biblioteca',
      options: [
        {
          label: 'Subido en la biblioteca de medios',
          value: 'biblioteca',
        },
        {
          label: 'Desde un enlace (URL externa)',
          value: 'url',
        },
      ],
      admin: {
        layout: 'horizontal',
        description:
          'Elige si usarás un archivo de tu biblioteca de medios o un enlace externo (por ejemplo, YouTube, Vimeo o una imagen alojada en otro sitio).',
      },
    },
    {
      name: 'media',
      label: 'Archivo de imagen o video',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        condition: (data, siblingData) =>
          (siblingData?.origen ?? data?.origen) === 'biblioteca',
        description:
          'Selecciona un archivo de imagen o video que ya esté en tu biblioteca, o súbelo aquí.',
      },
    },
    {
      name: 'mediaUrl',
      label: 'Enlace del archivo (URL)',
      type: 'text',
      required: false,
      admin: {
        condition: (data, siblingData) =>
          (siblingData?.origen ?? data?.origen) === 'url',
        description:
          'Pega aquí el enlace directo de la imagen o video. Puede ser un enlace de YouTube, Vimeo o un archivo (JPG, PNG, MP4, etc.).',
      },
    },

    {
      type: 'row',
      fields: [
        {
          name: 'alineacion',
          label: 'Alineación en la página',
          type: 'radio',
          defaultValue: 'center',
          options: [
            { label: 'Izquierda', value: 'left' },
            { label: 'Centrada', value: 'center' },
            { label: 'Derecha', value: 'right' },
          ],
          admin: {
            layout: 'horizontal',
            description:
              'Define hacia qué lado se “acomoda” la imagen o el video dentro del contenido.',
          },
        },
        {
          name: 'tamaño',
          label: 'Tamaño en pantalla',
          type: 'select',
          defaultValue: 'auto',
          options: [
            {
              label: 'Automático (recomendado)',
              value: 'auto',
            },
            {
              label: 'Pequeño',
              value: 'small',
            },
            {
              label: 'Mediano',
              value: 'medium',
            },
            {
              label: 'Grande',
              value: 'large',
            },
            {
              label: 'Ancho completo (de lado a lado)',
              value: 'fullWidth',
            },
          ],
          admin: {
            description:
              'Controla qué tan grande se verá el contenido en la página.',
          },
        },
      ],
    },

    {
      name: 'proporcion',
      label: 'Formato (proporción)',
      type: 'select',
      defaultValue: 'auto',
      options: [
        { label: 'Automático', value: 'auto' },
        { label: 'Horizontal 16:9 (pantalla)', value: '16-9' },
        { label: 'Horizontal 4:3', value: '4-3' },
        { label: 'Vertical 9:16 (reel / historia)', value: '9-16' },
        { label: 'Cuadrado 1:1', value: '1-1' },
      ],
      admin: {
        description:
          'Elige la forma del contenedor (por ejemplo, formato “pantalla”, “reel”, cuadrado, etc.).',
      },
    },

    {
      name: 'textoAlternativo',
      label: 'Texto alternativo (accesibilidad)',
      type: 'text',
      admin: {
        description:
          'Describe brevemente lo que se ve en la imagen o lo que muestra el video. Ayuda a personas con lectores de pantalla y mejora el SEO.',
      },
    },
    {
      name: 'pieDeFoto',
      label: 'Pie de foto (texto debajo)',
      type: 'textarea',
      admin: {
        description:
          'Texto opcional que aparecerá debajo de la imagen o video, a modo de descripción o crédito.',
      },
    },

    {
      name: 'ajustesVideo',
      label: 'Opciones de video',
      type: 'group',
      admin: {
        condition: (data, siblingData) =>
          (siblingData?.tipoDeContenido ?? data?.tipoDeContenido) === 'video',
        description:
          'Configura cómo se comportará el video cuando el usuario lo vea en la página.',
      },
      fields: [
        {
          name: 'reproducirAutomatico',
          label: 'Reproducir automáticamente',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'silenciar',
          label: 'Silenciar el video al inicio',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'mostrarControles',
          label: 'Mostrar controles de reproducción',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'repetir',
          label: 'Repetir en bucle (loop)',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
