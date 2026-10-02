"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, MessageSquare, TrendingUp, CheckCircle2, DollarSign, Award, Users, HelpCircle, ChevronRight, Check } from "lucide-react";
import AgentNavbar from "@/components/AgentNavbar";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ForAgentsLandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black scroll-smooth">
      <AgentNavbar />

      <div className="max-w-7xl mx-auto px-6 pt-4">
        <Breadcrumbs items={[
          { label: "Agent Partner Network" }
        ]} />
      </div>

      <main className="w-full">
        {/* ===== HERO SECTION ===== */}
        <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            {/* Promo Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-4 py-2 rounded-full uppercase tracking-widest font-semibold mb-8">
              <Zap className="w-4 h-4 fill-emerald-400" /> 1ST MONTH FREE PROMO • NO CREDIT CARD REQUIRED
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.05] mb-8">
              List Your Portfolio. <br />
              <span className="italic font-light text-emerald-400">Close Deals 3x Faster.</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl">
              NaijaSpaces connects verified real estate agents directly with high-budget buyers and tenants across Lagos, Abuja, and Port Harcourt.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <Link 
                href="/register/agent" 
                className="bg-emerald-500 text-black px-8 py-5 text-center text-xs font-bold uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20"
              >
                Claim Free Month & Register <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="#pricing" 
                className="border border-white/20 text-white px-8 py-5 text-center text-xs uppercase tracking-widest hover:border-white transition-colors"
              >
                View Pricing & 5% Cut
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#111] border border-white/10 p-8 md:p-10 relative">
            <div className="absolute top-4 right-4 bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1">
              PROMO UNLOCKED
            </div>

            <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-6 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Agent Partnership Terms
            </div>
            
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
                  <h4 className="text-lg font-serif text-white">Flat Monthly Membership</h4>
                  <p className="text-sm text-gray-400 font-light mt-0.5">₦1,500 / month flat subscription after trial</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-white">Paystack Commission Model</h4>
                  <p className="text-sm text-gray-400 font-light mt-0.5">Your price is net asking price. 5% platform cut is added upon so buyers pay online seamlessly.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-gray-500 text-center">
              Cancel or pause subscription anytime from your agent command center.
            </div>
          </div>
        </section>

        {/* ===== WHY PARTNER / FEATURES SECTION ===== */}
        <section id="features" className="bg-[#111] border-y border-white/10 py-24 px-6 md:px-20 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">Why Top Nigerian Agents Choose Us</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mt-2">Built Exclusively for Real Estate Pros</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3">Guaranteed Adverts & Targeted Traffic</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    We run high-budget ad campaigns across Google, Meta, and Instagram to drive qualified, high-net-worth tenants directly to your listings.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3">Verified Agent Badge & Safety</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    Instantly build client trust. Verified partner agents get 4x more direct inquiries and zero time-wasting inquiries.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3">Direct WhatsApp Inquiry Leads</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    No middlemen or delayed email forwards. Interested buyers click once to start a direct WhatsApp chat or phone call with you.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 text-amber-400">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3">Agent Command Center</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    Upload HD photo galleries, set custom lease terms (Daily Shortlet, Yearly Rent, Outright Sale), and manage your payout bank account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS SECTION ===== */}
        <section id="how-it-works" className="py-24 px-6 md:px-20 max-w-7xl mx-auto scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">Seamless Onboarding</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mt-2">How It Works in 3 Simple Steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111] border border-white/10 p-8 relative">
              <div className="text-4xl font-serif text-emerald-400 font-bold mb-4">01</div>
              <h3 className="text-xl font-serif text-white mb-3">Create Free Agent Account</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Sign up in under 60 seconds with your email and WhatsApp contact number. Your 1st month subscription fee is 100% waived.
              </p>
            </div>

            <div className="bg-[#111] border border-white/10 p-8 relative">
              <div className="text-4xl font-serif text-emerald-400 font-bold mb-4">02</div>
              <h3 className="text-xl font-serif text-white mb-3">Upload Properties & Set Price</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Input your net asking price. Our platform automatically adds our 5% commission on top so buyers pay the total price transparently.
              </p>
            </div>

            <div className="bg-[#111] border border-white/10 p-8 relative">
              <div className="text-4xl font-serif text-emerald-400 font-bold mb-4">03</div>
              <h3 className="text-xl font-serif text-white mb-3">Receive Direct Leads & Payments</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Get direct WhatsApp inquiries or automated Paystack bank payouts sent straight to your verified Nigerian bank account.
              </p>
            </div>
          </div>
        </section>

        {/* ===== PRICING COMPARISON SECTION ===== */}
        <section id="pricing" className="bg-[#111] border-y border-white/10 py-24 px-6 md:px-20 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">Transparent Pricing</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mt-2">Zero Hidden Charges</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Trial Card */}
              <div className="bg-[#0a0a0a] border-2 border-emerald-500 p-8 md:p-10 relative flex flex-col justify-between">
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
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Unlimited Property Portfolio Listings
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Multi-Image Photo Galleries
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Direct 1-Click WhatsApp Leads
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Verified Agent Badge Verification
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Automated Paystack Split Payouts
                    </li>
                  </ul>
                </div>

                <Link 
                  href="/register/agent" 
                  className="w-full bg-emerald-500 text-black text-center py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-emerald-400 transition-colors block"
                >
                  Start Free Month Now
                </Link>
              </div>

              {/* Standard Monthly Card */}
              <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-10 flex flex-col justify-between">
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
                      <CheckCircle2 className="w-4 h-4 text-gray-400 shrink-0" /> 5% Added Commission Model
                    </li>
                  </ul>
                </div>

                <Link 
                  href="/register/agent" 
                  className="w-full border border-white/30 text-white text-center py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors block"
                >
                  Register as Agent
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ SECTION FOR AGENTS ===== */}
        <section id="faq" className="py-24 px-6 md:px-20 max-w-5xl mx-auto scroll-mt-20">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">Agent FAQ</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111] border border-white/10 p-6 rounded">
              <h3 className="text-lg font-serif text-white mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" /> How does the 5% platform cut work with my asking price?
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed pl-6">
                When you list a property for ₦2,000,000, our system adds our 5% platform commission on top (₦100,000). The total price displayed to the buyer on Paystack checkout is ₦2,100,000. You receive 100% of your ₦2,000,000 asking price directly into your bank account!
              </p>
            </div>

            <div className="bg-[#111] border border-white/10 p-6 rounded">
              <h3 className="text-lg font-serif text-white mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" /> How do I receive my 1st Month Free?
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed pl-6">
                Simply click "Claim Free Month" and complete your agent registration. You do not need a credit card. Your listing privileges activate immediately for 30 days.
              </p>
            </div>

            <div className="bg-[#111] border border-white/10 p-6 rounded">
              <h3 className="text-lg font-serif text-white mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" /> Can I list short-lets, rentals, and outright sales?
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed pl-6">
                Yes! NaijaSpaces supports daily/monthly short-let stays, yearly residential rentals, commercial leases, and outright land/building sales.
              </p>
            </div>
          </div>
        </section>

        {/* ===== CTA FOOTER ===== */}
        <section className="bg-emerald-500 text-black py-20 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 font-bold">Join 500+ Verified Nigerian Agents</h2>
            <p className="text-black/80 text-lg font-normal mb-8">
              Start listing your property portfolio today with your 1st month 100% free.
            </p>
            <Link 
              href="/register/agent" 
              className="bg-black text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors inline-block shadow-2xl"
            >
              Get Started Free →
            </Link>
          </div>
        </section>
      </main>

      {/* Agent Footer */}
      <footer className="w-full text-center py-8 text-[10px] uppercase tracking-widest text-gray-500 border-t border-white/5 bg-[#0a0a0a]">
        <span>© {new Date().getFullYear()} NAIJASPACES AGENT NETWORK.</span>
        <span className="mx-3">|</span>
        <span>
          POWERED BY <a href="https://www.goanitech.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">GOANITECH</a>
        </span>
      </footer>
    </div>
  );
}
