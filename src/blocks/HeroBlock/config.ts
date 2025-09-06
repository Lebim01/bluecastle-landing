import type { Block } from "payload";

export const HeroBlock: Block = {
    slug: "heroBlock",
    labels: { singular: "Hero", plural: "Heros" },
    fields: [
        {
            name: "variant",
            type: "select",
            defaultValue: "waves",
            required: true,
            options: [
                { label: "Waves", value: "waves" },
                { label: "Aurora (3D)", value: "aurora" },
            ],
        },
        {
            name: "title",
            type: "text",
            localized: true,
            required: true,
        },
        {
            name: "subcopy",
            type: "textarea",
            localized: true,
        },
        {
            name: "cta",
            type: "group",
            fields: [
                { name: "label", type: "text", localized: true },
                { name: "href", type: "text" },
            ],
        },
        {
            name: "disclaimer",
            type: "textarea",
            localized: true,
        },
        {
            name: "logo",
            type: "upload",
            relationTo: "media",
        },
        {
            name: "waves",
            type: "group",
            admin: { condition: (data, siblingData) => (siblingData?.variant ?? data?.variant) === "waves" },
            fields: [
                { name: "gradientStart", type: "text", defaultValue: "#0553A2" },
                { name: "gradientEnd", type: "text", defaultValue: "#0b0f1a" },
                { name: "heightVH", type: "number", defaultValue: 70 },
            ],
        },
        {
            name: "aurora",
            type: "group",
            admin: { condition: (data, siblingData) => (siblingData?.variant ?? data?.variant) === "aurora" },
            fields: [
                {
                    name: "colors",
                    type: "array",
                    labels: { singular: "Color", plural: "Colors" },
                    minRows: 2,
                    defaultValue: [{ color: "#13FFAA" }, { color: "#1E67C6" }, { color: "#CE84CF" }, { color: "#DD335C" }],
                    fields: [{ name: "color", type: "text" }],
                },
                { name: "starsCount", type: "number", defaultValue: 2500 },
                { name: "starsSpeed", type: "number", defaultValue: 2 },
            ],
        },
    ],
};
export default HeroBlock;
