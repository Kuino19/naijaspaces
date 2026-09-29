"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2500);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6 selection:bg-white selection:text-black">
        <div className="max-w-xl w-full text-center">
          <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-none">Transaction <br/><span className="italic font-light text-gray-500">Authorized.</span></h2>
          <p className="text-xl font-light text-gray-400 mb-12">Your acquisition of The Genesis Mansion has been initiated. Our private office will contact you shortly.</p>
          <Link href="/properties" className="inline-block border-b border-white pb-2 uppercase tracking-[0.2em] text-xs hover:text-gray-400 hover:border-gray-400 transition-colors">
            Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      
      <header className="w-full px-6 py-8 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-widest uppercase hover:opacity-50 transition-opacity">
          Naija<span className="font-light">Estates</span>
        </Link>
        <Link href="/properties/1" className="flex items-center gap-3 text-xs tracking-widest uppercase hover:opacity-50 transition-opacity">
          <ArrowLeft className="h-4 w-4" /> Cancel
        </Link>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
        
        {/* Left: Summary */}
        <div>
          <h1 className="text-4xl md:text-6xl font-serif mb-12">Checkout.</h1>
          
          <div className="mb-12">
            <img 
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Property" 
              className="w-full h-64 object-cover mb-6 grayscale-[20%]" 
            />
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Banana Island, Ikoyi</div>
            <h2 className="text-3xl font-serif">The Genesis Mansion</h2>
          </div>

          <div className="space-y-6 text-lg font-light border-y border-white/10 py-8">
            <div className="flex justify-between">
              <span className="text-gray-400">Asking Price</span>
              <span>₦150,000,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Agency Premium (5%)</span>
              <span>₦7,500,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Legal Fees (2%)</span>
              <span>₦3,000,000</span>
            </div>
          </div>
          
          <div className="flex justify-between items-end mt-8">
            <span className="text-sm uppercase tracking-widest text-gray-500">Total</span>
            <span className="text-4xl font-light">₦160,500,000</span>
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
