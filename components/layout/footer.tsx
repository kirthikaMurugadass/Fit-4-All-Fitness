"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Container, Section } from "@/components/layout/container"
import { useTranslations } from "@/lib/i18n/use-translations"
import { addLocaleToPath } from "@/lib/i18n"
import { client } from "@/sanity/lib/client"
import { getSocialLinks, type SocialLink } from "@/lib/sanity/getSocialLinks"
import { socialIconMap } from "@/components/layout/socialIconMap"

// Footer Component - Documentation Section 3.2
// Columns of links + legal + contact info
// Now uses translations

export function Footer() {
  const { t, locale } = useTranslations()

  // ================================
  // SANITY STATE (PHONE, EMAIL, SOCIAL LINKS)
  // ================================
  const [phone, setPhone] = useState<string>("(123) 456-7890")
  const [email, setEmail] = useState<string>("info@forgefitness.com")
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "contactInfo"][0]{
            phone,
            email
          }`
        )
        if (data?.phone) {
          setPhone(data.phone)
        }
        if (data?.email) {
          setEmail(data.email)
        }
      } catch (err) {
        console.error("Failed to fetch contact info from Sanity", err)
        // Keep default fallback values on error
      }
    }

    const fetchSocialLinks = async () => {
      try {
        const links = await getSocialLinks()
        setSocialLinks(links)
      } catch (err) {
        console.error("Failed to fetch social links from Sanity", err)
      }
    }

    fetchContactInfo()
    fetchSocialLinks()
  }, [])

  const getHref = (href: string) => addLocaleToPath(href, locale)

  return (
    <footer className="border-t border-border bg-muted/20">
      <Section spacing="md">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">{t.footer.quickLinks}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={getHref("/")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t.nav.home}
                  </Link>
                </li>
                <li>
                  <Link href={getHref("/about")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t.nav.about}
                  </Link>
                </li>
                <li>
                  <Link href={getHref("/programs")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t.nav.programs}
                  </Link>
                </li>
                <li>
                  <Link href={getHref("/trainers")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t.nav.trainers}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Membership */}
            <div>
              <h3 className="font-semibold mb-4">{t.footer.membership}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={getHref("/membership")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t.footer.plansPricing}
                  </Link>
                </li>
                <li>
                  <Link href={getHref("/membership#faq")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t.footer.faq}
                  </Link>
                </li>
                <li>
                  <Link href={getHref("/contact")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t.footer.freeTrial}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold mb-4">{t.footer.connect}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={getHref("/contact")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t.footer.contactUs}
                  </Link>
                </li>
                <li>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {email}
                  </a>
                </li>
              </ul>
              <div className="flex gap-4 mt-4">
                {socialLinks.map((item) => {
                  const Icon = socialIconMap[item.platform]
                  if (!Icon) return null

                  return (
                    <a
                      key={item._id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.platform}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">{t.footer.legal}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={getHref("/privacy")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t.footer.privacyPolicy}
                  </Link>
                </li>
                <li>
                  <Link href={getHref("/terms")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t.footer.termsOfService}
                  </Link>
                </li>
                <li>
                  <Link href={getHref("/accessibility")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t.footer.accessibility}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-center text-muted-foreground">
              {t.footer.copyright.replace("{year}", new Date().getFullYear().toString())}
            </p>
          </div>
        </Container>
      </Section>
    </footer>
  )
}
