"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Search, MapPin, Filter, ArrowRight, List, Map as MapIcon, Loader2 } from "lucide-react";

const MapComponent = dynamic(() => import("../../components/MapComponent"), { ssr: false });

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<"all" | "residential" | "commercial">("all");

  const filteredProperties = properties.filter(prop => {
    if (category === "residential") return ["HOUSE", "APARTMENT"].includes(prop.type);
    if (category === "commercial") return ["SHOP", "LAND"].includes(prop.type);
    return true;
  });

  useEffect(() => {
    fetch("/api/properties")
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load properties:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col selection:bg-white selection:text-black">
      
      {/* Ultra-Clean Header */}
      <header className="w-full z-50 px-6 py-8 flex justify-between items-center border-b border-white/10 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md">
        <Link href="/" className="text-xl font-bold tracking-widest uppercase hover:opacity-50 transition-opacity">
          Naija<span className="font-light">Spaces</span>
        </Link>
        <div className="flex gap-6 text-sm font-medium tracking-widest uppercase items-center">
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
        
        {/* Minimalist Sidebar Filters */}
        <aside className="w-80 border-r border-white/10 p-10 overflow-y-auto hidden md:block">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-12">Filter Portfolio</div>
          
          <div className="space-y-12">
            <div className="relative group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Location</label>
              <input type="text" placeholder="Lekki, Ikoyi..." className="w-full text-xl font-light bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors placeholder:text-gray-700" />
            </div>
            
            <div className="relative group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xl font-light bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors cursor-pointer appearance-none">
                <option value="all" className="bg-[#0a0a0a] text-white">All Properties</option>
                <option value="residential" className="bg-[#0a0a0a] text-white">Houses & Apartments</option>
                <option value="commercial" className="bg-[#0a0a0a] text-white">Shops & Commercial</option>
              </select>
            </div>

            <div className="relative group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Minimum Price (₦)</label>
              <input type="text" placeholder="e.g. 10,000,000" className="w-full text-xl font-light bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors placeholder:text-gray-700" />
            </div>

            <button className="w-full border border-white text-white py-4 uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-colors mt-8">
              Update Results
            </button>
          </div>
        </aside>

        {/* Properties Area */}
        <div className="flex-1 overflow-y-auto">
          {viewMode === "list" ? (
            <div className="p-6 md:p-16">
              <h1 className="text-4xl md:text-5xl font-serif mb-16">The Collection.</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-20">
                {loading ? (
                  <div className="col-span-full flex justify-center py-20 text-white/50">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                ) : (
                  filteredProperties.map((prop) => (
                    <div key={prop.id} className="group cursor-pointer flex flex-col">
                      <Link href={`/properties/${prop.id}`} className="block relative h-[450px] overflow-hidden mb-6">
                        <img src={prop.imageUrl || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"} alt={prop.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out grayscale-[20%]" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                      </Link>
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-3xl font-serif text-white">{prop.title}</h3>
                        </div>
                        <div className="text-sm uppercase tracking-[0.15em] text-gray-300 mb-6 font-medium">{prop.city}, {prop.state}</div>
                        
                        <div className="flex justify-between items-end mt-auto pt-6 border-t border-white/20">
                          <div className="text-2xl font-light text-white">₦{(prop.price || 0).toLocaleString()} <span className="text-sm text-gray-400">/ {prop.rentalPeriod === 'DAILY' ? 'day' : prop.rentalPeriod === 'WEEKLY' ? 'week' : prop.rentalPeriod === 'MONTHLY' ? 'mo' : 'yr'}</span></div>
                          <Link href={`/properties/${prop.id}`} className="flex items-center gap-2 text-sm uppercase tracking-widest text-white hover:text-gray-300 transition-colors">
                            Details <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="h-full relative z-0">
               <div className="w-full h-full opacity-90 filter invert-[90%] hue-rotate-180 contrast-125">
                 <MapComponent properties={filteredProperties} />
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
