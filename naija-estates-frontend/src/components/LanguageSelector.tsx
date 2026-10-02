"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage, Language, LANGUAGE_OPTIONS } from "@/lib/LanguageContext";

export default function LanguageSelector() {
  const { lang, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGE_OPTIONS.find(opt => opt.code === lang) || LANGUAGE_OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 rounded-full hover:bg-white/10 transition-colors text-xs uppercase tracking-wider font-semibold text-gray-200 focus:outline-none"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-gray-400" />
        <span className="font-bold">{currentOption.shortLabel}</span>
        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-md shadow-2xl bg-[#111] border border-white/15 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1 text-[9px] uppercase tracking-widest text-gray-500 font-bold border-b border-white/10 mb-1">
            Select Language
          </div>
          {LANGUAGE_OPTIONS.map((opt) => {
            const isSelected = opt.code === lang;
            return (
              <button
                key={opt.code}
                onClick={() => {
                  setLanguage(opt.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors hover:bg-white/10 ${
                  isSelected ? 'text-emerald-400 font-bold bg-white/5' : 'text-gray-300 font-normal'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
