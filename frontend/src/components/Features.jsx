import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "./ProductsOverview";

export default function Features() {
  const navigate = useNavigate();

  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Live Preview"
          title="Watch our strategies in real-time"
          subtitle="Live streaming of our indicator and algorithm performance directly from our VPS."
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-2xl p-6"
          >
            <div className="text-[12px] text-slate-500 mb-2">Indicator</div>
            <div className="font-display text-[22px] text-slate-900 font-semibold tracking-tight mb-4">Live Indicator Stream</div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex items-center justify-center">
              <span className="text-slate-500 text-[14px]">[Live indicator preview]</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-strong rounded-2xl p-6"
          >
            <div className="text-[12px] text-slate-500 mb-2">Algo</div>
            <div className="font-display text-[22px] text-slate-900 font-semibold tracking-tight mb-4">Live Algo Stream</div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex items-center justify-center">
              <span className="text-slate-500 text-[14px]">[Live algo preview]</span>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/live")}
            className="btn-primary !py-3 !px-7 !text-[15px] font-medium"
          >
            View Full Live Stream
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
