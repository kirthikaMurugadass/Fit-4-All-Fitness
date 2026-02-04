// Structured Data Components for SEO - Documentation Section 8.1
// JSON-LD schema markup for LocalBusiness, Organization, etc.

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://forgefitness.com/#business",
    name: "Fit 4All Fitness",
    description: "Premium gym and training facility offering elite coaching, precision equipment, and transformative fitness programs.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Premium Fitness Way",
      addressLocality: "Downtown District",
      addressRegion: "State",
      postalCode: "12345",
      addressCountry: "US",
    },
    telephone: "+1234567890",
    email: "info@forgefitness.com",
    url: "https://forgefitness.com",
    priceRange: "$$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "05:00",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "06:00",
        closes: "21:00",
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://forgefitness.com/#organization",
    name: "Fit 4All Fitness",
    url: "https://forgefitness.com",
    logo: "https://forgefitness.com/logo.png",
    sameAs: [
      "https://www.facebook.com/forgefitness",
      "https://www.instagram.com/forgefitness",
      "https://www.twitter.com/forgefitness",
      "https://www.linkedin.com/company/forgefitness",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1234567890",
      contactType: "Customer Service",
      email: "info@forgefitness.com",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
