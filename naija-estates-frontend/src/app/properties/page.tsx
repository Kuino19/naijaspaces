"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Search, MapPin, ArrowRight, Loader2, ChevronLeft, ChevronRight, CheckCircle2, Heart, Layers, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const MapComponent = dynamic(() => import("../../components/MapComponent"), { ssr: false });

export default function PropertiesPage() {
  const { lang, toggleLanguage, t } = useLanguage();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [category, setCategory] = useState<"all" | "residential" | "commercial">("all");
  const [rentalPeriod, setRentalPeriod] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [onlyVerified, setOnlyVerified] = useState(false);

  // Comparison & Favourites state
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [favouriteIds, setFavouriteIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    // Parse URL params
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.has("location")) setLocationQuery(params.get("location") || "");
      if (params.has("type")) {
        const type = params.get("type");
        if (type === "apartment" || type === "house") setCategory("residential");
        else if (type === "commercial" || type === "shop") setCategory("commercial");
        else setCategory("all");
      }
    }

    // Load compared IDs from localStorage
    const compareStored = localStorage.getItem("naijaspaces_compare");
    if (compareStored) {
      try {
        const list = JSON.parse(compareStored);
        setComparedIds(list.map((p: any) => p.id));
      } catch (e) {}
    }
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/properties");
      if (res.ok) {
        const data = await res.json();
        setProperties(data);
      }
    } catch (err) {
      console.error("Failed to load properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCompare = (prop: any) => {
    let list: any[] = [];
    const stored = localStorage.getItem("naijaspaces_compare");
    if (stored) {
      try { list = JSON.parse(stored); } catch (e) {}
    }

    if (comparedIds.includes(prop.id)) {
      list = list.filter(p => p.id !== prop.id);
      setComparedIds(comparedIds.filter(id => id !== prop.id));
    } else {
      if (list.length >= 4) {
        alert("You can compare up to 4 properties at a time.");
        return;
      }
      list.push(prop);
      setComparedIds([...comparedIds, prop.id]);
    }
    localStorage.setItem("naijaspaces_compare", JSON.stringify(list));
  };

  const toggleFavourite = async (propertyId: string) => {
    try {
      const res = await fetch("/api/favourites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.favourited) {
          setFavouriteIds([...favouriteIds, propertyId]);
        } else {
          setFavouriteIds(favouriteIds.filter(id => id !== propertyId));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProperties = properties.filter(prop => {
    // Category filter
    if (category === "residential" && !["HOUSE", "APARTMENT"].includes(prop.type)) return false;
    if (category === "commercial" && !["SHOP", "LAND"].includes(prop.type)) return false;
    
    // Rental Period filter
    if (rentalPeriod !== "all" && prop.rentalPeriod !== rentalPeriod) return false;

    // Location search
    if (locationQuery) {
      const loc = locationQuery.toLowerCase();
      const matchesLoc = prop.city?.toLowerCase().includes(loc) || prop.state?.toLowerCase().includes(loc) || prop.address?.toLowerCase().includes(loc);
      if (!matchesLoc) return false;
    }

    // General Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesSearch = prop.title?.toLowerCase().includes(q) || prop.description?.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    // Max Price filter
    if (maxPrice && parseFloat(maxPrice) > 0) {
      if (prop.price > parseFloat(maxPrice)) return false;
    }

    // Verified only filter
    if (onlyVerified && !prop.isVerified) return false;

    return true;
  });

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [category, rentalPeriod, locationQuery, searchQuery, maxPrice, onlyVerified]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col selection:bg-white selection:text-black">
      
      {/* Header */}
      <header className="w-full z-50 px-6 py-6 flex justify-between items-center border-b border-white/10 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md">
        <Link href="/" className="text-xl font-bold tracking-widest uppercase hover:opacity-50 transition-opacity">
          Naija<span className="font-light">Spaces</span>
        </Link>
        <div className="flex gap-4 md:gap-6 text-xs md:text-sm font-medium tracking-widest uppercase items-center">
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1 border border-white/20 rounded-full text-xs hover:bg-white/10 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-300 font-semibold">{lang === 'en' ? 'ENG' : 'PIDGIN'}</span>
          </button>

          <Link href="/dashboard/tenant" className="text-gray-400 hover:text-white transition-all hidden md:block text-xs">
            {t('tenantPortal')}
          </Link>
          <div className="h-4 w-px bg-white/20 hidden md:block"></div>
          <button 
            onClick={() => setViewMode('list')}
            className={`transition-all ${viewMode === 'list' ? 'border-b border-white pb-1' : 'text-gray-500 hover:text-white'}`}
          >
            Gallery
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={`transition-all ${viewMode === 'map' ? 'border-b border-white pb-1' : 'text-gray-500 hover:text-white'}`}
          >
            Map
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Filters */}
        <aside className="w-80 border-r border-white/10 p-8 overflow-y-auto hidden md:block shrink-0">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-8">Filter Portfolio</div>
          
          <div className="space-y-8">
            <div className="relative group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Search Keywords</label>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full text-sm font-light bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors placeholder:text-gray-700" 
              />
            </div>

            <div className="relative group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Location</label>
              <input 
                type="text" 
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Lekki, Ikoyi, Abuja..." 
                className="w-full text-sm font-light bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors placeholder:text-gray-700" 
              />
            </div>
            
            <div className="relative group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-sm font-light bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white cursor-pointer appearance-none">
                <option value="all" className="bg-[#0a0a0a] text-white">{t('allProperties')}</option>
                <option value="residential" className="bg-[#0a0a0a] text-white">{t('residential')}</option>
                <option value="commercial" className="bg-[#0a0a0a] text-white">{t('commercial')}</option>
              </select>
            </div>

            <div className="relative group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Rental Duration</label>
              <select 
                value={rentalPeriod}
                onChange={(e) => setRentalPeriod(e.target.value)}
                className="w-full text-sm font-light bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white cursor-pointer appearance-none">
                <option value="all" className="bg-[#0a0a0a] text-white">Any Duration</option>
                <option value="DAILY" className="bg-[#0a0a0a] text-white">Daily</option>
                <option value="WEEKLY" className="bg-[#0a0a0a] text-white">Weekly</option>
                <option value="MONTHLY" className="bg-[#0a0a0a] text-white">Monthly</option>
                <option value="YEARLY" className="bg-[#0a0a0a] text-white">Yearly</option>
              </select>
            </div>

            <div className="relative group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Max Price (₦)</label>
              <input 
                type="number" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="e.g. 50000000" 
                className="w-full text-sm font-light bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors placeholder:text-gray-700" 
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input 
                type="checkbox" 
                id="onlyVerified"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="accent-green-500 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="onlyVerified" className="text-xs uppercase tracking-widest text-gray-300 cursor-pointer">
                Verified Only
              </label>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="p-6 md:p-12">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <span className="text-xs uppercase tracking-widest text-gray-500">Portfolio</span>
                  <h1 className="text-4xl md:text-5xl font-serif mt-1">The Collection.</h1>
                </div>

                {comparedIds.length > 0 && (
                  <Link 
                    href="/compare"
                    className="bg-white text-black px-4 py-2 text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors"
                  >
                    <Layers className="w-4 h-4" /> Compare ({comparedIds.length}) →
                  </Link>
                )}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {loading ? (
                  <div className="col-span-full flex justify-center py-20 text-white/50">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                ) : filteredProperties.length === 0 ? (
                  <div className="col-span-full py-20 text-center text-gray-500 font-light">
                    No properties matched your filter criteria.
                  </div>
                ) : (
                  paginatedProperties.map((prop) => (
                    <div key={prop.id} className="group flex flex-col bg-[#111] border border-white/10 overflow-hidden">
                      <div className="relative h-[360px] overflow-hidden">
                        <Link href={`/properties/${prop.id}`} className="block w-full h-full">
                          <img 
                            src={prop.imageUrl || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"} 
                            alt={prop.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.2s] grayscale-[20%]" 
                          />
                        </Link>

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                          {prop.isVerified ? (
                            <span className="bg-black/80 backdrop-blur-md text-green-400 text-[10px] uppercase tracking-widest px-3 py-1 border border-green-500/30 flex items-center gap-1 pointer-events-auto">
                              <CheckCircle2 className="w-3 h-3" /> {t('verified')}
                            </span>
                          ) : <div />}

                          <div className="flex items-center gap-2 pointer-events-auto">
                            <button 
                              onClick={() => toggleFavourite(prop.id)}
                              className={`p-2 rounded-full backdrop-blur-md border transition-colors ${
                                favouriteIds.includes(prop.id) ? "bg-red-500/20 border-red-500 text-red-400" : "bg-black/60 border-white/20 text-white hover:bg-white/20"
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${favouriteIds.includes(prop.id) ? 'fill-current' : ''}`} />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <Link href={`/properties/${prop.id}`}>
                              <h3 className="text-2xl font-serif text-white hover:text-gray-300 transition-colors line-clamp-1">{prop.title}</h3>
                            </Link>
                          </div>
                          <div className="text-xs uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-1">
                            <MapPin className="w-3 h-3 shrink-0" /> {prop.city}, {prop.state}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-auto">
                          <div className="text-xl font-light text-white">
                            ₦{(prop.price || 0).toLocaleString()} 
                            <span className="text-xs text-gray-400"> / {prop.rentalPeriod?.toLowerCase()}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleCompare(prop)}
                              className={`text-[10px] uppercase tracking-widest px-2.5 py-1 border transition-colors ${
                                comparedIds.includes(prop.id) ? "bg-white text-black border-white font-bold" : "border-white/20 text-gray-400 hover:text-white"
                              }`}
                            >
                              {comparedIds.includes(prop.id) ? "Compared ✓" : t('compare')}
                            </button>
                            <Link href={`/properties/${prop.id}`} className="text-xs uppercase tracking-widest text-white hover:text-gray-300 font-medium">
                              Details →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              {!loading && totalPages > 1 && (
                <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-gray-300 disabled:opacity-30"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <div className="text-xs tracking-[0.3em] font-light text-gray-400">
                    {currentPage} / {totalPages}
                  </div>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-gray-300 disabled:opacity-30"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="w-full text-center py-8 text-[10px] uppercase tracking-widest text-gray-500 border-t border-white/5">
            <span>© {new Date().getFullYear()} NAIJASPACES.</span>
            <span className="mx-3">|</span>
            <span>
              MADE BY <a href="https://www.goanitech.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">GOANITECH</a>
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}
