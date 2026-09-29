"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Login failed");
      }

      router.push("/dashboard");
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

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#111] border border-white/10 p-10">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-8">Agent Portal</div>
          <h1 className="text-3xl font-serif mb-12">Sign In</h1>

          {error && <div className="bg-red-500/10 text-red-500 text-sm p-4 mb-8 border border-red-500/20">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-8">
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
              <input 
                type="password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full text-lg font-light bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-200 transition-colors flex justify-center items-center mt-8 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Access Dashboard"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
