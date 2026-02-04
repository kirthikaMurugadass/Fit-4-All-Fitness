import { defineType, defineField } from "sanity";

export const trainer = defineType({
  name: "trainer",
  title: "Trainer",
  type: "document",

  fields: [
    // 🔹 Trainer Name (Multilingual)
    defineField({
      name: "name",
      title: "Trainer Name",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "de",
          title: "Deutsch",
          type: "string",
        }),
      ],
    }),

    // 🔹 Role / Speciality (Multilingual)
    defineField({
      name: "role",
      title: "Role / Speciality",
      type: "object",
      description: "Example: Personal Trainer, Strength Coach",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "string",
        }),
        defineField({
          name: "de",
          title: "Deutsch",
          type: "string",
        }),
      ],
    }),

    // 🔹 Bio / Short Description (Multilingual)
    defineField({
      name: "bio",
      title: "Short Description",
      type: "object",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "de",
          title: "Deutsch",
          type: "text",
          rows: 3,
        }),
      ],
    }),

    // 🔹 Trainer Image
    defineField({
      name: "image",
      title: "Trainer Image",
      type: "image",
      options: { hotspot: true },
    }),

    // 🔹 Show on Home Page
    defineField({
      name: "showOnHome",
      title: "Show on Home Page",
      type: "boolean",
      initialValue: false,
    }),

    // 🔹 Display Order
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = shown first",
    }),
  ],

  preview: {
    select: {
      title: "name.en",
      media: "image",
    },
  },
});
