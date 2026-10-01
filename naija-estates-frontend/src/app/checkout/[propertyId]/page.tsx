"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CheckoutPage() {
  const params = useParams();
  const { propertyId } = params;
  
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (!propertyId) return;
    fetch(`/api/properties/${propertyId}`)
      .then(res => res.json())
      .then(data => {
        setProperty(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [propertyId]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2500);
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

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6 selection:bg-white selection:text-black">
        <div className="max-w-xl w-full text-center">
          <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-none">Transaction <br/><span className="italic font-light text-gray-500">Authorized.</span></h2>
          <p className="text-xl font-light text-gray-400 mb-12">Your acquisition of {property.title} has been initiated. Our private office will contact you shortly.</p>
          <Link href="/properties" className="inline-block border-b border-white pb-2 uppercase tracking-[0.2em] text-xs hover:text-gray-400 hover:border-gray-400 transition-colors">
            Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const periodStr = property.rentalPeriod === 'DAILY' ? 'Days' : property.rentalPeriod === 'WEEKLY' ? 'Weeks' : property.rentalPeriod === 'MONTHLY' ? 'Months' : 'Years';
  
  const basePrice = (property.price || 0) * duration;
  const agencyPremium = basePrice * 0.05;
  const legalFees = basePrice * 0.02;
  const total = basePrice + agencyPremium + legalFees;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-4">
        <Breadcrumbs items={[
          { label: "Properties", href: "/properties" },
          { label: property.title, href: `/properties/${property.id}` },
          { label: "Acquisition Checkout" }
        ]} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
        
        {/* Left: Summary */}
        <div>
          <h1 className="text-4xl md:text-6xl font-serif mb-12">Checkout.</h1>
          
          <div className="mb-12">
            {property.imageUrl?.includes('/video/upload') || property.imageUrl?.endsWith('.mp4') ? (
               <video src={property.imageUrl} className="w-full h-64 object-cover mb-6 grayscale-[20%]" muted autoPlay loop playsInline />
            ) : (
               <img src={property.imageUrl || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt={property.title} className="w-full h-64 object-cover mb-6 grayscale-[20%]" />
            )}
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">{property.address}, {property.city}</div>
            <h2 className="text-3xl font-serif">{property.title}</h2>
          </div>

          <div className="space-y-6 text-lg font-light border-y border-white/10 py-8">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Rental Duration</span>
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  min="1" 
                  value={duration} 
                  onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 bg-transparent border-b border-white/20 pb-1 text-center focus:outline-none focus:border-white transition-colors"
                />
                <span>{periodStr}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Base Rent ({duration} {periodStr})</span>
              <span>₦{basePrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Agency Premium (5%)</span>
              <span>₦{agencyPremium.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Legal Fees (2%)</span>
              <span>₦{legalFees.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-end mt-8">
            <span className="text-sm uppercase tracking-widest text-gray-500">Total</span>
            <span className="text-4xl font-light">₦{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Right: Form */}
        <div className="md:pt-32">
          <h3 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-8">Client Details</h3>
          
          <form onSubmit={handlePayment} className="space-y-8">
            <div className="relative group">
              <input type="text" required placeholder="Full Legal Name" className="w-full text-2xl font-light bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-white transition-colors placeholder:text-gray-700" />
            </div>
            
            <div className="relative group">
              <input type="email" required placeholder="Private Email" className="w-full text-2xl font-light bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-white transition-colors placeholder:text-gray-700" />
            </div>
            
            <div className="relative group">
              <input type="tel" required placeholder="Phone Number" className="w-full text-2xl font-light bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-white transition-colors placeholder:text-gray-700" />
            </div>

            <div className="pt-12">
              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-white text-black py-6 uppercase tracking-[0.2em] text-sm font-bold hover:bg-gray-200 transition-all flex justify-center items-center gap-3 disabled:opacity-50"
              >
                {isProcessing ? "Authorizing..." : (
                  <>Secure Payment <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
