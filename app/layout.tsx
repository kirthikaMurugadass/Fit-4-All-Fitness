import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LocalBusinessSchema, OrganizationSchema } from "@/components/seo/structured-data";
import { LangAttribute } from "@/components/layout/lang-attribute";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

// Primary font: Outfit - Documentation Section 2.2 (Recommended: Outfit, Satoshi, or General Sans)
const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fit 4All Fitness | Premium Gym & Training",
    template: "%s | Fit 4All Fitness",
  },
  description: "Where discipline meets design. Premium fitness experience with elite coaching, precision equipment, and transformative results.",
  keywords: ["premium gym", "fitness training", "personal training", "luxury gym", "elite fitness"],
  authors: [{ name: "Fit 4All Fitness" }],
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Fit 4All Fitness | Premium Gym & Training",
    description: "Where discipline meets design. Premium fitness experience with elite coaching, precision equipment, and transformative results.",
    type: "website",
    locale: "en_US",
    siteName: "Fit 4All Fitness",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fit 4All Fitness | Premium Gym & Training",
    description: "Where discipline meets design. Premium fitness experience with elite coaching, precision equipment, and transformative results.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://forgefitness.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <LangAttribute />
        {/* Structured Data - Documentation Section 8.1 */}
        <LocalBusinessSchema />
        <OrganizationSchema />
        
        {/* Skip to main content link - Documentation Section 8.2 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {/* Translation handled by LangAttribute component via useTranslations hook */}
          <span id="skip-to-content-text">Skip to main content</span>
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
