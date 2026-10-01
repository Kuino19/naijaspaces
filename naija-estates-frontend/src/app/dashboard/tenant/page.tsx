"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, CreditCard, Building, Loader2, MapPin, CheckCircle2 } from "lucide-react";

export default function TenantDashboardPage() {
  const [favourites, setFavourites] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"favourites" | "history">("favourites");

  useEffect(() => {
    fetchTenantData();
  }, []);

  const fetchTenantData = async () => {
    setLoading(true);
    try {
      const favRes = await fetch("/api/favourites");
      if (favRes.ok) {
        const favs = await favRes.json();
        setFavourites(favs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFavourite = async (propertyId: string) => {
    try {
      const res = await fetch("/api/favourites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId })
      });
      if (res.ok) {
        setFavourites(prev => prev.filter(f => f.propertyId !== propertyId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col selection:bg-white selection:text-black">
      {/* Navigation Header */}
      <header className="w-full z-50 px-6 py-8 flex justify-between items-center border-b border-white/10">
        <Link href="/" className="text-xl font-bold tracking-widest uppercase hover:opacity-50 transition-opacity">
          Naija<span className="font-light">Spaces</span>
        </Link>
        <Link href="/properties" className="flex items-center gap-2 text-xs tracking-widest uppercase hover:opacity-50 transition-opacity">
          <ArrowLeft className="h-4 w-4" /> Explore Properties
        </Link>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-500">Tenant Account</span>
            <h1 className="text-4xl font-serif text-white mt-1">My Dashboard</h1>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-8 border-b border-white/10 mb-12">
          <button 
            onClick={() => setActiveTab("favourites")}
            className={`pb-4 text-xs uppercase tracking-widest font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === "favourites" ? "border-white text-white" : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            <Heart className="w-4 h-4" /> Saved Properties ({favourites.length})
          </button>
          <button 
            onClick={() => setActiveTab("history")}
            className={`pb-4 text-xs uppercase tracking-widest font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === "history" ? "border-white text-white" : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            <CreditCard className="w-4 h-4" /> Payment & Rental History
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "favourites" && (
          <div>
            {favourites.length === 0 ? (
              <div className="py-20 text-center bg-[#111] border border-white/10 p-12">
                <Heart className="w-10 h-10 text-gray-600 mx-auto mb-4" />
                <h2 className="text-2xl font-serif text-white mb-2">No Saved Properties Yet</h2>
                <p className="text-sm text-gray-400 mb-8 font-light">
                  Click the heart icon on any property card to save it to your personal shortlist.
                </p>
                <Link href="/properties" className="bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors inline-block">
                  Explore Collection
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favourites.map(({ property }) => (
                  <div key={property.id} className="group border border-white/10 bg-[#111] flex flex-col overflow-hidden">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={property.imageUrl || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"} 
                        alt={property.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale-[20%]" 
                      />
                      <button 
                        onClick={() => removeFavourite(property.id)}
                        className="absolute top-4 right-4 bg-black/80 text-red-400 p-2 rounded-full border border-red-500/30 hover:bg-red-500 hover:text-white transition-colors"
                        title="Remove from saved"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                      {property.isVerified && (
                        <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-green-400 text-[10px] uppercase tracking-widest px-3 py-1 border border-green-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-serif text-white mb-2">{property.title}</h3>
                        <div className="flex items-center gap-1 text-xs uppercase tracking-widest text-gray-400 mb-4">
                          <MapPin className="w-3.5 h-3.5" /> {property.city}, {property.state}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-4">
                        <div className="text-lg font-light text-white">
                          ₦{(property.price || 0).toLocaleString()}
                          <span className="text-xs text-gray-400"> / {property.rentalPeriod?.toLowerCase()}</span>
                        </div>
                        <Link 
                          href={`/checkout/${property.id}`}
                          className="bg-white text-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                        >
                          Rent Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="bg-[#111] border border-white/10 p-12 text-center py-20">
            <CreditCard className="w-10 h-10 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-white mb-2">No Transactions Yet</h2>
            <p className="text-sm text-gray-400 max-w-md mx-auto font-light">
              When you complete a rental payment, your receipt and property access details will appear here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
