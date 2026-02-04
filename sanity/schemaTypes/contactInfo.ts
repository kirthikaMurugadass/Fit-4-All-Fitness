import { defineType, defineField } from "sanity"

export const contactInfo = defineType({
  name: "contactInfo",
  title: "Contact Information",
  type: "document",

  fields: [
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text", rows: 3 },
        { name: "de", title: "Deutsch", type: "text", rows: 3 },
      ],
    }),

    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),

    defineField({
      name: "mobile",
      title: "Mobile",
      type: "string",
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
  ],
})
