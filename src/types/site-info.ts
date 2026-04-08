// types/site-info.ts

export interface SiteInfo {
  email: string
  phone: string
  location: {
    fr: string
    ar: string
  }
  /** Texte du bandeau défilant sous le header (desktop uniquement) */
  headerTicker?: {
    fr: string
    ar: string
  }
}

