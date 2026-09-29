"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function PropertyDetailsPage() {
  const params = useParams();
  const { id } = params;
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/properties/${id}`)
      .then(res => res.json())
      .then(data => {
        setProperty(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch property:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  if (!property || property.error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white gap-4">
        <h1 className="text-3xl font-serif">Property not found</h1>
        <Link href="/properties" className="text-gray-400 hover:text-white underline uppercase text-xs tracking-widest">
          Return to portfolio
        </Link>
      </div>
    );
  }

  const periodStr = property.rentalPeriod === 'DAILY' ? 'day' : property.rentalPeriod === 'WEEKLY' ? 'wk' : property.rentalPeriod === 'MONTHLY' ? 'mo' : 'yr';
  const priceStr = `₦${(property.price || 0).toLocaleString()} / ${periodStr}`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      
      {/* Header */}
      <header className="w-full z-50 px-6 py-8 flex justify-between items-center border-b border-white/10">
        <Link href="/" className="text-xl font-bold tracking-widest uppercase hover:opacity-50 transition-opacity">
          Naija<span className="font-light">Spaces</span>
        </Link>
        <Link href="/properties" className="flex items-center gap-3 text-xs tracking-widest uppercase hover:opacity-50 transition-opacity border-b border-white/30 pb-1">
          <ArrowLeft className="h-4 w-4" /> Return to Portfolio
        </Link>
      </header>

      <main className="w-full">
        {/* Full Bleed Image Header */}
        <div className="w-full h-[70vh] relative">
          <img src={property.imageUrl || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80"} alt={property.title} className="w-full h-full object-cover grayscale-[10%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-6 -mt-32 relative z-10 pb-32">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">{property.address}, {property.city}</div>
              <h1 className="text-5xl md:text-7xl font-serif leading-none">{property.title}</h1>
            </div>
            <div className="text-right">
              <div className="text-sm uppercase tracking-widest text-gray-400 mb-2">Asking Rent</div>
              <div className="text-4xl md:text-5xl font-light">{priceStr}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left: Description */}
            <div className="lg:col-span-8">
              
              <div className="flex gap-12 border-y border-white/10 py-8 mb-12 text-sm uppercase tracking-widest">
                <div>
                  <span className="block text-gray-500 mb-1">Type</span>
                  <span>{property.type}</span>
                </div>
                {property.type !== 'SHOP' && property.type !== 'OFFICE' && property.type !== 'LAND' && (
                  <>
                    {property.bedrooms && (
                      <div>
                        <span className="block text-gray-500 mb-1">Bedrooms</span>
                        <span>{property.bedrooms}</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div>
                        <span className="block text-gray-500 mb-1">Bathrooms</span>
                        <span>{property.bathrooms}</span>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="mb-16">
                <h2 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-8">The Narrative</h2>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-300">
                  {property.description}
                </p>
              </div>

            </div>

            {/* Right: Action & Agent */}
            <div className="lg:col-span-4">
              <div className="bg-[#111] border border-white/10 p-8">
                <h3 className="text-2xl font-serif mb-8">Acquisition</h3>
                
                <div className="space-y-4 mb-12 text-sm font-light text-gray-400">
                  <div className="flex justify-between border-b border-white/10 pb-4">
                    <span>Base Rent</span>
                    <span className="text-white">{priceStr}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-4">
                    <span>Agency Premium</span>
                    <span className="text-white">5%</span>
                  </div>
                </div>

                <Link href={`/checkout/${property.id}`} className="w-full bg-white text-black py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-200 transition-colors flex justify-center items-center gap-3">
                  Initiate Checkout <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                  <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Listed By</div>
                  <div className="text-sm">{property.agent?.name || 'NaijaSpaces Private Office'}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
