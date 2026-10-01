"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
        throw new Error(error.message || "Registration failed");
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
      <header className="w-full z-50 px-6 py-8 flex justify-between items-center border-b border-white/10">
        <Link href="/" className="text-xl font-bold tracking-widest uppercase hover:opacity-50 transition-opacity">
          Naija<span className="font-light">Spaces</span>
        </Link>
        <Link href="/" className="flex items-center gap-3 text-xs tracking-widest uppercase hover:opacity-50 transition-opacity">
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-md bg-[#111] border border-white/10 p-10">
          <div className="flex justify-between items-center mb-8">
            <div className="text-xs uppercase tracking-widest text-gray-500">Agent Portal</div>
            <Link href="/for-agents" className="text-[10px] uppercase tracking-widest text-emerald-400 hover:underline">
              Agent Benefits →
            </Link>
          </div>
          <h1 className="text-3xl font-serif mb-4">Create Account</h1>
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-3.5 mb-8 rounded font-medium">
            🎉 <strong>1st Month FREE Promo!</strong> (Then ₦1,500/mo flat fee + 5% sales commission)
          </div>

          {success && <div className="bg-green-500/10 text-green-400 text-sm p-4 mb-8 border border-green-500/20">Account created successfully! Redirecting to dashboard...</div>}
          {error && <div className="bg-red-500/10 text-red-500 text-sm p-4 mb-8 border border-red-500/20">{error}</div>}

          <form onSubmit={handleRegister} className="space-y-8">
            <div className="relative">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Full Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full text-lg font-light bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors" 
              />
            </div>
            
            <div className="relative">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full text-lg font-light bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors" 
              />
            </div>
            
            <div className="relative">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full text-lg font-light bg-transparent border-b border-white/20 pb-2 pr-10 focus:outline-none focus:border-white transition-colors" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 bottom-2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-200 transition-colors flex justify-center items-center mt-8 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Register"}
            </button>
            
            <div className="text-center pt-4">
              <Link href="/login" className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                Already have an account? Sign In
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
