"use client";

import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'pidgin';

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    heroTitle: "Lagos Real Estate, Redefined.",
    heroSubtitle: "Curated residential & commercial spaces across Nigeria.",
    exploreBtn: "Explore Collection",
    searchPlaceholder: "Search city, state, or property...",
    allProperties: "All Properties",
    residential: "Houses & Apartments",
    commercial: "Shops & Commercial",
    verified: "Verified",
    perYear: "yr",
    perMonth: "mo",
    perWeek: "wk",
    perDay: "day",
    contactAgent: "Contact Agent",
    chatWhatsapp: "Chat on WhatsApp",
    callAgent: "Call Agent",
    compare: "Compare",
    save: "Save",
    saved: "Saved",
    agentPortal: "Agent Portal",
    tenantPortal: "Tenant Dashboard",
    testimonialsTitle: "What People Say",
  },
  pidgin: {
    heroTitle: "Fine Houses for Naija, Simplified.",
    heroSubtitle: "Correct apartment, house, and shop space for Lagos & across Naija.",
    exploreBtn: "Look the Cribs",
    searchPlaceholder: "Find city, state, or house...",
    allProperties: "All Cribs",
    residential: "House & Flat",
    commercial: "Shop & Office",
    verified: "Original",
    perYear: "yr",
    perMonth: "mo",
    perWeek: "wk",
    perDay: "day",
    contactAgent: "Talk to Agent",
    chatWhatsapp: "WhatsApp the Agent",
    callAgent: "Call Agent Now",
    compare: "Compare Am",
    save: "Save Am",
    saved: "Saved",
    agentPortal: "Agent Portal",
    tenantPortal: "Tenant Dashboard",
    testimonialsTitle: "Wetin People Talk",
  }
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggleLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'pidgin' : 'en'));
  };

  const t = (key: string) => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
