import { defineType, defineField } from "sanity"

export const testimonialStat = defineType({
  name: "testimonialStat",
  title: "Testimonial Statistics",
  type: "document",

  fields: [
    // ---------- LABEL ----------
    defineField({
      name: "label",
      title: "Stat Label",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "de", title: "Deutsch", type: "string" },
      ],
      validation: Rule => Rule.required(),
    }),

    // ---------- VALUE ----------
    defineField({
      name: "value",
      title: "Stat Value",
      type: "number",
      validation: Rule => Rule.required(),
    }),

    // ---------- DECIMALS ----------
    defineField({
      name: "decimals",
      title: "Decimal Places",
      type: "number",
      initialValue: 0,
      description: "Number of decimal places to display (e.g., 1 for 4.2)",
    }),

    // ---------- SUFFIX ----------
    defineField({
      name: "suffix",
      title: "Value Suffix",
      type: "string",
      description: "Symbol shown after number ( + , % , yrs )",
      options: {
        list: [
          { title: "+", value: "+" },
          { title: "%", value: "%" },
          { title: "Years", value: "yrs" },
          { title: "None", value: "" },
        ],
      },
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
