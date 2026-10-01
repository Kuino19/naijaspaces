"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, MessageSquare, TrendingUp, CheckCircle2, DollarSign, Award, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ForAgentsLandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-4">
        <Breadcrumbs items={[
          { label: "For Agents" }
        ]} />
      </div>

      <main className="w-full">
        {/* ===== HERO SECTION ===== */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            {/* Promo Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-4 py-2 rounded-full uppercase tracking-widest font-semibold mb-8">
              <Zap className="w-4 h-4" /> 1ST MONTH FREE PROMO • NO CREDIT CARD REQUIRED
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.05] mb-8">
              List Your Properties. <br />
              <span className="italic font-light text-gray-400">Close Deals 3x Faster.</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl">
              NaijaSpaces connects licensed real estate agents directly with high-intent buyers and tenants across Lagos, Abuja, and Port Harcourt.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <Link 
                href="/register" 
                className="bg-white text-black px-8 py-5 text-center text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-all flex items-center justify-center gap-3"
              >
                Claim Free Month & Register <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="#pricing" 
                className="border border-white/20 text-white px-8 py-5 text-center text-xs uppercase tracking-widest hover:border-white transition-colors"
              >
                View Agent Pricing
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#111] border border-white/10 p-8 md:p-10 relative">
            <div className="absolute top-4 right-4 bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1">
              PROMO ACTIVE
            </div>

            <div className="text-xs uppercase tracking-widest text-gray-500 mb-6">Agent Partnership Terms</div>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-white">First Month Subscription</h4>
                  <p className="text-sm text-gray-400 font-light mt-0.5">₦0 (100% FREE for your first 30 days)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center shrink-0">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-white">Monthly Renewal Fee</h4>
                  <p className="text-sm text-gray-400 font-light mt-0.5">₦1,500 / month flat subscription</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-white">Closing Sales Commission</h4>
                  <p className="text-sm text-gray-400 font-light mt-0.5">5% platform fee only when a deal closes</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-gray-500 text-center">
              Cancel or pause subscription anytime from your agent dashboard.
            </div>
          </div>
        </section>

        {/* ===== WHAT WE OFFER AGENTS ===== */}
        <section className="bg-[#111] border-y border-white/10 py-24 px-6 md:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500">Why Top Agents Choose Us</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mt-2">Everything You Need to Succeed</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center mb-6 text-emerald-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3">Guaranteed Adverts & Traffic</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    We run targeted digital campaigns across Google, Meta, and Instagram to send high-budget tenants directly to your listings.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center mb-6 text-blue-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3">Verified Agent Badge & Safety</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    Instantly build trust. Verified agents get 4x more inquiries and zero time-wasters.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center mb-6 text-emerald-400">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3">Direct WhatsApp Inquiry Leads</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    No middlemen or delayed emails. Buyers chat with you directly on WhatsApp or call your line with 1-click.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center mb-6 text-amber-400">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3">Agent Portal & Analytics</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    Upload multiple HD photos, manage rental durations (Daily, Weekly, Yearly), and track listing performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PRICING COMPARISON TABLE ===== */}
        <section id="pricing" className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500">Transparent Pricing</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mt-2">Simple, Predictable Plans</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Trial Card */}
            <div className="bg-[#111] border-2 border-emerald-500 p-8 md:p-10 relative flex flex-col justify-between">
              <div>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-emerald-500/30 inline-block mb-4">
                  PROMO OFFER
                </span>
                <h3 className="text-2xl font-serif text-white mb-2">1st Month Trial</h3>
                <div className="text-4xl font-serif text-white mb-6">
                  ₦0 <span className="text-sm font-sans font-light text-gray-400">for 30 days</span>
                </div>
                
                <ul className="space-y-4 text-sm text-gray-300 font-light mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Unlimited Property Listings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Multi-Image Photo Galleries
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Direct WhatsApp Lead Buttons
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Verified Agent Badge Application
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 5% Commission on Closed Deals
                  </li>
                </ul>
              </div>

              <Link 
                href="/register" 
                className="w-full bg-emerald-600 text-white text-center py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-emerald-500 transition-colors block"
              >
                Start Free Month Now
              </Link>
            </div>

            {/* Standard Monthly Card */}
            <div className="bg-[#111] border border-white/10 p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="bg-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 inline-block mb-4">
                  STANDARD PLAN
                </span>
                <h3 className="text-2xl font-serif text-white mb-2">Monthly Membership</h3>
                <div className="text-4xl font-serif text-white mb-6">
                  ₦1,500 <span className="text-sm font-sans font-light text-gray-400">/ month</span>
                </div>
                
                <ul className="space-y-4 text-sm text-gray-300 font-light mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-400 shrink-0" /> Everything in Free Trial
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-400 shrink-0" /> Priority Listing Boost in Search Results
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-400 shrink-0" /> Featured Placement on Homepage
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-400 shrink-0" /> Dedicated Account Manager Support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-400 shrink-0" /> 5% Commission on Closed Deals
                  </li>
                </ul>
              </div>

              <Link 
                href="/register" 
                className="w-full border border-white/30 text-white text-center py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors block"
              >
                Register as Agent
              </Link>
            </div>
          </div>
        </section>

        {/* ===== CTA FOOTER ===== */}
        <section className="bg-white text-black py-20 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Join 500+ Verified Nigerian Agents</h2>
            <p className="text-gray-600 text-lg font-light mb-8">
              Start listing your property portfolio today with your 1st month 100% free.
            </p>
            <Link 
              href="/register" 
              className="bg-black text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors inline-block"
            >
              Get Started Free →
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-8 text-[10px] uppercase tracking-widest text-gray-500 border-t border-white/5 bg-[#0a0a0a]">
        <span>© {new Date().getFullYear()} NAIJASPACES.</span>
        <span className="mx-3">|</span>
        <span>
          MADE BY <a href="https://www.goanitech.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">GOANITECH</a>
        </span>
      </footer>
    </div>
  );
}
