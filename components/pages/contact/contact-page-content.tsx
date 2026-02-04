"use client"

import { useState, useMemo, useEffect } from "react"
import { Container, Section } from "@/components/layout/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHero } from "@/components/layout/page-hero"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Send, QrCode, Smartphone } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "@/lib/i18n/use-translations"
import { client } from "@/sanity/lib/client"

type SanityContactInfo = {
  address?: {
    en?: string
    de?: string
  }
  phone?: string
  mobile?: string
  email?: string
}

export function ContactPageContent() {
  const { t, locale } = useTranslations()

  // ================================
  // SANITY STATE (ONLY CONTACT INFO)
  // ================================
  const [sanityContact, setSanityContact] = useState<SanityContactInfo | null>(null)

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const data = await client.fetch(
          `*[_type=="contactInfo"][0]{
            address,
            phone,
            mobile,
            email
          }`
        )
        setSanityContact(data)
      } catch (err) {
        console.error("Failed to fetch contact info from Sanity", err)
      }
    }

    fetchContactInfo()
  }, [])

  // ================================
  // FORM STATE (UNCHANGED)
  // ================================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const [appFormData, setAppFormData] = useState({
    countryCode: "+1",
    phoneNumber: "",
  })

  // ================================
  // CONTACT INFO WITH FALLBACK
  // ================================
  const addressText =
    sanityContact?.address?.[locale as "en" | "de"] ||
    t.contact.info?.address?.value ||
    "Eva Steimer, certified fitness trainer\nRheinsfelderstrasse 43\nCH-8193 Eglisau"

  const addressLines = useMemo(() => addressText.split("\n"), [addressText])

  const phone =
    sanityContact?.phone || t.contact.info?.phone?.value || "+41 43 422 55 15"

  const mobile =
    sanityContact?.mobile || t.contact.info?.mobile?.value || "+49 1520 179 4777"

  const email =
    sanityContact?.email || t.contact.info?.email?.value || "wutachfitness@web.de"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Read form values using FormData
      const form = e.currentTarget
      const formDataObj = new FormData(form)
      
      // Extract values with exact field names
      const payload = {
        name: formDataObj.get("name") as string,
        email: formDataObj.get("email") as string,
        phone: formDataObj.get("phone") as string,
        message: formDataObj.get("message") as string,
      }

      // Send JSON payload to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      // Success: show alert and reset form
      alert("Thank you! Your message has been sent. We'll get back to you soon.")
      setSubmitStatus("success")
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      form.reset()
    } catch (error) {
      // Error: show alert
      alert("Something went wrong. Please try again.")
      setSubmitStatus("error")
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <main className="min-h-screen">
      <PageHero
        title={t.contact.title}
        subtitle={t.contact.subtitle}
        backgroundImage="/images/contact-bg.jpg"
      />

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="mb-6">{t.contact.info?.title || "Contact Information"}</h2>
                <div className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-muted-foreground">
                          {addressLines.map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          <span className="font-semibold">
                            {t.contact.info?.phone?.label || "Phone:"}
                          </span>{" "}
                          <a href={`tel:${phone}`} className="text-primary hover:underline">
                            {phone}
                          </a>
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          <span className="font-semibold">
                            {t.contact.info?.mobile?.label || "Mobile:"}
                          </span>{" "}
                          <a href={`tel:${mobile}`} className="text-primary hover:underline">
                            {mobile}
                          </a>
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          <span className="font-semibold">
                            {t.contact.info?.email?.label || "Email:"}
                          </span>{" "}
                          <a href={`mailto:${email}`} className="text-primary hover:underline">
                            {email}
                          </a>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{t.contact.form?.title || "Send Us a Message"}</CardTitle>
                  <CardDescription>
                    {t.contact.form?.description || "Fill out the form below and we'll get back to you within 24 hours."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.contact.name} *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t.contact.form?.placeholders?.name || "Your full name"}
                        aria-required="true"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{t.contact.email} *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t.contact.form?.placeholders?.email || "your.email@example.com"}
                        aria-required="true"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.contact.phone}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t.contact.form?.placeholders?.phone || "(123) 456-7890"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">{t.contact.form?.subjectLabel || "Subject"} *</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) =>
                          setFormData({ ...formData, subject: value })
                        }
                        required
                      >
                        <SelectTrigger id="subject" aria-required="true">
                          <SelectValue placeholder={t.contact.form?.subjectPlaceholder || "Select a subject"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">{t.contact.form?.subjects?.general || "General Inquiry"}</SelectItem>
                          <SelectItem value="membership">{t.contact.form?.subjects?.membership || "Membership"}</SelectItem>
                          <SelectItem value="training">{t.contact.form?.subjects?.training || "Personal Training"}</SelectItem>
                          <SelectItem value="programs">{t.contact.form?.subjects?.programs || "Programs"}</SelectItem>
                          <SelectItem value="other">{t.contact.form?.subjects?.other || "Other"}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t.contact.message} *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder={t.contact.form?.placeholders?.message || "Tell us how we can help..."}
                        rows={6}
                        aria-required="true"
                      />
                    </div>

                    {submitStatus === "success" && (
                      <div className="p-4 rounded-lg bg-primary/10 text-primary text-sm">
                        {t.contact.form?.successMessage || "Thank you! Your message has been sent. We'll get back to you soon."}
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
                        {t.contact.form?.errorMessage || "Something went wrong. Please try again."}
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        t.contact.form?.sending || "Sending..."
                      ) : (
                        <>
                          {t.contact.send}
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      {t.contact.form?.privacy || "By submitting this form, you agree to our privacy policy. We'll never share your information."}
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-muted/20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-card border-border shadow-lg">
                <CardHeader className="space-y-4">
                  <CardTitle className="text-2xl md:text-3xl">
                    {t.contact.downloadApp.title}
                  </CardTitle>
                  <CardDescription className="text-base md:text-lg">
                    {t.contact.downloadApp.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-[120px_1fr] gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="country-code" className="text-xs text-muted-foreground">
                          {t.contact.downloadApp.countryLabel || "Country"}
                        </Label>
                        <Select
                          value={appFormData.countryCode}
                          onValueChange={(value) =>
                            setAppFormData({ ...appFormData, countryCode: value })
                          }
                        >
                          <SelectTrigger id="country-code" className="h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+1">+1 (US)</SelectItem>
                            <SelectItem value="+44">+44 (UK)</SelectItem>
                            <SelectItem value="+91">+91 (IN)</SelectItem>
                            <SelectItem value="+61">+61 (AU)</SelectItem>
                            <SelectItem value="+33">+33 (FR)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="app-phone" className="text-xs text-muted-foreground">
                          {t.contact.downloadApp.phoneLabel || "Phone number"}
                        </Label>
                        <Input
                          id="app-phone"
                          type="tel"
                          value={appFormData.phoneNumber}
                          onChange={(e) =>
                            setAppFormData({ ...appFormData, phoneNumber: e.target.value })
                          }
                          placeholder={t.contact.downloadApp.phonePlaceholder}
                          className="h-10"
                        />
                      </div>
                    </div>

                    <Button
                      type="button"
                      size="lg"
                      className="w-full"
                      onClick={() => {
                        console.log("Send app link:", appFormData)
                      }}
                    >
                      {t.contact.downloadApp.send}
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4 border-t border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-lg bg-muted border border-border flex items-center justify-center">
                        <QrCode className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t.contact.downloadApp.qrText || "Scan QR code to download"}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 flex-1">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto justify-start h-auto py-3 px-4 border-2 hover:bg-accent"
                        asChild
                      >
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3"
                        >
                          <Smartphone className="w-5 h-5" />
                          <div className="text-left">
                            <div className="text-xs text-muted-foreground">{t.contact.downloadApp.googlePlay?.label || "GET IT ON"}</div>
                            <div className="text-sm font-semibold">{t.contact.downloadApp.googlePlay?.name || "Google Play"}</div>
                          </div>
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto justify-start h-auto py-3 px-4 border-2 hover:bg-accent"
                        asChild
                      >
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3"
                        >
                          <Smartphone className="w-5 h-5" />
                          <div className="text-left">
                            <div className="text-xs text-muted-foreground">{t.contact.downloadApp.appStore?.label || "Download on the"}</div>
                            <div className="text-sm font-semibold">{t.contact.downloadApp.appStore?.name || "App Store"}</div>
                          </div>
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative order-first lg:order-last"
            >
              <div className="relative bg-primary/20 rounded-2xl p-8 md:p-12 lg:p-16 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 rounded-2xl" />
                
                <div className="relative z-10 mx-auto max-w-[280px] md:max-w-[320px]">
                  <div className="relative aspect-[9/19] w-full">
                    <div className="absolute inset-0 rounded-[2.5rem] bg-card border-4 border-border shadow-2xl overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted/30">
                        <Smartphone className="w-24 h-24 text-muted-foreground/50" />
                      </div>
                      <Image
                        src="/images/phone.png"
                        alt="Fit 4All Fitness mobile app preview"
                        fill
                        className="object-contain"
                        quality={90}
                        sizes="(max-width: 768px) 280px, 320px"
                      />
                    </div>
                    <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl -z-10" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
