"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || "Login failed");
      }

      // Check user role for smart redirect
      try {
        const meRes = await fetch("/api/auth/me");
        if (meRes.ok) {
          const meData = await meRes.json();
          if (meData.role === "TENANT") {
            router.push("/dashboard/tenant");
            return;
          } else if (meData.role === "ADMIN") {
            router.push("/admin");
            return;
          }
        }
      } catch (e) {}

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-md bg-[#111] border border-white/10 p-10">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-8">NaijaSpaces Portal</div>
          <h1 className="text-3xl font-serif mb-2">Sign In</h1>
          <p className="text-xs text-gray-400 font-light mb-8">Access your tenant dashboard, saved shortlist, or agent listings.</p>

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
              <div className="flex justify-between items-center mb-3">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500">Password</label>
                <Link href="/forgot-password" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                  Forgot Password?
                </Link>
              </div>
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
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Access Account"}
            </button>
            
            <div className="text-center pt-4 border-t border-white/10">
              <Link href="/register" className="text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                Need an account? Register
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
