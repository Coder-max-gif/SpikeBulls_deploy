import React from "react";
import { motion } from "framer-motion";

export default function TermsPage() {
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
              Terms of <span className="text-gradient-accent">service.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-4xl px-5">
          <div className="glass-strong rounded-2xl p-7 sm:p-9 space-y-8">
            <div>
              <h2 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">1. Acceptance of Terms</h2>
              <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">
                By accessing and using SpikeBulls products and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">2. Digital Products Only</h2>
              <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">
                SpikeBulls provides digital products only, including MT5 indicator and algorithm subscriptions. No physical products are offered.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">3. No Financial Advice</h2>
              <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">
                All SpikeBulls products are educational and technical tools only. We do not provide financial advice, investment recommendations, or trading signals as a service. You are solely responsible for your trading decisions and risk management.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">4. Manual Payment Verification</h2>
              <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">
                All payments are verified manually. After you submit payment, you must click "I Have Paid" and our team will verify your payment manually. Access is activated only after successful manual verification.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">5. Subscription Access</h2>
              <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">
                Subscription access is provided for the purchased period only (1 month, 6 months, or 1 year). Licenses are delivered manually via email after payment verification.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">6. No Sharing or Resale</h2>
              <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">
                Licenses are non-transferable and for personal use only. You may not share, resell, sublicense, or distribute your license or access to any third party.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">7. Refunds</h2>
              <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">
                Refunds are provided only when required by law. Due to the nature of digital products, all sales are generally final. Please contact support for any questions.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">8. Product Compatibility</h2>
              <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">
                Products are compatible with MetaTrader 5 (MT5) only. You are responsible for ensuring you have the correct platform and setup.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">9. Limitation of Liability</h2>
              <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">
                SpikeBulls is not responsible for any trading losses, damages, or losses incurred while using our products. Use at your own risk. Past performance does not guarantee future results.
              </p>
            </div>

            <div>
              <h2 className="font-display text-[20px] font-semibold tracking-tight text-slate-900">10. Account Suspension</h2>
              <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">
                Abuse or misuse of our products (including sharing, resale, or violation of these terms) may lead to suspension or termination of your access without refund.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
