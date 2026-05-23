import React from "react";
import { motion } from "framer-motion";
import FinalCTA from "../components/FinalCTA";

export default function DocumentationPage() {
  return (
    <main className="bg-app">
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative mx-auto max-w-5xl px-5">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex glass rounded-full px-3 py-1 text-[11.5px] uppercase tracking-[0.18em] text-slate-700">
              Docs
            </div>
            <h1 className="mt-5 font-display text-[44px] sm:text-[56px] font-semibold tracking-tight leading-[1.05] text-slate-900">
              Product <span className="text-gradient-accent">documentation.</span>
            </h1>
            <p className="mt-5 text-slate-600 text-[16px] leading-relaxed max-w-3xl">
              Complete guides, setup instructions, and reference material for all SpikeBulls products.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "MT5 Indicator Pro", desc: "Installation, configuration, and signal interpretation guide." },
              { title: "Algo Strategy", desc: "VPS setup, risk parameters, and strategy configuration." },
              { title: "Forex Signals Pro", desc: "Signal delivery, risk management, and trade management." },
              { title: "Automation Suite", desc: "Trade copier, risk manager, and execution toolkit docs." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer"
              >
                <h3 className="font-display text-[18px] font-semibold tracking-tight text-slate-900">{item.title}</h3>
                <p className="mt-2 text-slate-600 text-[14px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
