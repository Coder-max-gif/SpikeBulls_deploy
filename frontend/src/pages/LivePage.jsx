import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Eye, Circle, LineChart, Bot } from "lucide-react";
import FinalCTA from "../components/FinalCTA";
import { SectionHeader } from "../components/ProductsOverview";

export default function LivePage() {
  const [currentPrice, setCurrentPrice] = useState(2345.67);
  const [portfolioReturn, setPortfolioReturn] = useState(8.2);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice((prev) => {
        const change = (Math.random() - 0.48) * 2.5;
        return parseFloat((prev + change).toFixed(2));
      });
      setPortfolioReturn((prev) => {
        const change = (Math.random() - 0.5) * 0.2;
        return parseFloat((prev + change).toFixed(1));
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-app">
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative mx-auto max-w-5xl px-5 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex glass rounded-full px-3 py-1 text-[11.5px] uppercase tracking-[0.18em] text-slate-700">
              Live Streaming
            </div>
            <h1 className="mt-5 font-display text-[44px] sm:text-[56px] font-semibold tracking-tight leading-[1.05] text-slate-900">
              Live <span className="text-gradient-accent">indicator</span> & <span className="text-gradient-accent">algo</span> performance
            </h1>
            <p className="mt-5 text-slate-600 text-[16px] leading-relaxed max-w-3xl mx-auto">
              Real-time streaming from our VPS. Watch our indicators and algorithms in action.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Indicator Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0 }}
              className="glass-strong rounded-2xl p-6 sm:p-8 relative overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center border border-blue-200">
                      <LineChart className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="font-display text-[24px] sm:text-[28px] font-semibold tracking-tight text-slate-900">Live Indicator</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Circle className="h-2.5 w-2.5 fill-red-500 text-red-500 animate-pulse" />
                        <span className="text-[12px] font-medium text-slate-600 uppercase tracking-wider">LIVE</span>
                        <span className="text-slate-400">·</span>
                        <div className="flex items-center gap-1 text-[12px] text-slate-600">
                          <Eye className="h-3 w-3" />
                          <span>1,247 watching</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-[11px] text-slate-500">XAU/USD · M15</div>
                      <div className="font-display text-[28px] sm:text-[32px] text-slate-900 font-semibold">
                        ${currentPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-[11px] text-emerald-600 uppercase tracking-wider">Signal</div>
                      <div className="font-medium text-slate-900">BUY SIGNAL ACTIVE</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Algo Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="glass-strong rounded-2xl p-6 sm:p-8 relative overflow-hidden"
            >
              <div className="absolute -top-16 -left-16 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-violet-600/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-600/10 flex items-center justify-center border border-violet-200">
                      <Bot className="h-6 w-6 text-violet-600" />
                    </div>
                    <div>
                      <h2 className="font-display text-[24px] sm:text-[28px] font-semibold tracking-tight text-slate-900">Live Algo</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Circle className="h-2.5 w-2.5 fill-red-500 text-red-500 animate-pulse" />
                        <span className="text-[12px] font-medium text-slate-600 uppercase tracking-wider">LIVE</span>
                        <span className="text-slate-400">·</span>
                        <div className="flex items-center gap-1 text-[12px] text-slate-600">
                          <Eye className="h-3 w-3" />
                          <span>1,189 watching</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-[11px] text-slate-500">Portfolio Return (Today)</div>
                      <div className="font-display text-[28px] sm:text-[32px] text-slate-900 font-semibold">
                        {portfolioReturn > 0 ? "+" : ""}{portfolioReturn.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-[11px] text-emerald-600 uppercase tracking-wider">Status</div>
                      <div className="font-medium text-slate-900">ALGORITHM RUNNING</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
