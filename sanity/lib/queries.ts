export const trainersQuery = `
  *[_type == "trainer"]{
    _id,
    name,
    role,
    shortDescription,
    image{
      asset->{
        url
      }
    }
  }
`;

export const membershipPlansQuery = `
  *[_type == "membership" && isActive == true] | order(order asc, _createdAt asc) {
    _id,
    title,
    price,
    currency,
    duration,
    features,
    isPopular,
    order
  }
`;

export const membershipPreviewQuery = `
  *[_type == "membership" && isActive == true] | order(order asc, _createdAt asc) {
    _id,
    title,
    price,
    currency,
    duration,
    features,
    isPopular,
    order
  }
`;

export const faqsQuery = `
  *[_type == "faq" && active == true && category == "membership"] | order(order asc, _createdAt asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`;

export const contactInfoQuery = `
  *[_type == "contactInfo"][0] {
    _id,
    address,
    phone,
    mobile,
    email
  }
`;

export const facilitiesQuery = `
  *[_type == "facility" && active == true]
  | order(order asc) {
    _id,
    title,
    description,
    image
  }
`

// Hero
export const heroQuery = `*[_type == "hero"][0]`

// Programs


export const programBySlugQuery = `
*[_type == "program" && slug.current == $slug][0]
`

// Generic FAQs (keep existing membership-specific faqsQuery for backward compatibility)
export const allFaqsQuery = `*[_type == "faq"]`

// Testimonials
export const testimonialsQuery = `*[_type == "testimonial"]`

// Testimonial statistics (home stats strip)
export const testimonialStatsQuery = `
  *[_type == "testimonialStat"]
  | order(order asc) {
    _id,
    label {
      en,
      de
    },
    value,
    decimals,
    suffix,
    order
  }
`


export const programsQuery = `
  *[_type == "program" && active == true]
  | order(order asc) {
    _id,
    name,
    slug,
    description,
    difficulty,
    image
  }
`
export const socialLinksQuery = `
  *[_type == "socialLink"] | order(order asc) {
    _id,
    platform,
    url
  }
`
