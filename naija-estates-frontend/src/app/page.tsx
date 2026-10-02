"use client";

import Link from "next/link";
import { Search, ArrowRight, Play, Building, ChevronDown, MapPin, CheckCircle2, Globe, Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import Navbar from "@/components/Navbar";

function RealisticVillaEmbed() {
  return (
    <div className="absolute inset-0 overflow-hidden w-full h-full">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613490908578-75c4d6276166?q=80&w=2560&auto=format&fit=crop')] bg-cover bg-center"
        style={{
          animation: 'kenburns 20s ease-out infinite alternate'
        }}
      />
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}} />
    </div>
  );
}

export default function PristinePremiumHomePage() {
  const { lang, toggleLanguage, t } = useLanguage();

  const fadeUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const testimonials = [
    {
      quote: "NaijaSpaces made finding my duplex in Lekki Phase 1 seamless. The verified badge gave me confidence before paying.",
      name: "Chief Emeka Orogun",
      role: "Property Investor, Lagos",
      rating: 5,
    },
    {
      quote: "No long story! I got my short-let apartment in Maitama within 24 hours. The WhatsApp direct link to the verified agent saved me time.",
      name: "Dr. Amina Bello",
      role: "Medical Consultant, Abuja",
      rating: 5,
    },
    {
      quote: "As a licensed real estate agent in Port Harcourt, listing on NaijaSpaces doubled my client inquiries in 30 days.",
      name: "Tunde Bakare",
      role: "Lead Agent, Apex Realty",
      rating: 5,
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden selection:bg-white selection:text-black">
      {/* Subtle film grain overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }}></div>
      
      {/* Navbar */}
      <Navbar />

      <main>
        {/* ===== HERO SECTION ===== */}
        <section className="relative h-screen w-full flex flex-col justify-end pb-20 px-6 md:px-20 pt-32">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-0 right-0 w-full md:w-[60%] h-full z-[2]"
          >
            <RealisticVillaEmbed />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 md:via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none"></div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-xl pointer-events-none"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] font-serif leading-[0.9] tracking-tighter mb-8">
              <motion.span variants={fadeUp} className="block text-gray-300 font-sans text-xs md:text-sm tracking-[0.3em] uppercase mb-6 ml-2">Defining Luxury</motion.span>
              <motion.span variants={fadeUp} className="block">{t('heroTitle')}</motion.span>
            </h1>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-end mt-12 md:mt-20">
              <motion.p variants={fadeUp} className="text-gray-300 max-w-md text-base md:text-lg font-light leading-relaxed">
                {t('heroSubtitle')} Discover verified homes, penthouses, commercial shops, and short-term rentals.
              </motion.p>
              
              <motion.div variants={fadeUp} className="pointer-events-auto">
                <Link href="/properties" className="group flex items-center gap-4 md:gap-6 pb-4 border-b border-white/30 hover:border-white transition-colors cursor-pointer">
                  <span className="uppercase tracking-[0.2em] text-xs md:text-sm">{t('exploreBtn')}</span>
                  <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Trust Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-6 md:left-20 right-6 md:right-20 z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pointer-events-none"
          >
            <div className="flex gap-8 text-white/50 text-xs uppercase tracking-widest">
              <div><span className="text-white text-lg font-semibold mr-1">5,000+</span> Listings</div>
              <div className="hidden md:block w-px h-5 bg-white/20"></div>
              <div className="hidden md:block"><span className="text-white text-lg font-semibold mr-1">100%</span> Verified Agents</div>
              <div className="hidden md:block w-px h-5 bg-white/20"></div>
              <div className="hidden md:block"><span className="text-white text-lg font-semibold mr-1">24/7</span> Instant Support</div>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 bg-white/5 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Verified Nigerian Real Estate
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
          >
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
              <ChevronDown className="h-5 w-5 text-white/30" />
            </motion.div>
          </motion.div>
        </section>

        {/* ===== SEARCH & DISCOVER ===== */}
        <section className="bg-white text-black py-24 md:py-32 px-6 md:px-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif mb-12 md:mb-16 max-w-2xl leading-tight">
              Begin your journey to exceptional real estate.
            </motion.h2>
            
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-black/10 pt-12">
              <div className="md:col-span-2 relative group">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Location</label>
                <input 
                  type="text" 
                  placeholder="Lekki, Ikoyi, Maitama, Port Harcourt..." 
                  className="w-full text-2xl md:text-3xl font-light bg-transparent border-b border-black/20 pb-4 focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
                />
              </div>
              <div className="relative group">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Property Type</label>
                <select className="w-full text-xl font-light bg-transparent border-b border-black/20 pb-5 focus:outline-none focus:border-black transition-colors cursor-pointer appearance-none">
                  <option value="">All Properties</option>
                  <option value="apartment">Houses & Apartments</option>
                  <option value="commercial">Shops & Commercial</option>
                  <option value="land">Plots of Land</option>
                </select>
              </div>
              <div className="flex items-end justify-end mt-4 md:mt-0">
                <Link href="/properties" className="w-full md:w-auto bg-black text-white px-12 py-5 uppercase tracking-[0.2em] text-xs hover:bg-gray-800 transition-colors flex items-center justify-center gap-3">
                  <Search className="h-4 w-4" /> Discover
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ===== TESTIMONIALS & SOCIAL PROOF (FEATURE #14) ===== */}
        <section className="py-24 md:py-32 px-6 md:px-20 bg-[#111] border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400">{t('testimonialsTitle')}</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mt-2">Trusted by Buyers, Tenants & Top Agents</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((tItem, idx) => (
                <div key={idx} className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 text-amber-400 mb-6">
                      {[...Array(tItem.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 font-light text-base leading-relaxed mb-8 italic">
                      "{tItem.quote}"
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="font-serif text-lg text-white">{tItem.name}</div>
                    <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">{tItem.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="bg-gradient-to-b from-[#0a0a0a] to-[#050505] text-white pt-24 pb-12 px-6 md:px-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-28">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 max-w-2xl leading-tight">
              Ready to acquire your next crib?
            </h2>
            <Link href="/properties" className="border border-white/30 bg-transparent text-white px-12 py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-white hover:text-black transition-all duration-300">
              Enter The Collection
            </Link>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-16 mb-16">
            <div className="md:col-span-2">
              <div className="text-xl font-bold tracking-widest uppercase flex items-center gap-2 mb-6">
                <Building className="h-5 w-5" />
                <span>Naija<span className="font-light">Spaces</span></span>
              </div>
              <p className="text-gray-400 font-light max-w-sm leading-relaxed">
                Nigeria's premier private real estate platform, curating verified homes, shops, and short-term rentals for discerning clientele.
              </p>
            </div>
            
            <div>
              <h4 className="uppercase tracking-widest text-xs font-bold mb-6 text-white">Offices</h4>
              <ul className="space-y-4 text-gray-400 font-light text-sm">
                <li>Victoria Island, Lagos</li>
                <li>Maitama, Abuja</li>
                <li>Trans Amadi, Port Harcourt</li>
              </ul>
            </div>
            
            <div>
              <h4 className="uppercase tracking-widest text-xs font-bold mb-6 text-white">Navigation</h4>
              <div className="flex flex-col space-y-3 text-sm text-gray-400">
                <Link href="/properties" className="hover:text-white">Properties</Link>
                <Link href="/compare" className="hover:text-white">Compare Properties</Link>
                <Link href="/dashboard/tenant" className="hover:text-white">Tenant Dashboard</Link>
                <Link href="/admin" className="hover:text-white">Admin Dashboard</Link>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-600 border-t border-white/5 pt-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <span>© {new Date().getFullYear()} NAIJASPACES. ALL RIGHTS RESERVED.</span>
              <span className="hidden md:inline">|</span>
              <span>
                MADE BY <a href="https://www.goanitech.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline transition-all">GOANITECH</a>
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
