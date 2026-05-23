import React from "react";
import { motion } from "framer-motion";
import FinalCTA from "../components/FinalCTA";

export default function AboutPage() {
  return (
    <main className="bg-app">
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative mx-auto max-w-5xl px-5">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex glass rounded-full px-3 py-1 text-[11.5px] uppercase tracking-[0.18em] text-slate-700">
              About us
            </div>
            <h1 className="mt-5 font-display text-[44px] sm:text-[56px] font-semibold tracking-tight leading-[1.05] text-slate-900">
              Built by traders, <span className="text-gradient-accent">for traders.</span>
            </h1>
            <p className="mt-5 text-slate-600 text-[16px] leading-relaxed max-w-3xl">
              We started SpikeBulls because we were tired of the noise, the hype, and the empty promises in the retail trading space. 
              Our mission is simple: build institutional-grade tools that actually perform, with zero gimmicks, zero repainting, and zero nonsense.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Precision First",
                desc: "Every indicator and algorithm is backtested across years of tick data before it ships. We don't ship anything we wouldn't trade ourselves."
              },
              {
                title: "No Hype, Just Results",
                desc: "No fake signals, no paid actors, just real performance. Our track record speaks for itself."
              },
              {
                title: "Lifetime Support",
                desc: "When you buy from us, you're part of the family. Updates are lifetime, support is lifetime."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-7 border border-slate-200"
              >
                <h3 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">{item.title}</h3>
                <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
