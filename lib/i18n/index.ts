import { en } from "./en"
import { de } from "./de"

export type Locale = "en" | "de"
export type TranslationKey = keyof typeof en

export const locales: Locale[] = ["en", "de"]
export const defaultLocale: Locale = "en"

export const translations = {
  en,
  de,
} as const

/**
 * Safely gets translations for a locale, ensuring structure matches default locale
 * Prevents silent fallbacks and ensures arrays are never empty
 */
export function getTranslations(locale: Locale) {
  const requestedTranslation = translations[locale]
  const defaultTranslation = translations[defaultLocale]
  
  // If locale doesn't exist, use default but warn
  if (!requestedTranslation) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[i18n] Translation for locale "${locale}" not found, falling back to "${defaultLocale}"`)
    }
    return defaultTranslation
  }
  
  // Validate structure matches in development
  if (process.env.NODE_ENV === "development") {
    validateTranslationStructure(defaultTranslation, requestedTranslation, locale)
  }
  
  // Ensure arrays are never empty - merge with defaults if needed
  const safeTranslation = ensureSafeArrays(defaultTranslation, requestedTranslation)
  
  return safeTranslation
}

/**
 * Validates that translation structures match between locales
 */
function validateTranslationStructure(
  defaultT: typeof en,
  currentT: typeof de,
  locale: Locale
) {
  const checks = [
    {
      key: "programs.featured",
      defaultLength: defaultT.programs.featured.length,
      currentLength: currentT.programs.featured.length,
    },
    {
      key: "trainers.featured",
      defaultLength: defaultT.trainers.featured.length,
      currentLength: currentT.trainers.featured.length,
    },
    {
      key: "testimonials.featured",
      defaultLength: defaultT.testimonials.featured.length,
      currentLength: currentT.testimonials.featured.length,
    },
    {
      key: "testimonials.stats",
      defaultLength: defaultT.testimonials.stats.length,
      currentLength: currentT.testimonials.stats.length,
    },
  ]
  
  checks.forEach(({ key, defaultLength, currentLength }) => {
    if (defaultLength !== currentLength) {
      console.warn(
        `[i18n] Array length mismatch for "${key}": EN has ${defaultLength}, ${locale} has ${currentLength}. ` +
        `This may cause missing content.`
      )
    }
  })
  
  // Check critical keys exist
  const criticalKeys = [
    "about.mission.title",
    "about.mission.description",
    "about.coreValues.title",
  ]
  
  criticalKeys.forEach((keyPath) => {
    const keys = keyPath.split(".")
    let defaultValue: any = defaultT
    let currentValue: any = currentT
    
    for (const key of keys) {
      defaultValue = defaultValue?.[key]
      currentValue = currentValue?.[key]
    }
    
    if (!currentValue && defaultValue) {
      console.warn(
        `[i18n] Missing critical key "${keyPath}" in ${locale} translation. ` +
        `Content may be empty.`
      )
    }
  })
}

/**
 * Ensures arrays are never empty by merging with defaults if needed
 */
function ensureSafeArrays(
  defaultT: typeof en,
  currentT: typeof de
): typeof en {
  // Create a deep clone to avoid mutating original
  const safe: any = { ...currentT }
  
  // Ensure arrays exist and are not empty
  if (!safe.programs?.featured || safe.programs.featured.length === 0) {
    safe.programs = { ...safe.programs, featured: defaultT.programs.featured }
  }
  
  if (!safe.trainers?.featured || safe.trainers.featured.length === 0) {
    safe.trainers = { ...safe.trainers, featured: defaultT.trainers.featured }
  }
  
  if (!safe.testimonials?.featured || safe.testimonials.featured.length === 0) {
    safe.testimonials = { ...safe.testimonials, featured: defaultT.testimonials.featured }
  }
  
  if (!safe.testimonials?.stats || safe.testimonials.stats.length === 0) {
    safe.testimonials = { ...safe.testimonials, stats: defaultT.testimonials.stats }
  }
  
  // Ensure mission description exists
  if (!safe.about?.mission?.description) {
    safe.about = {
      ...safe.about,
      mission: {
        ...safe.about?.mission,
        description: defaultT.about.mission.description,
      },
    }
  }
  
  return safe as typeof en
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean)
  if (segments[0] === "de") {
    return "de"
  }
  return "en"
}

export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean)
  if (segments[0] === "de") {
    return "/" + segments.slice(1).join("/")
  }
  return pathname
}

export function addLocaleToPath(pathname: string, locale: Locale): string {
  if (locale === "en") {
    return pathname
  }
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`
  return `/${locale}${cleanPath}`
}
