"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'pidgin' | 'yo' | 'ig' | 'ha';

export interface LanguageOption {
  code: Language;
  label: string;
  shortLabel: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', label: 'English', shortLabel: 'ENG' },
  { code: 'pidgin', label: 'Naija Pidgin', shortLabel: 'PIDGIN' },
  { code: 'yo', label: 'Yorùbá', shortLabel: 'YORÙBÁ' },
  { code: 'ig', label: 'Igbo', shortLabel: 'IGBO' },
  { code: 'ha', label: 'Hausa', shortLabel: 'HAUSA' },
];

interface LanguageContextType {
  lang: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  languages: LanguageOption[];
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
    agentHeroTitle: "List your portfolio.",
    agentHeroSubtitle: "Close deals faster.",
    agentHeroDesc: "Join Nigeria's most exclusive real estate network. Connect directly with high-budget tenants and buyers across Lagos, Abuja, and Port Harcourt.",
    claimFreeMonth: "Claim Free Month",
    viewPricing: "View Pricing & 5% Cut",
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
    agentHeroTitle: "Post your houses.",
    agentHeroSubtitle: "Sell dem sharp sharp.",
    agentHeroDesc: "Join the biggest agent network for Naija. Connect direct with people wey get money for Lagos, Abuja, and Port Harcourt.",
    claimFreeMonth: "Collect Awoof Month",
    viewPricing: "See Pricing & 5% Cut",
  },
  yo: {
    heroTitle: "Awọn Ilé Aláradagba Ní Nàìjíríà.",
    heroSubtitle: "Awọn ilé àgbàru, ilé gbígbé, ati ilé iṣẹ́ gíga ní Èkó ati gbogbo Nàìjíríà.",
    exploreBtn: "Wo Awọn Ilé Aláradagba",
    searchPlaceholder: "Wá ìlú, ìpínlẹ̀, tabi ilé...",
    allProperties: "Gbogbo Awọn Ilé",
    residential: "Ilé Gbígbé ati Àbáwọlé",
    commercial: "Ilé Iṣẹ́ ati Ṣọ́ọ̀pù",
    verified: "Ti A Fowósí",
    perYear: "ọdún",
    perMonth: "osù",
    perWeek: "ọ̀ṣẹ̀",
    perDay: "ọjọ́",
    contactAgent: "Sọ̀rọ̀ Pẹ̀lú Agbeṣẹ́",
    chatWhatsapp: "Fi Ṣátì Ránsẹ́ lórí WhatsApp",
    callAgent: "Pè Agbeṣẹ́ Sí Ọ̀rọ̀",
    compare: "Fi We Ra Wọn",
    save: "Fomọ́lẹ̀",
    saved: "Ti A Fomọ́lẹ̀",
    agentPortal: "Kọmputa Agbeṣẹ́",
    tenantPortal: "Kọmputa Alábàáwọlé",
    testimonialsTitle: "Erò Awọn Oníbàárà",
    agentHeroTitle: "Fi awọn ilé rẹ sori ayelujara.",
    agentHeroSubtitle: "Ta wọn ni kope kope.",
    agentHeroDesc: "Darapọ mọ ẹgbẹ awọn aṣoju ile ti o tobi julọ ni Naijiria. Sopọ pẹlu awọn ti o ni owo ni Eko, Abuja, ati Port Harcourt.",
    claimFreeMonth: "Gba Osu Kan Ọfẹ",
    viewPricing: "Wo Iye Owo & 5%",
  },
  ig: {
    heroTitle: "Ụlọ Obibi na azụmahịa kachasị mma na Naịjirịa.",
    heroSubtitle: "Kọntaktị ụlọ obibi na ụlọ azụmahịa kachasị mma na Lagos na Nigeria niile.",
    exploreBtn: "Nyochaa Ụlọ Niile",
    searchPlaceholder: "Chọọ obodo, steeti, ma ọ bụ ụlọ...",
    allProperties: "Ụlọ Niile",
    residential: "Ụlọ Obibi na Fụlátị",
    commercial: "Ụlọ Azụmahịa na Shọpụ",
    verified: "A Nyochaala",
    perYear: "afọ",
    perMonth: "ọnwa",
    perWeek: "izu",
    perDay: "ụbọchị",
    contactAgent: "Kpọtụrụ Agent",
    chatWhatsapp: "Ziga Ozi na WhatsApp",
    callAgent: "Kpọọ Agent Oku",
    compare: "Yiri Ha N'aka",
    save: "Kedo Ya",
    saved: "Kedoela",
    agentPortal: "Pọtụlụ Agent",
    tenantPortal: "Pọtụlụ Onye Rente",
    testimonialsTitle: "Ihe Ndị Mmadụ Na-ekwu",
    agentHeroTitle: "Debe ụlọ gị na ịntanetị.",
    agentHeroSubtitle: "Ree ha ngwa ngwa.",
    agentHeroDesc: "Soro netwọkụ ndị ọrụ ụlọ kacha ukwuu na Naịjirịa. Jikọọ na ndị nwere ego na Lagos, Abuja, na Port Harcourt.",
    claimFreeMonth: "Nata Otu Ọnwa N'efu",
    viewPricing: "Hụ Ọnụahịa & 5%",
  },
  ha: {
    heroTitle: "Kayan Gida da Gidaje Mafi Inganci a Nijeriya.",
    heroSubtitle: "Tsarin gidajen zama da na kasuwanci a Legas da ko'ina a Nijeriya.",
    exploreBtn: "Duba Dukkan Gidaje",
    searchPlaceholder: "Nemi birni, jiha, ko gida...",
    allProperties: "Dukkan Gidaje",
    residential: "Gidajen Zama da Fula-Toci",
    commercial: "Gidajen Kasuwanci da Shaguna",
    verified: "Ingantacce",
    perYear: "shekara",
    perMonth: "wata",
    perWeek: "mako",
    perDay: "rana",
    contactAgent: "Tuntubi Dilali",
    chatWhatsapp: "Yi Magana a WhatsApp",
    callAgent: "Kira Dilali",
    compare: "Kwatanta Gidaje",
    save: "Ajiye",
    saved: "An Ajiye",
    agentPortal: "Manhajar Dilalai",
    tenantPortal: "Manhajar Masu Haya",
    testimonialsTitle: "Cewar Abokan Ciniki",
    agentHeroTitle: "Sa gidajen ka a yanar gizo.",
    agentHeroSubtitle: "Sayar da su da sauri.",
    agentHeroDesc: "Shiga babbar hanyar sadarwa ta dillalan gidaje a Najeriya. Haɗu da masu kudi a Legas, Abuja, da Fatakwal.",
    claimFreeMonth: "Karbi Wata Daya Kyauta",
    viewPricing: "Duba Farashi da 5%",
  }
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string) => key,
  languages: LANGUAGE_OPTIONS,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  // Load language preference from localStorage if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('naijaspaces_lang') as Language;
      if (savedLang && translations[savedLang]) {
        setLang(savedLang);
      }
    }
  }, []);

  const handleSetLanguage = (newLang: Language) => {
    if (translations[newLang]) {
      setLang(newLang);
      if (typeof window !== 'undefined') {
        localStorage.setItem('naijaspaces_lang', newLang);
      }
    }
  };

  const toggleLanguage = () => {
    const codes: Language[] = ['en', 'pidgin', 'yo', 'ig', 'ha'];
    const currentIndex = codes.indexOf(lang);
    const nextLang = codes[(currentIndex + 1) % codes.length];
    handleSetLanguage(nextLang);
  };

  const t = (key: string) => {
    return translations[lang]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage: handleSetLanguage, toggleLanguage, t, languages: LANGUAGE_OPTIONS }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
