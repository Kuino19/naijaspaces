"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, MessageSquare, TrendingUp, CheckCircle2, DollarSign, Award, Users, HelpCircle, ChevronRight, Check } from "lucide-react";
import AgentNavbar from "@/components/AgentNavbar";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

export default function ForAgentsLandingPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black scroll-smooth">
      <AgentNavbar />

      <main className="w-full">
        {/* ===== HERO SECTION ===== */}
        <section className="relative w-full min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
          {/* Background effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
            <motion.div 
              className="lg:col-span-7 pt-10"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Promo Badge */}
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#111] border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs px-4 py-2 rounded-full uppercase tracking-[0.2em] font-semibold mb-10 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <Zap className="w-4 h-4 fill-emerald-400" /> 1ST MONTH FREE PROMO
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl lg:text-[5.5rem] font-serif leading-[1.02] tracking-tight mb-8 text-white">
                {t('agentHeroTitle')} <br />
                <span className="italic font-light text-emerald-400">{t('agentHeroSubtitle')}</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-gray-400 text-lg sm:text-xl font-light leading-relaxed mb-12 max-w-xl">
                {t('agentHeroDesc')}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-5 items-stretch sm:items-center">
                <Link 
                  href="/register/agent" 
                  className="group relative bg-emerald-500 text-black px-8 py-5 text-center text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 overflow-hidden rounded-sm"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <span className="relative z-10 flex items-center gap-2">{t('claimFreeMonth')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                </Link>
                <Link 
                  href="#pricing" 
                  className="border border-white/20 text-white px-8 py-5 text-center text-xs uppercase tracking-[0.2em] font-medium hover:bg-white hover:text-black transition-colors rounded-sm"
                >
                  {t('viewPricing')}
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              className="lg:col-span-5 relative mt-12 lg:mt-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-emerald-900/20 rounded-xl blur-xl opacity-50"></div>
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 relative rounded-xl shadow-2xl">
                <div className="absolute -top-3 -right-3 bg-emerald-500 text-black text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-lg">
                  {t('promoUnlocked')}
                </div>

                <div className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold mb-8 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> {t('agentTermsLbl')}
                </div>
                
                <div className="space-y-8 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-lg font-serif text-white leading-tight">{t('firstMonthSub')}</h4>
                      <p className="text-sm text-gray-400 font-light mt-1">{t('firstMonthDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                      <DollarSign className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-lg font-serif text-white leading-tight">{t('monthlyMem')}</h4>
                      <p className="text-sm text-gray-400 font-light mt-1">{t('monthlyMemDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-lg font-serif text-white leading-tight">{t('naijaSpacesCom')}</h4>
                      <p className="text-sm text-gray-400 font-light mt-1">{t('naijaSpacesComDesc')}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 text-[11px] text-gray-500 text-center font-medium">
                  {t('cancelAnytime')}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== WHY PARTNER / FEATURES SECTION ===== */}
        <section id="features" className="relative py-32 px-6 md:px-20 scroll-mt-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              className="text-center max-w-2xl mx-auto mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold mb-4 block">{t('whyTopAgents')}</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">{t('builtExclusive')}</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: TrendingUp,
                  colorClasses: {
                    bg: "bg-emerald-500/10",
                    border: "border-emerald-500/20",
                    text: "text-emerald-400",
                    glow: "bg-emerald-500/20"
                  },
                  title: t('feat1Title'),
                  desc: t('feat1Desc')
                },
                {
                  icon: ShieldCheck,
                  colorClasses: {
                    bg: "bg-blue-500/10",
                    border: "border-blue-500/20",
                    text: "text-blue-400",
                    glow: "bg-blue-500/20"
                  },
                  title: t('feat2Title'),
                  desc: t('feat2Desc')
                },
                {
                  icon: MessageSquare,
                  colorClasses: {
                    bg: "bg-emerald-500/10",
                    border: "border-emerald-500/20",
                    text: "text-emerald-400",
                    glow: "bg-emerald-500/20"
                  },
                  title: t('feat3Title'),
                  desc: t('feat3Desc')
                },
                {
                  icon: Users,
                  colorClasses: {
                    bg: "bg-amber-500/10",
                    border: "border-amber-500/20",
                    text: "text-amber-400",
                    glow: "bg-amber-500/20"
                  },
                  title: t('feat4Title'),
                  desc: t('feat4Desc')
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative bg-[#111]/50 backdrop-blur-sm border border-white/5 p-8 rounded-xl hover:bg-[#111] transition-colors duration-500 overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${feature.colorClasses.glow} rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100`}></div>
                  <div className={`w-12 h-12 rounded-xl ${feature.colorClasses.bg} border ${feature.colorClasses.border} flex items-center justify-center mb-8 ${feature.colorClasses.text} group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-4">{feature.title}</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS SECTION ===== */}
        <section id="how-it-works" className="py-32 px-6 md:px-20 max-w-7xl mx-auto scroll-mt-20">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold mb-4 block">{t('seamlessOnboard')}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">{t('howItWorks')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
            
            {[
              {
                step: "01",
                title: t('step1Title'),
                desc: t('step1Desc')
              },
              {
                step: "02",
                title: t('step2Title'),
                desc: t('step2Desc')
              },
              {
                step: "03",
                title: t('step3Title'),
                desc: t('step3Desc')
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-[#111]/80 backdrop-blur-md border border-white/10 p-10 relative rounded-xl hover:border-emerald-500/30 transition-colors"
              >
                <div className="text-5xl font-serif text-emerald-400/20 font-bold mb-6 relative">
                  {item.step}
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-400 to-transparent bg-clip-text text-transparent opacity-80">{item.step}</div>
                </div>
                <h3 className="text-xl font-serif text-white mb-4 leading-tight">{item.title}</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== PRICING COMPARISON SECTION ===== */}
        <section id="pricing" className="relative bg-[#111] border-y border-white/5 py-32 px-6 md:px-20 scroll-mt-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              className="text-center max-w-2xl mx-auto mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold mb-4 block">{t('transPricing')}</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">{t('zeroHidden')}</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Trial Card */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="group bg-[#0a0a0a]/80 backdrop-blur-xl border border-emerald-500/50 p-8 md:p-12 relative flex flex-col justify-between rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:shadow-[0_0_50px_rgba(16,185,129,0.2)] transition-shadow duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 border border-emerald-500/20 inline-block mb-6 rounded-full">
                    {t('promoOffer')}
                  </span>
                  <h3 className="text-2xl font-serif text-white mb-2">{t('firstMonthTrial')}</h3>
                  <div className="text-5xl font-serif text-white mb-8">
                    ₦0 <span className="text-sm font-sans font-light text-gray-400">{t('for30days')}</span>
                  </div>
                  
                  <ul className="space-y-4 text-sm text-gray-300 font-light mb-10">
                    {[
                      "Unlimited Property Portfolio Listings",
                      "Multi-Image Photo Galleries",
                      "Direct 1-Click WhatsApp Leads",
                      "Verified Agent Badge Verification",
                      "Automated Paystack Split Payouts"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> 
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  href="/register/agent" 
                  className="relative w-full bg-emerald-500 text-black text-center py-5 text-xs font-bold uppercase tracking-[0.2em] transition-all block rounded overflow-hidden group-hover:bg-emerald-400"
                >
                  <span className="relative z-10">{t('startFreeMonth')}</span>
                </Link>
              </motion.div>

              {/* Standard Monthly Card */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/5 p-8 md:p-12 flex flex-col justify-between rounded-2xl"
              >
                <div>
                  <span className="bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 inline-block mb-6 rounded-full border border-white/10">
                    {t('standardPlan')}
                  </span>
                  <h3 className="text-2xl font-serif text-white mb-2">{t('monthlyMem')}</h3>
                  <div className="text-5xl font-serif text-white mb-8">
                    ₦1,500 <span className="text-sm font-sans font-light text-gray-400">{t('perMonthTxt')}</span>
                  </div>
                  
                  <ul className="space-y-4 text-sm text-gray-300 font-light mb-10">
                    {[
                      "Everything in Free Trial",
                      "Priority Listing Boost in Search Results",
                      "Featured Placement on Homepage",
                      "Dedicated Account Manager Support",
                      "5% Added Commission Model"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 opacity-80">
                        <Check className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" /> 
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  href="/register/agent" 
                  className="w-full border border-white/20 text-white text-center py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors block rounded"
                >
                  {t('regAsAgent')}
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== FAQ SECTION FOR AGENTS ===== */}
        <section id="faq" className="py-24 px-6 md:px-20 max-w-5xl mx-auto scroll-mt-20">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold">{t('agentFaq')}</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mt-2">{t('faqTitle')}</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111] border border-white/10 p-6 rounded">
              <h3 className="text-lg font-serif text-white mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" /> {t('faq1Q')}
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed pl-6">
                {t('faq1A')}
              </p>
            </div>

            <div className="bg-[#111] border border-white/10 p-6 rounded">
              <h3 className="text-lg font-serif text-white mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" /> {t('faq2Q')}
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed pl-6">
                {t('faq2A')}
              </p>
            </div>

            <div className="bg-[#111] border border-white/10 p-6 rounded">
              <h3 className="text-lg font-serif text-white mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" /> {t('faq3Q')}
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed pl-6">
                {t('faq3A')}
              </p>
            </div>
          </div>
        </section>

        {/* ===== CTA FOOTER ===== */}
        <section className="bg-emerald-500 text-black py-20 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 font-bold">{t('joinAgentsTitle')}</h2>
            <p className="text-black/80 text-lg font-normal mb-8">
              {t('joinAgentsDesc')}
            </p>
            <Link 
              href="/register/agent" 
              className="bg-black text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors inline-block shadow-2xl"
            >
              {t('getStartedFree')}
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
