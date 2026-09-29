"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Star, ArrowRight } from "lucide-react";

export default function PropertyDetailsPage() {
  const params = useParams();
  const { id } = params;

  const property = {
    id,
    title: 'The Genesis Mansion',
    price: '₦150,000,000',
    location: 'Banana Island, Ikoyi',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80',
    beds: 6, 
    baths: 7, 
    type: 'Villa',
    description: 'An unparalleled architectural masterpiece situated in the most exclusive enclave of Banana Island. The Genesis Mansion redefines luxury with its soaring double-height ceilings, Italian marble flooring, and panoramic views. Features include a private cinema, infinity pool, smart-home automation, and a state-of-the-art chef\'s kitchen. Designed for those who demand the absolute finest in life.',
    rating: 5.0,
    reviews: [
      { id: 1, user: 'A. O.', rating: 5, comment: 'Breathtaking architecture and flawless execution. A true statement property.', date: 'Oct 15, 2026' },
    ],
    agent: {
      name: 'NaijaSpaces Private Office',
    }
  };

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
          <img src={property.image} alt={property.title} className="w-full h-full object-cover grayscale-[10%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-6 -mt-32 relative z-10 pb-32">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">{property.location}</div>
              <h1 className="text-5xl md:text-7xl font-serif leading-none">{property.title}</h1>
            </div>
            <div className="text-right">
              <div className="text-sm uppercase tracking-widest text-gray-400 mb-2">Asking Price</div>
              <div className="text-4xl md:text-5xl font-light">{property.price}</div>
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
                <div>
                  <span className="block text-gray-500 mb-1">Bedrooms</span>
                  <span>{property.beds}</span>
                </div>
                <div>
                  <span className="block text-gray-500 mb-1">Bathrooms</span>
                  <span>{property.baths}</span>
                </div>
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
                    <span>Base Price</span>
                    <span className="text-white">{property.price}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-4">
                    <span>Agency Premium</span>
                    <span className="text-white">5%</span>
                  </div>
                </div>

                <Link href={`/checkout/${property.id}`} className="w-full bg-white text-black py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-200 transition-colors flex justify-center items-center gap-3">
                  Initiate Checkout <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Representation</div>
                  <div className="font-serif text-xl">{property.agent.name}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
