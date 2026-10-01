"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MessageSquare, Phone, Mail, Loader2, Home, MapPin } from "lucide-react";

export default function AgentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [agent, setAgent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgent();
  }, [resolvedParams.id]);

  const fetchAgent = async () => {
    try {
      const res = await fetch(`/api/agents/${resolvedParams.id}`);
      if (res.ok) {
        const data = await res.json();
        setAgent(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-12 text-center">
        <h1 className="text-3xl font-serif mb-4">Agent Not Found</h1>
        <Link href="/properties" className="text-sm uppercase tracking-widest text-gray-400 hover:text-white">
          ← Back to Properties
        </Link>
      </div>
    );
  }

  const cleanPhone = agent.phone?.replace(/[^0-9]/g, '') || agent.whatsapp?.replace(/[^0-9]/g, '') || '';
  const whatsappUrl = agent.whatsapp 
    ? `https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(agent.name)},%20I%20am%20interested%20in%20your%20property%20listings%20on%20NaijaSpaces.`
    : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col selection:bg-white selection:text-black">
      {/* Navigation */}
      <header className="w-full z-50 px-6 py-8 flex justify-between items-center border-b border-white/10">
        <Link href="/" className="text-xl font-bold tracking-widest uppercase hover:opacity-50 transition-opacity">
          Naija<span className="font-light">Spaces</span>
        </Link>
        <Link href="/properties" className="flex items-center gap-2 text-xs tracking-widest uppercase hover:opacity-50 transition-opacity">
          <ArrowLeft className="h-4 w-4" /> Properties
        </Link>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12">
        {/* Profile Card */}
        <div className="bg-[#111] border border-white/10 p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
            {agent.avatarUrl ? (
              <img src={agent.avatarUrl} alt={agent.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl font-serif uppercase">{agent.name?.charAt(0) || 'A'}</span>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-3">
              <h1 className="text-3xl md:text-4xl font-serif text-white">{agent.name}</h1>
              {agent.isVerified && (
                <span className="inline-flex items-center gap-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Agent
                </span>
              )}
            </div>

            <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">
              Licensed Real Estate Agent • Joined {new Date(agent.createdAt).getFullYear()}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {whatsappUrl && (
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
                </a>
              )}
              {cleanPhone && (
                <a 
                  href={`tel:${cleanPhone}`} 
                  className="border border-white/30 hover:border-white text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Call Agent
                </a>
              )}
              {agent.email && (
                <a 
                  href={`mailto:${agent.email}`} 
                  className="border border-white/10 hover:border-white/30 text-gray-300 hover:text-white px-6 py-3 text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" /> Email
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Property Portfolio */}
        <div className="mb-8 flex justify-between items-end border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-500">Listings Portfolio</span>
            <h2 className="text-2xl font-serif text-white mt-1">Properties by {agent.name}</h2>
          </div>
          <span className="text-xs uppercase tracking-widest text-gray-400">
            {agent.properties?.length || 0} Active Properties
          </span>
        </div>

        {agent.properties?.length === 0 ? (
          <div className="py-20 text-center text-gray-500 font-light">
            No active properties currently listed by this agent.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agent.properties?.map((prop: any) => (
              <div key={prop.id} className="group border border-white/10 bg-[#111] overflow-hidden flex flex-col">
                <Link href={`/properties/${prop.id}`} className="block relative h-64 overflow-hidden">
                  <img 
                    src={prop.imageUrl || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"} 
                    alt={prop.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale-[20%]" 
                  />
                  {prop.isVerified && (
                    <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-green-400 text-[10px] uppercase tracking-widest px-3 py-1 border border-green-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  )}
                </Link>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif text-white mb-2">{prop.title}</h3>
                    <div className="flex items-center gap-1 text-xs uppercase tracking-widest text-gray-400 mb-4">
                      <MapPin className="w-3 h-3" /> {prop.city}, {prop.state}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-4">
                    <div className="text-lg font-light text-white">
                      ₦{(prop.price || 0).toLocaleString()}
                      <span className="text-xs text-gray-400"> / {prop.rentalPeriod?.toLowerCase()}</span>
                    </div>
                    <Link href={`/properties/${prop.id}`} className="text-xs uppercase tracking-widest text-white hover:text-gray-300 font-medium">
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
