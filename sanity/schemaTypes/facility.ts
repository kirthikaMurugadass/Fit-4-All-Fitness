import { defineType, defineField } from "sanity"

export const facility = defineType({
  name: "facility",
  title: "Facilities",
  type: "document",

  fields: [
    // ---------- TITLE ----------
    defineField({
      name: "title",
      title: "Facility Title",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "de", title: "Deutsch", type: "string" },
      ],
      validation: Rule => Rule.required(),
    }),

    // ---------- DESCRIPTION ----------
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text", rows: 3 },
        { name: "de", title: "Deutsch", type: "text", rows: 3 },
      ],
    }),

    // ---------- IMAGE ----------
    defineField({
      name: "image",
      title: "Facility Image",
      type: "image",
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),

    // ---------- ORDER ----------
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),

    // ---------- ACTIVE ----------
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],

  orderings: [
    {
      title: "Order Asc",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
})
