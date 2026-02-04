import { defineType, defineField } from "sanity"

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",

  fields: [
    // ---------- QUESTION ----------
    defineField({
      name: "question",
      title: "Question",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "de", title: "Deutsch", type: "string" },
      ],
      validation: Rule => Rule.required(),
    }),

    // ---------- ANSWER ----------
    defineField({
      name: "answer",
      title: "Answer",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text", rows: 4 },
        { name: "de", title: "Deutsch", type: "text", rows: 4 },
      ],
      validation: Rule => Rule.required(),
    }),

    // ---------- CATEGORY ----------
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Membership", value: "membership" },
          { title: "Payments", value: "payments" },
          { title: "Training", value: "training" },
          { title: "General", value: "general" },
        ],
      },
      initialValue: "membership",
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
