import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Loader2, Copy, Key, Receipt } from "lucide-react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function CheckoutSuccessPage() {
  const [params] = useSearchParams();
  const orderId = params.get("order_id");
  const simulated = params.get("simulated") === "1";
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedKey, setCopiedKey] = useState("");
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    if (!orderId || !isAuthenticated) {
      setLoading(false);
      return;
    }
    api
      .get(`/checkout/orders/${orderId}`)
      .then((r) => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
      
    const storedPaymentInfo = sessionStorage.getItem("binancePaymentInfo");
    if (storedPaymentInfo) {
      setPaymentInfo(JSON.parse(storedPaymentInfo));
    }
  }, [orderId, isAuthenticated]);

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(""), 1500);
  };

  return (
    <main className="bg-app min-h-screen">
      <section className="relative pt-32 pb-20 sm:pt-40">
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative mx-auto max-w-2xl px-5 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7 text-emerald-400" />
            </div>
            <h1 className="mt-6 font-display text-[40px] sm:text-[52px] text-slate-900 font-semibold tracking-tight">Order confirmed!</h1>
            <p className="mt-3 text-slate-600 text-[15.5px]">
              Thanks for your purchase! We will send you the product files and instructions via email within 24 hours.
              {simulated && (
                <span className="block mt-2 text-amber-600 text-[13px]">
                  (Simulated checkout — enable Stripe in backend/.env for live payments.)
                </span>
              )}
            </p>

            {(data?.order?.status === "pending" || paymentInfo) && (
              <div className="mt-8 glass-strong rounded-2xl p-6 text-left border-2 border-amber-400/30">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-[18px] text-slate-900 font-medium">📱 Complete Payment via Binance/Trust Wallet</h2>
                </div>
                <div className="space-y-4 text-[14px] text-slate-700">
                  <p><strong>1.</strong> Open your Binance app or Trust Wallet</p>
                  <p><strong>2.</strong> Send USDT to this address:</p>
                  <div className="bg-slate-100 p-4 rounded-lg font-mono text-[12px] break-all border border-slate-200 flex items-center gap-3">
                    <span className="flex-1">{paymentInfo?.binance_address || "Your Binance USDT address will be here"}</span>
                    <button
                      onClick={() => copy(paymentInfo?.binance_address || "")}
                      className="shrink-0 text-blue-600 hover:text-blue-700 text-[12px] font-medium"
                    >
                      {copiedKey === paymentInfo?.binance_address ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  {paymentInfo?.payment_instructions && (
                    <p><strong>3.</strong> {paymentInfo.payment_instructions}</p>
                  )}
                  <p><strong>4.</strong> After sending, you'll receive your product within 24 hours!</p>
                  <p><strong>5.</strong> You can check your order status in your dashboard anytime.</p>
                </div>
              </div>
            )}

            <div className="mt-8 glass-strong rounded-2xl p-6 text-left">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-[18px] text-slate-900 font-medium">What happens next?</h2>
                <Key className="h-4 w-4 text-slate-600" />
              </div>
              <div className="space-y-4 text-[14px] text-slate-700">
                <p>1. We will review your order and verify your payment.</p>
                <p>2. Within 24 hours, we will send you an email with the product files, installation instructions, and any other relevant information.</p>
                <p>3. Please make sure you check your email inbox (and spam folder, just in case) at the email address you used to sign up!</p>
                <p>4. If you don't receive anything within 24 hours, please contact us via our contact page.</p>
              </div>
            </div>

            <div className="mt-8 glass-strong rounded-2xl p-6 text-left">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-[18px] text-slate-900 font-medium">Your order details</h2>
                <Receipt className="h-4 w-4 text-slate-600" />
              </div>
              {loading ? (
                <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-slate-500" /></div>
              ) : !data ? (
                <p className="text-[13.5px] text-slate-600">Sign in to view your order details.</p>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Order ID:</span>
                    <span className="text-slate-900 font-mono text-[12px]">{data.order.id.slice(0, 8)}...</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Items:</span>
                    <span className="text-slate-900">{data.order.items.map((i) => i.name).join(", ")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Total:</span>
                    <span className="text-slate-900 font-semibold">${data.order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Status:</span>
                    <span className={`px-2 py-0.5 rounded-md text-[11px] whitespace-nowrap ${
                      data.order.status === "paid" ? "bg-emerald-500/10 text-emerald-600" :
                      data.order.status === "pending" ? "bg-amber-500/10 text-amber-600" :
                      "bg-rose-500/10 text-rose-600"
                    }`}>{data.order.status}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/dashboard" className="btn-primary">Go to dashboard <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/contact" className="btn-ghost">Contact us</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
