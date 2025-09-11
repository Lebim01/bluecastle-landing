import type { Block } from "payload";

export const Carousel: Block = {
  slug: "carousel",
  labels: { singular: "Carousel", plural: "Carousels" },
  fields: [
    {
      name: "items",
      type: "array",
      labels: { singular: "Logo", plural: "Logos" },
      minRows: 1,
      admin: { description: "Agrega, elimina o reordena logos libremente" },
      fields: [
        { name: "media", type: "upload", relationTo: "media", required: true },
        { name: "alt", type: "text", required: true },
        { name: "href", type: "text", admin: { description: "Link del logo (opcional)" } },
        { name: "newTab", type: "checkbox", defaultValue: true },
      ],
    },
    { name: "height", type: "number", defaultValue: 120, admin: { description: "Altura en px del carrusel" } },
    {
      name: "perView",
      type: "group",
      admin: { description: "Cuántos logos por breakpoint" },
      fields: [
        { name: "base", type: "number", defaultValue: 2.5 },
        { name: "sm", type: "number", defaultValue: 3.5 },
        { name: "md", type: "number", defaultValue: 5 },
        { name: "lg", type: "number", defaultValue: 6 },
        { name: "xl", type: "number", defaultValue: 7 },
      ],
    },
    {
      name: "autoScroll",
      type: "group",
      fields: [
        { name: "playOnInit", type: "checkbox", defaultValue: true },
        { name: "speed", type: "number", defaultValue: 1 },
        { name: "stopOnMouseEnter", type: "checkbox", defaultValue: true },
        { name: "stopOnInteraction", type: "checkbox", defaultValue: false },
      ],
    },
  ],
};
export default Carousel;
