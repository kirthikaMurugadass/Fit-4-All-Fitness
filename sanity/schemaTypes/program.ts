import { defineType, defineField } from "sanity"

export const program = defineType({
  name: "program",
  title: "Programs",
  type: "document",

  fields: [
    // ---------- PROGRAM NAME ----------
    defineField({
      name: "name",
      title: "Program Name",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "de", title: "Deutsch", type: "string" },
      ],
      validation: Rule => Rule.required(),
    }),

    // ---------- SLUG (FOR VIEW DETAILS PAGE) ----------
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name.en",
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    // ---------- SHORT DESCRIPTION (CARD VIEW) ----------
    defineField({
      name: "description",
      title: "Short Description",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text", rows: 3 },
        { name: "de", title: "Deutsch", type: "text", rows: 3 },
      ],
    }),

    // ---------- LONG DESCRIPTION (VIEW DETAILS PAGE) ----------
    defineField({
      name: "longDescription",
      title: "Program Details",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "de",
          title: "Deutsch",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    }),

    // ---------- PROGRAM IMAGE ----------
    defineField({
      name: "image",
      title: "Program Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),

    // ---------- DIFFICULTY ----------
    defineField({
      name: "difficulty",
      title: "Difficulty Level",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "string",
          options: {
            list: ["Beginner", "Intermediate", "Advanced"],
          },
        },
        {
          name: "de",
          title: "Deutsch",
          type: "string",
          options: {
            list: ["Anfänger", "Mittelstufe", "Fortgeschritten"],
          },
        },
      ],
    }),

    // ---------- FEATURED ----------
    defineField({
      name: "featured",
      title: "Featured Program",
      type: "boolean",
      initialValue: false,
      description: "Show this program in Featured Programs section",
    }),

    // ---------- ACTIVE ----------
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),

    // ---------- DISPLAY ORDER ----------
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = shown first",
    }),
  ],

  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
})
