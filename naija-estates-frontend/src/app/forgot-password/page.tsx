"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Mail, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 py-16">
        <div className="w-full max-w-md bg-[#111] border border-white/10 p-10">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-8">Security Reset</div>
          <h1 className="text-3xl font-serif mb-4">Forgot Password</h1>
          <p className="text-sm text-gray-400 font-light mb-8">
            Enter your account email address below and we'll send you a password reset link.
          </p>

          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-6 text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
              <h3 className="font-serif text-xl text-white">Reset Link Sent</h3>
              <p className="text-xs text-gray-300">
                If an account matches <strong>{email}</strong>, check your inbox for instructions to reset your password.
              </p>
              <Link href="/login" className="inline-block pt-2 text-xs uppercase tracking-widest text-white hover:underline">
                Return to Sign In →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="bg-red-500/10 text-red-400 text-xs p-4 border border-red-500/20">{error}</div>}

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agent@naijaspaces.app"
                    className="w-full text-base font-light bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors"
                  />
                  <Mail className="absolute right-0 bottom-2 w-4 h-4 text-gray-500" />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-200 transition-colors flex justify-center items-center gap-2 mt-8 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Reset Link"}
              </button>

              <div className="text-center pt-4 border-t border-white/10">
                <Link href="/login" className="text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                  ← Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
