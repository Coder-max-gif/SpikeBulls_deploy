import React from "react";
import { motion } from "framer-motion";
import Performance from "../components/Performance";
import FinalCTA from "../components/FinalCTA";

export default function PerformancePage() {
  return (
    <main className="bg-app">
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative mx-auto max-w-5xl px-5 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex glass rounded-full px-3 py-1 text-[11.5px] uppercase tracking-[0.18em] text-slate-700">
              Track record
            </div>
            <h1 className="mt-5 font-display text-[44px] sm:text-[56px] font-semibold tracking-tight leading-[1.05] text-slate-900">
              Real <span className="text-gradient-accent">performance</span>, real results.
            </h1>
            <p className="mt-5 text-slate-600 text-[16px] leading-relaxed max-w-3xl mx-auto">
              Transparency is everything. Below is the verified performance of our strategies across the last 12 months.
            </p>
          </motion.div>
        </div>
      </section>

      <Performance />
      <FinalCTA />
    </main>
  );
}
