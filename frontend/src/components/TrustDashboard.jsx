import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Eye, Circle } from "lucide-react";
import { TRUST_BADGES, TRUST_STATS } from "../mock";
import AnimatedNumber from "./AnimatedNumber";
import MagneticButton from "./MagneticButton";

export default function TrustDashboard() {
  const navigate = useNavigate();
  const [currentPrice, setCurrentPrice] = useState(2345.67);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice((prev) => {
        const change = (Math.random() - 0.48) * 2.5;
        return parseFloat((prev + change).toFixed(2));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center mb-12">
          <p className="text-[12px] uppercase tracking-[0.18em] text-slate-500">
            Trusted by traders worldwide
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Left Column: Trust Stats */}
          <div className="lg:col-span-1 space-y-3">
            {TRUST_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="glass-strong rounded-2xl p-5"
              >
                <div className="font-display text-[32px] sm:text-[40px] text-slate-900 font-semibold tracking-tight leading-none">
                  <AnimatedNumber value={s.value} />
                </div>
                <div className="mt-2 text-[13px] text-slate-600">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Live Preview */}
          <div className="lg:col-span-2">
            <div className="relative glass-strong rounded-3xl p-6 sm:p-8 border-2 border-gradient-to-r from-blue-400 to-violet-500 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/5 pointer-events-none" />
              <div className="relative z-10">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Indicator Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="glass-strong rounded-2xl p-6 sm:p-7 relative overflow-hidden border border-slate-200 shadow-lg"
                  >
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400/25 via-cyan-400/15 to-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                      {/* INDICATOR Label */}
                      <div className="text-[13px] text-blue-700 font-semibold uppercase tracking-widest mb-3">INDICATOR</div>
                      
                      {/* LIVE Badge */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative">
                          <Circle className="h-3.5 w-3.5 fill-red-500 text-red-500 animate-ping" />
                          <Circle className="h-3.5 w-3.5 fill-red-500 text-red-500 absolute top-0 left-0" />
                        </div>
                        <span className="text-[13px] font-bold text-slate-800 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full">LIVE</span>
                      </div>

                      {/* Watching Count */}
                      <div className="flex items-center gap-1.5 text-[12px] text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-full">
                        <Eye className="h-3.5 w-3.5" />
                        <span>642 watching</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Algo Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="glass-strong rounded-2xl p-6 sm:p-7 relative overflow-hidden border border-slate-200 shadow-lg"
                  >
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-violet-400/25 via-purple-400/15 to-pink-400/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                      {/* ALGO Label */}
                      <div className="text-[13px] text-violet-700 font-semibold uppercase tracking-widest mb-3">ALGO</div>
                      
                      {/* LIVE Badge */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative">
                          <Circle className="h-3.5 w-3.5 fill-red-500 text-red-500 animate-ping" />
                          <Circle className="h-3.5 w-3.5 fill-red-500 text-red-500 absolute top-0 left-0" />
                        </div>
                        <span className="text-[13px] font-bold text-slate-800 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full">LIVE</span>
                      </div>

                      {/* Watching Count */}
                      <div className="flex items-center gap-1.5 text-[12px] text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-full">
                        <Eye className="h-3.5 w-3.5" />
                        <span>605 watching</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-6 flex justify-center">
                  <MagneticButton onClick={() => navigate("/live")} className="!py-3 !px-7 !text-[15px]">
                    Watch Both Streams
                    <ArrowRight className="h-4 w-4" />
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 relative overflow-hidden">
          <div className="flex gap-3 animate-marquee w-max">
            {[...TRUST_BADGES, ...TRUST_BADGES, ...TRUST_BADGES].map((b, i) => (
              <div
                key={i}
                className="glass rounded-xl px-5 py-3 flex flex-col min-w-[180px]"
              >
                <span className="text-[14px] text-slate-900 font-medium">{b.label}</span>
                <span className="text-[11px] text-slate-500">{b.sub}</span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F8FAFC] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F8FAFC] to-transparent" />
        </div>
      </div>
    </section>
  );
}
