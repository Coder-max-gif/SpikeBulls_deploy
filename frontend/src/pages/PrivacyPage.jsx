import React from "react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
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
              Privacy <span className="text-gradient-accent">policy.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-4xl px-5">
          <div className="glass-strong rounded-2xl p-7 sm:p-9 space-y-6">
            <div>
              <h2 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">1. Information We Collect</h2>
              <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">
                We collect information you provide directly, such as your name, email address, and payment information when you make a purchase.
              </p>
            </div>
            <div>
              <h2 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">2. How We Use Your Information</h2>
              <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">
                We use your information to process orders, deliver products, provide support, and communicate with you about updates and new products.
              </p>
            </div>
            <div>
              <h2 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">3. Data Protection</h2>
              <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">
                We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
