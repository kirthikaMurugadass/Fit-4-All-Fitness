import { defineType, defineField } from "sanity"

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",

  fields: [
    // ---------- CLIENT NAME ----------
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // ---------- CLIENT ROLE ----------
    defineField({
      name: "role",
      title: "Client Role / Membership",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "de", title: "Deutsch", type: "string" },
      ],
      description: "Example: Gym Member, PT Client",
    }),

    // ---------- TESTIMONIAL QUOTE ----------
    defineField({
      name: "quote",
      title: "Testimonial Quote",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "text", rows: 4 },
        { name: "de", title: "Deutsch", type: "text", rows: 4 },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // ---------- RATING ----------
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
    }),

    // ---------- CLIENT IMAGE ----------
    defineField({
      name: "image",
      title: "Client Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    // ---------- GYM / BACKGROUND IMAGE ----------
    defineField({
      name: "gymImage",
      title: "Gym Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    // ---------- FEATURED ----------
    defineField({
      name: "featured",
      title: "Show on Home Page",
      type: "boolean",
      initialValue: true,
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
