import type { Block } from "payload";

const validateUrl = (val: unknown) =>
  !val ? true : (typeof val === "string" && /^https?:\/\//i.test(val)) || "Debe ser una URL válida que inicie con http:// o https://";

const validateHex = (val: unknown) =>
  (typeof val === "string" && /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(val)) || "Usa un color HEX válido, por ejemplo #0553A2";

export const HeroBlock: Block = {
  slug: "heroBlock",
  labels: { singular: "Hero", plural: "Heroes" },
  fields: [
    {
      name: "variant",
      type: "select",
      label: "Diseño",
      defaultValue: "waves",
      required: true,
      options: [
        { label: "Waves", value: "waves" },
        { label: "Aurora (3D)", value: "aurora" },
        { label: "Carousel", value: "carousel" },
        { label: "BCV Stacked", value: "stacked" },
      ],
      admin: { description: "Elige el estilo visual del hero" },
    },

    { name: "title", type: "text", label: "Título", localized: true, maxLength: 140 },
    { name: "subcopy", type: "textarea", label: "Descripción", localized: true, maxLength: 320 },
    {
      name: "cta",
      type: "group",
      label: "CTA",
      fields: [
        { name: "label", type: "text", label: "Texto del botón", localized: true },
        { name: "href", type: "text", label: "Enlace", validate: validateUrl },
      ],
    },
    { name: "disclaimer", type: "textarea", label: "Aviso/Disclaimer", localized: true, maxLength: 500 },
    { name: "logo", type: "upload", relationTo: "media", label: "Logo" },

    {
      name: "waves",
      type: "group",
      label: "Ajustes: Waves",
      admin: {
        condition: (data, sibling) => (sibling?.variant ?? data?.variant) === "waves",
        description: "Configura el degradado y la altura del hero",
      },
      fields: [
        { name: "gradientStart", type: "text", label: "Color inicial", defaultValue: "#0553A2", validate: validateHex, admin: { placeholder: "#0553A2" } },
        { name: "gradientEnd", type: "text", label: "Color final", defaultValue: "#0B0F1A", validate: validateHex, admin: { placeholder: "#0B0F1A" } },
        { name: "heightVH", type: "number", label: "Altura del hero (vh)", defaultValue: 70, min: 30, max: 100 },
      ],
    },

    {
      name: "aurora",
      type: "group",
      label: "Ajustes: Aurora",
      admin: {
        condition: (data, sibling) => (sibling?.variant ?? data?.variant) === "aurora",
        description: "Configura colores, cantidad y velocidad de estrellas",
      },
      fields: [
        {
          name: "colors",
          type: "array",
          labels: { singular: "Color", plural: "Colores" },
          minRows: 2,
          defaultValue: [{ color: "#13FFAA" }, { color: "#1E67C6" }, { color: "#CE84CF" }, { color: "#DD335C" }],
          fields: [{ name: "color", type: "text", label: "Color HEX", validate: validateHex, admin: { placeholder: "#13FFAA" } }],
        },
        { name: "starsCount", type: "number", label: "Cantidad de estrellas", defaultValue: 2500, min: 0, max: 10000 },
        { name: "starsSpeed", type: "number", label: "Velocidad de estrellas", defaultValue: 2, min: 0.1, max: 10 },
      ],
    },

    {
      name: "carousel",
      type: "group",
      label: "Ajustes: Carousel",
      admin: {
        condition: (data, sibling) => (sibling?.variant ?? data?.variant) === "carousel",
        description: "Hero tipo carrusel (Embla) con slides configurables",
      },
      fields: [
        { name: "heightVH", type: "number", label: "Altura (vh)", defaultValue: 70, min: 40, max: 100 },
        { name: "loop", type: "checkbox", label: "Loop infinito", defaultValue: true },
        { name: "autoplayMs", type: "number", label: "Autoplay (ms)", defaultValue: 4500, min: 0 },
        {
          name: "slides",
          type: "array",
          required: true,
          labels: { singular: "Slide", plural: "Slides" },
          fields: [
            { name: "image", type: "upload", relationTo: "media", label: "Imagen", required: true },
            { name: "title", type: "text", label: "Título", localized: true },
            { name: "text", type: "textarea", label: "Texto", localized: true, maxLength: 320 },
            {
              name: "cta",
              type: "group",
              label: "CTA del slide",
              fields: [
                { name: "label", type: "text", label: "Texto", localized: true },
                { name: "href", type: "text", label: "Enlace", validate: validateUrl },
              ],
            },
            { name: "overlayFrom", type: "text", label: "Overlay desde (HEX)", defaultValue: "#00000099", validate: validateHex },
            { name: "overlayTo", type: "text", label: "Overlay hasta (HEX)", defaultValue: "#00000033", validate: validateHex },
            { name: "align", type: "select", label: "Alineación contenido", defaultValue: "center", options: ["start", "center", "end"] },
            { name: "lightText", type: "checkbox", label: "Texto claro (blanco)", defaultValue: true },
          ],
        },
      ],
    },

    {
      name: "stacked",
      type: "group",
      label: "Ajustes: BCV Stacked",
      admin: {
        condition: (data, sibling) => (sibling?.variant ?? data?.variant) === "stacked",
        description: "Hero con múltiples capas de fondo y layout izquierda/centrado.",
      },
      fields: [
        {
          name: "height",
          type: "select",
          label: "Altura",
          defaultValue: "twoThirds",
          options: [
            { label: "2/3 de pantalla", value: "twoThirds" },
            { label: "Pantalla completa", value: "full" },
            { label: "Auto", value: "auto" },
          ],
        },
        {
          name: "layout",
          type: "select",
          label: "Alineación",
          defaultValue: "left",
          options: [
            { label: "Texto a la izquierda, imagen a la derecha", value: "left" },
            { label: "Centrado", value: "center" },
          ],
        },
        {
          name: "container",
          type: "select",
          label: "Ancho del contenedor",
          defaultValue: "xl",
          options: ["lg", "xl", "2xl", "full"],
        },
        {
          name: "pattern",
          type: "group",
          label: "Capa: Patrón de puntos",
          fields: [
            { name: "show", type: "checkbox", label: "Mostrar", defaultValue: true },
            { name: "image", type: "upload", relationTo: "media", label: "Imagen (pattern)" },
            { name: "size", type: "select", label: "Tamaño", defaultValue: "auto", options: ["auto", "contain", "cover"] },
            { name: "position", type: "text", label: "Posición (CSS)", defaultValue: "top left" },
            { name: "repeat", type: "select", label: "Repeat", defaultValue: "repeat", options: ["repeat", "no-repeat"] },
          ],
        },
        {
          name: "overlay",
          type: "group",
          label: "Capa: Overlay (gradiente)",
          fields: [
            { name: "show", type: "checkbox", label: "Mostrar", defaultValue: true },
            { name: "from", type: "text", label: "Color desde", defaultValue: "#000000ad", validate: validateHex },
            { name: "to", type: "text", label: "Color hasta", defaultValue: "#000000ad", validate: validateHex },
            { name: "direction", type: "text", label: "Dirección CSS", defaultValue: "to bottom" },
          ],
        },
        {
          name: "bgImage",
          type: "group",
          label: "Capa: Imagen de fondo",
          fields: [
            { name: "show", type: "checkbox", label: "Mostrar", defaultValue: false },
            { name: "image", type: "upload", relationTo: "media", label: "Imagen" },
            { name: "fit", type: "select", label: "Ajuste", defaultValue: "cover", options: ["cover", "contain"] },
            { name: "position", type: "text", label: "Posición (CSS)", defaultValue: "center" },
          ],
        },
        {
          name: "baseGradient",
          type: "group",
          label: "Capa: Gradiente base",
          fields: [
            { name: "show", type: "checkbox", label: "Mostrar", defaultValue: true },
            { name: "from", type: "text", label: "Desde", defaultValue: "var(--background-color--background-secondary)" },
            { name: "to", type: "text", label: "Hasta", defaultValue: "var(--background-color--background-primary)" },
            { name: "direction", type: "text", label: "Dirección (deg)", defaultValue: "180deg" },
          ],
        },
        {
          name: "sideImage",
          type: "group",
          label: "Imagen lateral",
          admin: { condition: (data, s) => (s?.layout ?? data?.stacked?.layout) === "left" },
          fields: [
            { name: "image", type: "upload", relationTo: "media", label: "Imagen" },
            { name: "alt", type: "text", label: "Alt" },
            { name: "width", type: "select", label: "Ancho", defaultValue: "md", options: ["md", "lg"] },
            { name: "disableOnMobile", type: "checkbox", label: "Ocultar en móviles", defaultValue: false },
          ],
        },
        {
          name: "animate",
          type: "group",
          label: "Animación de entrada",
          fields: [
            { name: "enable", type: "checkbox", label: "Activar", defaultValue: true },
            { name: "delayMs", type: "number", label: "Delay (ms)", defaultValue: 80, min: 0 },
            { name: "durationMs", type: "number", label: "Duración (ms)", defaultValue: 500, min: 100 },
          ],
        },
        {
          name: "baseColor",
          type: "group",
          label: "Capa: Color sólido (fondo)",
          fields: [
            { name: "show", type: "checkbox", label: "Usar color sólido", defaultValue: false },
            { name: "color", type: "text", label: "Color HEX", defaultValue: "#0b1e3a", validate: validateHex },
          ],
        },
      ],
    },
  ],
};

export default HeroBlock;
