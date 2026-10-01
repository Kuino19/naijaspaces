"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CheckoutPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { propertyId } = params;
  
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const isSuccessParam = searchParams.get("status") === "success";

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

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");

    const basePrice = (property.price || 0) * duration;
    const agencyPremium = basePrice * 0.05;
    const legalFees = basePrice * 0.02;
    const totalAmount = basePrice + agencyPremium + legalFees;

    try {
      const res = await fetch("/api/payments/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          phone,
          amount: totalAmount,
          propertyId,
          duration
        })
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        throw new Error(json.error || "Payment initialization failed");
      }

      // Redirect to live Paystack authorization URL
      if (json.authorization_url) {
        window.location.href = json.authorization_url;
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong initializing payment.");
      setIsProcessing(false);
    }
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

  if (isSuccessParam) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6 selection:bg-white selection:text-black">
        <div className="max-w-xl w-full text-center bg-[#111] border border-white/10 p-12">
          <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-4xl font-serif mb-4 leading-none">Payment Successful</h2>
          <p className="text-gray-300 font-light mb-8">
            Your transaction reference <code className="bg-white/10 px-2 py-1 text-xs text-white">{searchParams.get("reference")}</code> has been verified via Paystack.
          </p>
          <Link href="/dashboard/tenant" className="inline-block bg-white text-black px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-200 transition-colors">
            Go to Tenant Dashboard
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
          
          {error && (
            <div className="bg-red-500/10 text-red-400 text-sm p-4 mb-6 border border-red-500/20">
              {error}
            </div>
          )}

          <form onSubmit={handlePayment} className="space-y-8">
            <div className="relative group">
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Legal Name" 
                className="w-full text-2xl font-light bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-white transition-colors placeholder:text-gray-700" 
              />
            </div>
            
            <div className="relative group">
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address" 
                className="w-full text-2xl font-light bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-white transition-colors placeholder:text-gray-700" 
              />
            </div>
            
            <div className="relative group">
              <input 
                type="tel" 
                required 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number" 
                className="w-full text-2xl font-light bg-transparent border-b border-white/20 pb-4 focus:outline-none focus:border-white transition-colors placeholder:text-gray-700" 
              />
            </div>

            <div className="pt-12">
              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-white text-black py-6 uppercase tracking-[0.2em] text-sm font-bold hover:bg-gray-200 transition-all flex justify-center items-center gap-3 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Redirecting to Paystack...
                  </span>
                ) : (
                  <>Pay ₦{total.toLocaleString()} with Paystack <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
