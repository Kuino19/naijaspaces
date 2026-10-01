"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2, MessageSquare, Phone, Heart, User, Layers } from "lucide-react";
import { useState, useEffect } from "react";

export default function PropertyDetailsPage() {
  const params = useParams();
  const { id } = params;
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFavourited, setIsFavourited] = useState(false);
  const [isCompared, setIsCompared] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/properties/${id}`)
      .then(res => res.json())
      .then(data => {
        setProperty(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0].url);
        } else {
          setSelectedImage(data.imageUrl);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch property:", err);
        setLoading(false);
      });

    // Check if compared
    const compareStored = localStorage.getItem("naijaspaces_compare");
    if (compareStored) {
      try {
        const list = JSON.parse(compareStored);
        setIsCompared(list.some((p: any) => p.id === id));
      } catch (e) {}
    }
  }, [id]);

  const toggleFavourite = async () => {
    try {
      const res = await fetch("/api/favourites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: id })
      });
      if (res.ok) {
        const json = await res.json();
        setIsFavourited(json.favourited);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCompare = () => {
    const compareStored = localStorage.getItem("naijaspaces_compare");
    let list: any[] = [];
    if (compareStored) {
      try {
        list = JSON.parse(compareStored);
      } catch (e) {}
    }

    if (isCompared) {
      list = list.filter(p => p.id !== id);
      setIsCompared(false);
    } else {
      if (list.length >= 4) {
        alert("You can compare up to 4 properties at a time.");
        return;
      }
      list.push(property);
      setIsCompared(true);
    }
    localStorage.setItem("naijaspaces_compare", JSON.stringify(list));
  };

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
  const allImages = property.images && property.images.length > 0 
    ? property.images.map((img: any) => img.url) 
    : [property.imageUrl];
  const activeImage = selectedImage || property.imageUrl;

  const agent = property.agent || {};
  const whatsappNumber = agent.whatsapp || agent.phone;
  const whatsappUrl = whatsappNumber 
    ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(agent.name || 'Agent')},%20I%20am%20interested%20in%20your%20property%20listing:%20${encodeURIComponent(property.title)}`
    : null;
  const cleanPhone = agent.phone?.replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      
      {/* Header */}
      <header className="w-full z-50 px-6 py-8 flex justify-between items-center border-b border-white/10">
        <Link href="/" className="text-xl font-bold tracking-widest uppercase hover:opacity-50 transition-opacity">
          Naija<span className="font-light">Spaces</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/compare" className="text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-all flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Compare ({isCompared ? 'Selected' : 'View'})
          </Link>
          <div className="h-4 w-px bg-white/20 hidden md:block"></div>
          <Link href="/properties" className="flex items-center gap-3 text-xs tracking-widest uppercase hover:opacity-50 transition-opacity border-b border-white/30 pb-1">
            <ArrowLeft className="h-4 w-4" /> Portfolio
          </Link>
        </div>
      </header>

      <main className="w-full">
        {/* Gallery / Hero Image */}
        <div className="w-full h-[65vh] relative bg-black">
          {activeImage?.includes('/video/upload') || activeImage?.endsWith('.mp4') ? (
            <video src={activeImage} className="w-full h-full object-cover grayscale-[10%]" muted autoPlay loop playsInline />
          ) : (
            <img src={activeImage || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80"} alt={property.title} className="w-full h-full object-cover grayscale-[10%]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>

          {/* Quick Action Badges */}
          <div className="absolute top-6 right-6 flex gap-3">
            <button 
              onClick={toggleFavourite} 
              className={`p-3 rounded-full backdrop-blur-md border transition-colors ${
                isFavourited ? "bg-red-500/20 border-red-500 text-red-400" : "bg-black/60 border-white/20 text-white hover:bg-white/20"
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavourited ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={toggleCompare} 
              className={`px-4 py-2 rounded-full backdrop-blur-md border text-xs uppercase tracking-widest transition-colors ${
                isCompared ? "bg-white text-black border-white" : "bg-black/60 border-white/20 text-white hover:bg-white/20"
              }`}
            >
              {isCompared ? "Comparing ✓" : "+ Compare"}
            </button>
          </div>
        </div>

        {/* Image Thumbnail Selector Carousel */}
        {allImages.length > 1 && (
          <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 mb-12 flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {allImages.map((imgUrl: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(imgUrl)}
                className={`w-28 h-20 shrink-0 overflow-hidden border-2 transition-all ${
                  activeImage === imgUrl ? "border-white scale-105" : "border-white/20 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-6 relative z-10 pb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-400">{property.address}, {property.city}</span>
                {property.isVerified && (
                  <span className="bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] uppercase tracking-widest px-2 py-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Property
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-serif leading-tight">{property.title}</h1>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">Asking Rent</div>
              <div className="text-3xl md:text-5xl font-light">{priceStr}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column: Property Info */}
            <div className="lg:col-span-8">
              <div className="flex gap-12 border-y border-white/10 py-8 mb-12 text-sm uppercase tracking-widest">
                <div>
                  <span className="block text-gray-500 mb-1">Type</span>
                  <span>{property.type}</span>
                </div>
                <div>
                  <span className="block text-gray-500 mb-1">Rental Period</span>
                  <span>{property.rentalPeriod}</span>
                </div>
                <div>
                  <span className="block text-gray-500 mb-1">Status</span>
                  <span className={property.isAvailable ? "text-green-400" : "text-red-400"}>
                    {property.isAvailable ? "Available" : "Occupied"}
                  </span>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Property Overview</h2>
                <p className="text-lg md:text-xl font-light leading-relaxed text-gray-300 whitespace-pre-line">
                  {property.description}
                </p>
              </div>
            </div>

            {/* Right Column: Checkout & Agent Card */}
            <div className="lg:col-span-4 space-y-8">
              {/* Acquisition Box */}
              <div className="bg-[#111] border border-white/10 p-8">
                <h3 className="text-2xl font-serif mb-6">Acquisition</h3>
                
                <div className="space-y-4 mb-8 text-sm font-light text-gray-400">
                  <div className="flex justify-between border-b border-white/10 pb-3">
                    <span>Base Rent</span>
                    <span className="text-white">{priceStr}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-3">
                    <span>Agency Premium</span>
                    <span className="text-white">5%</span>
                  </div>
                </div>

                <Link 
                  href={`/checkout/${property.id}`} 
                  className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-200 transition-colors flex justify-center items-center gap-3"
                >
                  Initiate Checkout <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Agent Profile & Direct Contact Box */}
              <div className="bg-[#111] border border-white/10 p-8">
                <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">Listed By Agent</div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                    {agent.avatarUrl ? (
                      <img src={agent.avatarUrl} alt={agent.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 font-medium text-white">
                      <span>{agent.name || 'Verified Agent'}</span>
                      {agent.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />}
                    </div>
                    {agent.id && (
                      <Link href={`/agents/${agent.id}`} className="text-xs text-gray-400 hover:text-white underline uppercase tracking-wider mt-1 block">
                        View Agent Profile →
                      </Link>
                    )}
                  </div>
                </div>

                {/* Direct Contact Buttons */}
                <div className="space-y-3">
                  {whatsappUrl && (
                    <a 
                      href={whatsappUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 text-xs uppercase tracking-widest font-semibold transition-colors flex justify-center items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
                    </a>
                  )}
                  {cleanPhone && (
                    <a 
                      href={`tel:${cleanPhone}`} 
                      className="w-full border border-white/20 hover:border-white text-white py-3 text-xs uppercase tracking-widest font-semibold transition-colors flex justify-center items-center gap-2"
                    >
                      <Phone className="w-4 h-4" /> Call Agent
                    </a>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
