"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, X, MapPin, Building, ShieldCheck, DollarSign } from "lucide-react";

import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ComparePage() {
  const [comparedProperties, setComparedProperties] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("naijaspaces_compare");
    if (stored) {
      try {
        setComparedProperties(JSON.parse(stored));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const removeFromCompare = (id: string) => {
    const updated = comparedProperties.filter(p => p.id !== id);
    setComparedProperties(updated);
    localStorage.setItem("naijaspaces_compare", JSON.stringify(updated));
  };

  const clearAll = () => {
    setComparedProperties([]);
    localStorage.removeItem("naijaspaces_compare");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      <div className="max-w-7xl w-full mx-auto px-6 pt-4">
        <Breadcrumbs items={[
          { label: "Properties", href: "/properties" },
          { label: "Property Comparison" }
        ]} />
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-500">Side-by-Side Analysis</span>
            <h1 className="text-4xl font-serif text-white mt-1">Property Comparison</h1>
          </div>
          {comparedProperties.length > 0 && (
            <button 
              onClick={clearAll}
              className="text-xs uppercase tracking-widest text-red-400 hover:text-red-300 border border-red-500/20 px-4 py-2"
            >
              Clear Comparison
            </button>
          )}
        </div>

        {comparedProperties.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-white/10 bg-[#111]">
            <Building className="w-12 h-12 mx-auto text-gray-600 mb-4" />
            <h2 className="text-2xl font-serif text-white mb-2">No Properties Selected for Comparison</h2>
            <p className="text-sm text-gray-400 mb-8 max-w-md mx-auto font-light">
              Browse our collection and click the "Compare" checkbox on properties you wish to compare side by side.
            </p>
            <Link 
              href="/properties" 
              className="bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors inline-block"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-white/10">
              <thead>
                <tr className="border-b border-white/10 bg-[#111]">
                  <th className="p-6 text-xs uppercase tracking-widest text-gray-500 w-48 shrink-0 font-medium">Feature</th>
                  {comparedProperties.map((prop) => (
                    <th key={prop.id} className="p-6 min-w-[280px] relative border-l border-white/10">
                      <button 
                        onClick={() => removeFromCompare(prop.id)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-white p-1"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="h-40 overflow-hidden mb-4 rounded border border-white/10 relative">
                        <img src={prop.imageUrl || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"} alt={prop.title} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="text-lg font-serif text-white line-clamp-1">{prop.title}</h3>
                      <Link href={`/properties/${prop.id}`} className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-white mt-1 inline-block">
                        View Details →
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                <tr>
                  <td className="p-6 text-xs uppercase tracking-widest text-gray-500 font-medium bg-[#111]/50">Price / Rent</td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-6 border-l border-white/10 font-medium text-white text-base">
                      ₦{(prop.price || 0).toLocaleString()}
                      <span className="text-xs font-normal text-gray-400"> / {prop.rentalPeriod?.toLowerCase()}</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 text-xs uppercase tracking-widest text-gray-500 font-medium bg-[#111]/50">Location</td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-6 border-l border-white/10 text-gray-300">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{prop.city}, {prop.state}</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 text-xs uppercase tracking-widest text-gray-500 font-medium bg-[#111]/50">Property Type</td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-6 border-l border-white/10 text-gray-300 uppercase tracking-wider text-xs">
                      {prop.type}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 text-xs uppercase tracking-widest text-gray-500 font-medium bg-[#111]/50">Verification</td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-6 border-l border-white/10">
                      {prop.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-green-400 text-xs uppercase tracking-wider font-semibold">
                          <CheckCircle2 className="w-4 h-4" /> Verified
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs uppercase tracking-wider">Unverified</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 text-xs uppercase tracking-widest text-gray-500 font-medium bg-[#111]/50">Listed By</td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-6 border-l border-white/10 text-gray-300">
                      {prop.agent?.name || "Verified Agent"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 text-xs uppercase tracking-widest text-gray-500 font-medium bg-[#111]/50">Action</td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-6 border-l border-white/10">
                      <Link 
                        href={`/checkout/${prop.id}`}
                        className="bg-white text-black text-center block w-full py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                      >
                        Rent Now
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
