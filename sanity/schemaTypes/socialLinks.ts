import { defineType, defineField } from "sanity"

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Links",
  type: "document",

  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "Facebook", value: "facebook" },
          { title: "Twitter / X", value: "twitter" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "YouTube", value: "youtube" }
        ]
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: "url",
      title: "Profile URL",
      type: "url",
      validation: Rule => Rule.required()
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number"
    })
  ],

  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }]
    }
  ]
})
