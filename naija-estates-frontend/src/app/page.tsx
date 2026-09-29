"use client";

import Link from "next/link";
import { Search, ArrowRight, Play, Building, ChevronDown, MapPin } from "lucide-react";
import { motion } from "framer-motion";

// --- Fast & Realistic Hero Image ---
function RealisticVillaEmbed() {
  return (
    <div className="absolute inset-0 overflow-hidden w-full h-full">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613490908578-75c4d6276166?q=80&w=2560&auto=format&fit=crop')] bg-cover bg-center"
        style={{
          animation: 'kenburns 20s ease-out infinite alternate'
        }}
      />
      {/* CSS animation inline for simplicity */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}} />
    </div>
  );
}


// --- Main Page ---
export default function PristinePremiumHomePage() {
  
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden selection:bg-white selection:text-black">
      {/* Subtle film grain overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }}></div>
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-[#0a0a0a]/60 backdrop-blur-lg border-b border-white/5"
      >
        <div className="text-xl font-bold tracking-widest uppercase flex items-center gap-2">
          <Building className="h-5 w-5" />
          <span>Naija<span className="font-light">Spaces</span></span>
        </div>
        <nav className="hidden md:flex gap-12 text-sm font-medium tracking-widest uppercase">
          <Link href="/properties" className="hover:opacity-50 transition-opacity">Residences</Link>
          <Link href="/properties" className="hover:opacity-50 transition-opacity">Estates</Link>
          <Link href="/about" className="hover:opacity-50 transition-opacity">The Agency</Link>
        </nav>
        <div className="flex gap-6 text-sm font-medium tracking-widest uppercase items-center">
          <button className="hover:opacity-50 transition-opacity hidden md:block">Sign In</button>
          <button className="border border-white/20 px-5 py-2 hover:bg-white hover:text-black transition-all duration-300">List Property</button>
        </div>
      </motion.header>

      <main>
        {/* ===== HERO SECTION ===== */}
        <section className="relative h-screen w-full flex flex-col justify-end pb-20 px-6 md:px-20 pt-32">
          
          {/* Photorealistic 3D Model */}
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

          {/* Hero Text */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-xl pointer-events-none"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-serif leading-[0.9] tracking-tighter mb-8">
              <motion.span variants={fadeUp} className="block text-gray-300 font-sans text-xs md:text-sm tracking-[0.3em] uppercase mb-6 ml-2">Defining Luxury</motion.span>
              <motion.span variants={fadeUp} className="block">The Art Of</motion.span>
              <motion.span variants={fadeUp} className="block italic font-light text-gray-400">Living.</motion.span>
            </h1>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-end mt-12 md:mt-24">
              <motion.p variants={fadeUp} className="text-gray-300 max-w-md text-base md:text-lg font-light leading-relaxed">
                Curating Nigeria's most exceptional architectural masterpieces. An exclusive portfolio of penthouses, mansions, and estates.
              </motion.p>
              
              <motion.div variants={fadeUp} className="pointer-events-auto">
                <Link href="/properties" className="group flex items-center gap-4 md:gap-6 pb-4 border-b border-white/30 hover:border-white transition-colors cursor-pointer">
                  <span className="uppercase tracking-[0.2em] text-xs md:text-sm">Explore Portfolio</span>
                  <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Trust Stats + Interactive Model Badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-6 md:left-20 right-6 md:right-20 z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pointer-events-none"
          >
            <div className="flex gap-8 text-white/50 text-xs uppercase tracking-widest">
              <div><span className="text-white text-lg font-semibold mr-1">5,000+</span> Listings</div>
              <div className="hidden md:block w-px h-5 bg-white/20"></div>
              <div className="hidden md:block"><span className="text-white text-lg font-semibold mr-1">100%</span> Verified</div>
              <div className="hidden md:block w-px h-5 bg-white/20"></div>
              <div className="hidden md:block"><span className="text-white text-lg font-semibold mr-1">24/7</span> Support</div>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 bg-white/5 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Experience Premium Living
            </div>
          </motion.div>

          {/* Scroll Indicator */}
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

        {/* ===== SEARCH SECTION ===== */}
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
                  placeholder="Lekki, Ikoyi, Maitama..." 
                  className="w-full text-2xl md:text-4xl font-light bg-transparent border-b border-black/20 pb-4 focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
                />
              </div>
              <div className="relative group">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Property Type</label>
                <select className="w-full text-xl md:text-2xl font-light bg-transparent border-b border-black/20 pb-5 focus:outline-none focus:border-black transition-colors cursor-pointer appearance-none">
                  <option value="">All Residences</option>
                  <option value="apartment">Penthouses</option>
                  <option value="house">Villas & Estates</option>
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

        {/* ===== FEATURED RESIDENCES ===== */}
        <section className="py-24 md:py-32 px-6 md:px-20 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6"
            >
              <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-serif text-white leading-none">
                Featured <br/> <span className="italic text-gray-500 font-light">Residences.</span>
              </motion.h2>
              <motion.div variants={fadeUp}>
                <Link href="/properties" className="flex items-center gap-4 uppercase tracking-[0.2em] text-xs hover:text-gray-300 transition-colors border-b border-white/50 pb-2 hover:border-white">
                  View Full Gallery <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Large Hero Property */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:col-span-7 group cursor-pointer"
              >
                <Link href="/properties/1" className="block">
                  <div className="relative aspect-[4/5] overflow-hidden mb-8 bg-[#111]">
                    <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-90 group-hover:opacity-100" alt="Banana Island Mansion" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-500"></div>
                    {/* Hover reveal arrow */}
                    <div className="absolute bottom-8 right-8 w-14 h-14 bg-white rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-lg">
                      <ArrowRight className="h-5 w-5 -rotate-45" />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gray-400 mb-3">
                        <MapPin className="h-3.5 w-3.5" /> Banana Island, Ikoyi
                      </div>
                      <h3 className="text-3xl md:text-4xl font-serif">The Genesis Mansion</h3>
                    </div>
                    <div className="text-xl md:text-2xl font-light text-gray-300">₦150,000,000 / yr</div>
                  </div>
                </Link>
              </motion.div>

              {/* Stacked properties */}
              <div className="md:col-span-5 flex flex-col gap-20 lg:mt-24">
                {[
                  { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", title: "Oceanview Penthouse", loc: "Eko Atlantic City", price: "₦45,000,000 / year" },
                  { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", title: "The Glass Villa", loc: "Maitama, Abuja", price: "₦85,000,000 / year" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.15 }}
                    className="group cursor-pointer"
                  >
                    <Link href={`/properties/${i + 2}`} className="block">
                      <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-[#111]">
                        <img src={item.img} className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-90 group-hover:opacity-100" alt={item.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gray-400 mb-3">
                          <MapPin className="h-3.5 w-3.5" /> {item.loc}
                        </div>
                        <h3 className="text-2xl font-serif mb-2">{item.title}</h3>
                        <div className="text-gray-300 font-light text-lg">{item.price}</div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== VIDEO / LIFESTYLE ===== */}
        <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden border-y border-white/10">
          <motion.img 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            src="https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40 grayscale" alt="Lifestyle" 
          />
          <div className="absolute inset-0 bg-black/50"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center flex flex-col items-center px-4"
          >
            <button className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/50 backdrop-blur-md flex items-center justify-center mb-8 hover:bg-white hover:text-black transition-colors duration-300 group">
              <Play className="h-6 w-6 md:h-8 md:w-8 ml-2 group-hover:scale-110 transition-transform" />
            </button>
            <h2 className="text-3xl md:text-6xl font-serif mb-6 text-white">Experience the Extraordinary.</h2>
            <p className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs text-gray-300">Watch the NaijaEstates Film</p>
          </motion.div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="bg-gradient-to-b from-[#0a0a0a] to-[#050505] text-white pt-24 pb-12 px-6 md:px-20">
          {/* CTA Block */}
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-28">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 max-w-2xl leading-tight">
              Ready to acquire your next masterpiece?
            </h2>
            <Link href="/properties" className="border border-white/30 bg-transparent text-white px-12 py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-white hover:text-black transition-all duration-300">
              Enter The Collection
            </Link>
          </div>

          {/* Footer Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-16 mb-16">
            <div className="md:col-span-2">
              <div className="text-xl font-bold tracking-widest uppercase flex items-center gap-2 mb-6">
                <Building className="h-5 w-5" />
                <span>Naija<span className="font-light">Estates</span></span>
              </div>
              <p className="text-gray-400 font-light max-w-sm leading-relaxed">
                Nigeria's premier private real estate agency, curating the most exceptional homes and estates for the world's most discerning clientele.
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
              <h4 className="uppercase tracking-widest text-xs font-bold mb-6 text-white">Connect</h4>
              <div className="flex gap-6 mb-8">
                <a href="#" className="text-gray-400 hover:text-white transition-colors font-bold text-sm tracking-widest">IG</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors font-bold text-sm tracking-widest">TW</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors font-bold text-sm tracking-widest">IN</a>
              </div>
              <a href="mailto:contact@naijaestates.com" className="text-sm font-light text-gray-400 hover:text-white transition-colors border-b border-gray-600 pb-1 hover:border-white">
                contact@naijaestates.com
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-600 border-t border-white/5 pt-8">
            <div>© 2026 NAIJAESTATES. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-8 mt-4 md:mt-0">
              <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
