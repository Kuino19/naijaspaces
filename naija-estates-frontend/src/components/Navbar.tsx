"use client";

import { useState } from "react";
import Link from "next/link";
import { Building, Menu, X, Globe, LogIn, Heart, Layers, User, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLanguage, t } = useLanguage();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="w-full z-50 px-6 py-6 flex justify-between items-center bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 sticky top-0">
        <Link href="/" onClick={closeMobileMenu} className="text-xl font-bold tracking-widest uppercase flex items-center gap-2 hover:opacity-50 transition-opacity">
          <Building className="h-5 w-5 text-white" />
          <span>Naija<span className="font-light">Spaces</span></span>
        </Link>

        {/* Consumer / Tenant Desktop Nav Links */}
        <nav className="hidden md:flex gap-8 text-xs font-medium tracking-widest uppercase items-center">
          <Link href="/properties" className="hover:text-gray-400 transition-colors">Residences</Link>
          <Link href="/compare" className="hover:text-gray-400 transition-colors">Compare</Link>
          <Link href="/dashboard/tenant" className="hover:text-gray-400 transition-colors">{t('tenantPortal')}</Link>
          <Link href="/for-agents" className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
            For Agents <ArrowUpRight className="w-3 h-3" />
          </Link>
        </nav>

        {/* Right Action Controls for Tenants */}
        <div className="flex gap-4 text-xs font-medium tracking-widest uppercase items-center">
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
            title="Toggle English / Pidgin"
          >
            <Globe className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-300 font-bold">{lang === 'en' ? 'ENG' : 'PIDGIN'}</span>
          </button>

          <Link href="/login" className="hover:text-gray-300 transition-colors hidden lg:block border-b border-white/20 pb-0.5">
            Sign In
          </Link>

          <Link 
            href="/register" 
            className="border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all duration-300 hidden sm:block font-semibold"
          >
            Create Account
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu for Tenants */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col justify-between p-8 pt-24 animate-in fade-in duration-200 overflow-y-auto">
          <div className="space-y-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-6 border-b border-white/10 pb-3">
              Explore NaijaSpaces
            </div>

            <Link 
              href="/properties" 
              onClick={closeMobileMenu}
              className="block text-2xl font-serif text-white hover:text-gray-400 transition-colors"
            >
              The Collection (Residences)
            </Link>

            <Link 
              href="/compare" 
              onClick={closeMobileMenu}
              className="flex items-center justify-between text-xl font-serif text-gray-300 hover:text-white transition-colors"
            >
              <span>Compare Properties</span>
              <Layers className="w-5 h-5 text-gray-500" />
            </Link>

            <Link 
              href="/dashboard/tenant" 
              onClick={closeMobileMenu}
              className="flex items-center justify-between text-xl font-serif text-gray-300 hover:text-white transition-colors"
            >
              <span>Tenant Portal & Favorites</span>
              <Heart className="w-5 h-5 text-red-400" />
            </Link>

            <Link 
              href="/for-agents" 
              onClick={closeMobileMenu}
              className="flex items-center justify-between text-xl font-serif text-emerald-400 hover:text-emerald-300 transition-colors pt-4 border-t border-white/10"
            >
              <span>Agent Partner Hub (1st Month Free)</span>
              <ArrowUpRight className="w-5 h-5 text-emerald-400" />
            </Link>
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10 my-4">
            <Link 
              href="/login" 
              onClick={closeMobileMenu}
              className="w-full border border-white/20 py-3.5 text-center block uppercase tracking-[0.2em] text-xs font-bold text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Sign In
            </Link>

            <Link 
              href="/register" 
              onClick={closeMobileMenu}
              className="w-full bg-white text-black py-4 text-center block uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-200 transition-colors"
            >
              Create Account
            </Link>

            <div className="text-center pt-3 text-[10px] uppercase tracking-widest text-gray-600">
              © {new Date().getFullYear()} NAIJASPACES. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
