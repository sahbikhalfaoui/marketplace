"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "fr" | "it" | "es"

interface Translations {
  [key: string]: {
    [key in Language]: string
  }
}

const translations: Translations = {
  // Navigation
  "nav.home": {
    en: "Home",
    fr: "Accueil",
    it: "Casa",
    es: "Inicio",
  },
  "nav.browse": {
    en: "Browse",
    fr: "Parcourir",
    it: "Sfoglia",
    es: "Explorar",
  },
  "nav.sell": {
    en: "Sell",
    fr: "Vendre",
    it: "Vendere",
    es: "Vender",
  },
  "nav.account": {
    en: "Account",
    fr: "Compte",
    it: "Account",
    es: "Cuenta",
  },
  "nav.login": {
    en: "Login",
    fr: "Connexion",
    it: "Accesso",
    es: "Iniciar sesión",
  },
  "nav.signup": {
    en: "Sign Up",
    fr: "S'inscrire",
    it: "Registrati",
    es: "Registrarse",
  },

  // Hero Section
  "hero.title": {
    en: "Premium Marketplace for Everything",
    fr: "Marché Premium pour Tout",
    it: "Mercato Premium per Tutto",
    es: "Mercado Premium para Todo",
  },
  "hero.subtitle": {
    en: "Buy, sell, auction, and trade with confidence on our secure platform",
    fr: "Achetez, vendez, enchérissez et échangez en toute confiance sur notre plateforme sécurisée",
    it: "Compra, vendi, asta e scambia con fiducia sulla nostra piattaforma sicura",
    es: "Compra, vende, subasta e intercambia con confianza en nuestra plataforma segura",
  },
  "hero.search": {
    en: "Search for anything...",
    fr: "Rechercher n'importe quoi...",
    it: "Cerca qualsiasi cosa...",
    es: "Buscar cualquier cosa...",
  },

  // Product Actions
  "product.auction": {
    en: "Auction",
    fr: "Enchère",
    it: "Asta",
    es: "Subasta",
  },
  "product.buyNow": {
    en: "Buy Now",
    fr: "Acheter maintenant",
    it: "Compra ora",
    es: "Comprar ahora",
  },
  "product.trade": {
    en: "Propose Trade",
    fr: "Proposer un échange",
    it: "Proponi scambio",
    es: "Proponer intercambio",
  },
  "product.bid": {
    en: "Place Bid",
    fr: "Placer une enchère",
    it: "Fai un'offerta",
    es: "Hacer oferta",
  },

  // Time
  "time.ending": {
    en: "Ending in",
    fr: "Se termine dans",
    it: "Termina tra",
    es: "Termina en",
  },
  "time.days": {
    en: "days",
    fr: "jours",
    it: "giorni",
    es: "días",
  },
  "time.hours": {
    en: "hours",
    fr: "heures",
    it: "ore",
    es: "horas",
  },
  "time.minutes": {
    en: "minutes",
    fr: "minutes",
    it: "minuti",
    es: "minutos",
  },

  // Categories
  "category.electronics": {
    en: "Electronics",
    fr: "Électronique",
    it: "Elettronica",
    es: "Electrónicos",
  },
  "category.fashion": {
    en: "Fashion",
    fr: "Mode",
    it: "Moda",
    es: "Moda",
  },
  "category.home": {
    en: "Home & Garden",
    fr: "Maison et Jardin",
    it: "Casa e Giardino",
    es: "Hogar y Jardín",
  },
  "category.collectibles": {
    en: "Collectibles",
    fr: "Objets de collection",
    it: "Oggetti da collezione",
    es: "Coleccionables",
  },
  "category.vehicles": {
    en: "Vehicles",
    fr: "Véhicules",
    it: "Veicoli",
    es: "Vehículos",
  },

  // Common
  "common.loading": {
    en: "Loading...",
    fr: "Chargement...",
    it: "Caricamento...",
    es: "Cargando...",
  },
  "common.error": {
    en: "Something went wrong",
    fr: "Quelque chose s'est mal passé",
    it: "Qualcosa è andato storto",
    es: "Algo salió mal",
  },
  "common.retry": {
    en: "Try again",
    fr: "Réessayer",
    it: "Riprova",
    es: "Intentar de nuevo",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("marketplace-language") as Language
    if (saved && ["en", "fr", "it", "es"].includes(saved)) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("marketplace-language", lang)
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.["en"] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "es", name: "Español", flag: "🇪🇸" },
]
