import React from "react";
import { motion } from "framer-motion";
import FinalCTA from "../components/FinalCTA";

export default function SetupGuidePage() {
  return (
    <main className="bg-app">
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative mx-auto max-w-5xl px-5">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex glass rounded-full px-3 py-1 text-[11.5px] uppercase tracking-[0.18em] text-slate-700">
              Setup
            </div>
            <h1 className="mt-5 font-display text-[44px] sm:text-[56px] font-semibold tracking-tight leading-[1.05] text-slate-900">
              Step-by-step <span className="text-gradient-accent">setup guide.</span>
            </h1>
            <p className="mt-5 text-slate-600 text-[16px] leading-relaxed max-w-3xl">
              Get up and running in under 5 minutes with our guided setup process.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-5">
          <div className="space-y-6">
            {[
              { step: "01", title: "Download & Install MT5", desc: "Install MetaTrader 5 from your broker or the official MetaQuotes website." },
              { step: "02", title: "Activate Your License", desc: "Use the license key from your purchase email to activate your product." },
              { step: "03", title: "Import Files", desc: "Copy the indicator or EA files to your MT5 MQL5 directory." },
              { step: "04", title: "Restart & Apply", desc: "Restart MT5, apply the indicator/EA to your chart, and start trading." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-slate-200 flex items-center justify-center text-blue-700 font-display text-[18px] font-semibold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-slate-600 text-[14px] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
