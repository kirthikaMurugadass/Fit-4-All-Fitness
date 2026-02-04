import { defineType, defineField } from "sanity";

export const membership = defineType({
  name: "membership",
  title: "Membership Plan",
  type: "document",

  fields: [
    // 🔹 Plan Name
    defineField({
      name: "title",
      title: "Plan Title",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "de", title: "Deutsch", type: "string" },
      ],
    }),

    // 🔹 Short Description
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text", rows: 3 },
        { name: "de", title: "Deutsch", type: "text", rows: 3 },
      ],
    }),

    // 🔹 Price
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),

    // 🔹 Currency
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "CHF",
      options: {
        list: ["CHF", "EUR", "USD"],
      },
    }),

    // 🔹 Billing Duration
    defineField({
      name: "duration",
      title: "Billing Duration",
      type: "string",
      options: {
        list: [
          { title: "Monthly", value: "monthly" },
          { title: "Quarterly", value: "quarterly" },
          { title: "Yearly", value: "yearly" },
        ],
      },
    }),

    // 🔹 Features List
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "text",
              title: "Feature Text",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "de", title: "Deutsch", type: "string" },
              ],
            },
          ],
        },
      ],
    }),

    // 🔹 Highlight Plan (Most Popular)
    defineField({
      name: "isPopular",
      title: "Mark as Popular",
      type: "boolean",
      initialValue: false,
    }),

    // 🔹 Order Control
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),

    // 🔹 Active / Inactive
    defineField({
      name: "isActive",
      title: "Active Plan",
      type: "boolean",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "title.en",
    },
  },
});
