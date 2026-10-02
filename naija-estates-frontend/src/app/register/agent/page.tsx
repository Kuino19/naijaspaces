"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Eye, EyeOff, ShieldCheck, Zap } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import AgentNavbar from "@/components/AgentNavbar";

export default function AgentRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (error) {
        throw new Error(error.message || "Agent registration failed");
      }

      // Update phone details via bank/profile route if provided
      if (phone) {
        fetch("/api/agent/bank", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bankName: "Pending", accountNumber: "Pending", accountName: name, phone })
        }).catch(() => {});
      }

      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col selection:bg-white selection:text-black">
      <AgentNavbar />

      <main className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-lg bg-[#111] border border-white/10 p-10">
          <div className="flex justify-between items-center mb-6">
            <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Agent Partner Portal
            </div>
            <Link href="/for-agents" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-white underline">
              View Agent Offer →
            </Link>
          </div>

          <h1 className="text-3xl font-serif mb-3">Agent Registration</h1>
          <p className="text-xs text-gray-400 font-light mb-8">
            List properties, get direct WhatsApp leads, and manage your portfolio.
          </p>

          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-4 mb-8 rounded font-medium space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Zap className="w-4 h-4 text-emerald-400 shrink-0" /> PROMO UNLOCKED: 1st Month 100% FREE!
            </div>
            <p className="text-[11px] text-emerald-300/80 font-normal">
              List unlimited properties free for 30 days. Standard membership is ₦1,500/month flat fee + 5% sales commission.
            </p>
          </div>

          {success && (
            <div className="bg-green-500/10 text-green-400 text-sm p-4 mb-8 border border-green-500/20">
              Agent account created! Redirecting to command center...
            </div>
          )}
          {error && <div className="bg-red-500/10 text-red-500 text-sm p-4 mb-8 border border-red-500/20">{error}</div>}

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Full Legal Name or Agency Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Chief Emeka Orogun or Apex Realty"
                className="w-full text-base font-light bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors" 
              />
            </div>
            
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Business Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="agent@agency.ng"
                className="w-full text-base font-light bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors" 
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">WhatsApp / Phone Line for Client Leads</label>
              <input 
                type="tel" 
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="e.g. 08012345678"
                className="w-full text-base font-light bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors" 
              />
            </div>
            
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full text-base font-light bg-transparent border-b border-white/20 pb-2 pr-10 focus:outline-none focus:border-white transition-colors" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 bottom-2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-200 transition-colors flex justify-center items-center mt-8 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Claim Free Month & Register as Agent"}
            </button>
            
            <div className="text-center pt-4 border-t border-white/10 flex justify-between items-center text-xs">
              <Link href="/login" className="text-gray-400 hover:text-white uppercase tracking-widest">
                Existing Agent? Sign In
              </Link>
              <Link href="/register" className="text-gray-400 hover:text-white uppercase tracking-widest">
                Tenant Sign Up →
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
