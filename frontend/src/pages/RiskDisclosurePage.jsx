import React from "react";
import { motion } from "framer-motion";

export default function RiskDisclosurePage() {
  return (
    <main className="bg-app">
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative mx-auto max-w-4xl px-5">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex glass rounded-full px-3 py-1 text-[11.5px] uppercase tracking-[0.18em] text-slate-700">
              Legal
            </div>
            <h1 className="mt-5 font-display text-[44px] sm:text-[56px] font-semibold tracking-tight leading-[1.05] text-slate-900">
              Risk <span className="text-gradient-accent">disclosure.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-4xl px-5">
          <div className="glass-strong rounded-2xl p-7 sm:p-9 border-2 border-rose-200">
            <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 px-4 py-3 mb-6">
              <p className="text-[14px] text-rose-700 font-medium">
                IMPORTANT: Trading derivatives carries substantial risk and may not be suitable for all investors.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">1. Risk of Loss</h2>
                <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">
                  You can lose all or more of your initial investment. Past performance does not guarantee future results.
                </p>
              </div>
              <div>
                <h2 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">2. Leverage Risk</h2>
                <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">
                  High leverage can work against you as well as for you. You should be aware of the risks of leveraged trading.
                </p>
              </div>
              <div>
                <h2 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">3. No Financial Advice</h2>
                <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">
                  SpikeBulls products are technology tools only. We do not provide financial advice, and you are solely responsible for your trading decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
