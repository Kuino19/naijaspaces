"use client";

import { useState } from "react";
import Link from "next/link";
import { Building, Menu, X, ShieldCheck, LogIn, Zap, ArrowUpRight } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";

export default function AgentNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="w-full z-50 px-4 md:px-6 py-4 md:py-5 flex justify-between items-center bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 sticky top-0">
        <div className="flex items-center gap-4">
          <Link href="/for-agents" onClick={closeMobileMenu} className="text-xl font-bold tracking-widest uppercase flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Building className="h-5 w-5 text-emerald-400" />
            <span>Naija<span className="font-light">Spaces</span></span>
            <span className="hidden md:inline-block text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded uppercase tracking-widest font-bold ml-1">
              Agent Partner
            </span>
          </Link>
        </div>

        {/* Dedicated Desktop Agent Navigation */}
        <nav className="hidden lg:flex gap-6 text-[11px] font-semibold tracking-[0.15em] uppercase items-center text-gray-400">
          <Link href="/for-agents#features" className="hover:text-emerald-400 transition-colors">Features</Link>
          <Link href="/for-agents#pricing" className="hover:text-emerald-400 transition-colors">Pricing</Link>
          <Link href="/dashboard" className="text-emerald-400 hover:text-emerald-300 transition-colors border border-emerald-500/30 px-3 py-1 rounded">Dashboard</Link>
        </nav>

        {/* Action Controls for Agents */}
        <div className="flex gap-2 md:gap-4 text-xs font-medium tracking-widest uppercase items-center">
          <LanguageSelector />

          <Link href="/login" className="hover:text-gray-300 transition-colors hidden sm:block text-gray-300">
            Agent Sign In
          </Link>

          <Link 
            href="/register/agent" 
            className="bg-white text-black font-bold px-4 py-2 hover:bg-emerald-400 hover:text-black transition-all duration-300 hidden md:flex items-center gap-1.5 text-[11px]"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" /> Claim Free Month
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-1 md:p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle agent menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu for Agents */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col justify-between p-8 pt-24 animate-in fade-in duration-200 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">
                Agent Partner Navigation
              </span>
              <LanguageSelector />
            </div>

            <Link 
              href="/for-agents#features" 
              onClick={closeMobileMenu}
              className="block text-2xl font-serif text-white hover:text-emerald-400 transition-colors"
            >
              Why Partner With Us
            </Link>

            <Link 
              href="/for-agents#pricing" 
              onClick={closeMobileMenu}
              className="block text-xl font-serif text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Pricing (₦1,500/mo & 5% Sales Cut)
            </Link>

            <Link 
              href="/for-agents#how-it-works" 
              onClick={closeMobileMenu}
              className="block text-xl font-serif text-gray-300 hover:text-white transition-colors"
            >
              How It Works & Traffic Setup
            </Link>

            <Link 
              href="/dashboard" 
              onClick={closeMobileMenu}
              className="flex items-center justify-between text-xl font-serif text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>Agent Command Center</span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </Link>

            <Link 
              href="/" 
              onClick={closeMobileMenu}
              className="flex items-center justify-between text-lg font-serif text-gray-400 hover:text-white transition-colors pt-2 border-t border-white/10"
            >
              <span>Switch to Tenant / Buyer Site</span>
              <ArrowUpRight className="w-4 h-4 text-gray-500" />
            </Link>
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10 my-4">
            <Link 
              href="/login" 
              onClick={closeMobileMenu}
              className="w-full border border-white/20 py-3.5 text-center block uppercase tracking-[0.2em] text-xs font-bold text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Agent Sign In
            </Link>

            <Link 
              href="/register/agent" 
              onClick={closeMobileMenu}
              className="w-full bg-emerald-500 text-black py-4 text-center block uppercase tracking-[0.2em] text-xs font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-black" /> Claim 1st Month Free & Register
            </Link>

            <div className="text-center pt-3 text-[10px] uppercase tracking-widest text-gray-600">
              © {new Date().getFullYear()} NAIJASPACES AGENT PARTNERSHIP.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
