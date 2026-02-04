import { defineType, defineField } from "sanity"

export const hero = defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",

  fields: [
    // ======================
    // Title
    // ======================
    defineField({
      name: "title",
      title: "Hero Title",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "de", title: "German", type: "string" },
      ],
    }),

    // ======================
    // Subtitle
    // ======================
    defineField({
      name: "subtitle",
      title: "Hero Subtitle",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text" },
        { name: "de", title: "German", type: "text" },
      ],
    }),

    // ======================
    // Background Images (3 images)
    // ======================
    defineField({
      name: "backgroundImages",
      title: "Background Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      validation: (Rule) =>
        Rule.min(1).max(3).warning("Recommended: 3 background images"),
    }),

    // ======================
    // Primary CTA Button
    // ======================
    defineField({
      name: "primaryCta",
      title: "Primary Button",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Button Text",
          type: "object",
          fields: [
            { name: "en", title: "English", type: "string" },
            { name: "de", title: "German", type: "string" },
          ],
        },
        {
          name: "link",
          title: "Button Link",
          type: "string",
        },
      ],
    }),

    // ======================
    // Secondary CTA Button
    // ======================
    defineField({
      name: "secondaryCta",
      title: "Secondary Button",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Button Text",
          type: "object",
          fields: [
            { name: "en", title: "English", type: "string" },
            { name: "de", title: "German", type: "string" },
          ],
        },
        {
          name: "link",
          title: "Button Link",
          type: "string",
        },
      ],
    }),
  ],
})
