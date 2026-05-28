import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, ArrowRight } from "lucide-react";
import { PERFORMANCE_METRICS, EQUITY_CURVE } from "../mock";
import { SectionHeader } from "./ProductsOverview";
import AnimatedNumber from "./AnimatedNumber";
import { useNavigate } from "react-router-dom";

export default function Performance() {
  const navigate = useNavigate();

  return (
    <section id="performance" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Performance"
          title="Numbers that hold up under audit"
          subtitle="Live streaming of our indicator and algorithm performance directly from our VPS. Past performance is not a guarantee of future results."
        />

        {/* Live Streaming Sections */}
        <div className="mt-14 grid lg:grid-cols-2 gap-5 mb-10">
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
              <span className="text-slate-500 text-[14px]">[Live indicator stream from VPS will appear here]</span>
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
              <span className="text-slate-500 text-[14px]">[Live algo stream from VPS will appear here]</span>
            </div>
          </motion.div>
        </div>

        <div className="mt-4 flex justify-center mb-16">
          <button
            onClick={() => navigate("/live")}
            className="btn-primary !py-3 !px-7 !text-[15px] font-medium"
          >
            View Full Live Stream
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-10 text-center text-[12px] text-slate-500 max-w-2xl mx-auto">
          Results shown reflect a live forward-tested portfolio. Trading carries risk; past performance does not guarantee future results.
        </p>
      </div>
    </section>
  );
}
