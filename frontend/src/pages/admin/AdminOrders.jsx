import React, { useEffect, useState } from "react";
import { Loader2, Search, CheckCircle2, XCircle } from "lucide-react";
import { api } from "../../lib/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState({});
  const [q, setQ] = useState("");
  useEffect(() => {
    api.get("/admin/orders").then((r) => setOrders(r.data)).finally(() => setLoading(false));
  }, []);
  
  const getStatusColor = (status) => {
    switch(status) {
      case "active":
      case "paid":
      case "fulfilled":
        return "bg-emerald-500/10 text-emerald-600";
      case "pending":
        return "bg-amber-500/10 text-amber-600";
      case "rejected":
      case "failed":
      case "refunded":
      case "cancelled":
        return "bg-rose-500/10 text-rose-600";
      case "expired":
        return "bg-slate-500/10 text-slate-600";
      default:
        return "bg-slate-500/10 text-slate-600";
    }
  };
  
  const handleActivate = async (orderId) => {
    try {
      setProcessing(prev => ({ ...prev, [orderId]: true }));
      const res = await api.post(`/admin/orders/${orderId}/activate`);
      setOrders(orders.map(o => o.id === orderId ? res.data : o));
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to activate order");
    } finally {
      setProcessing(prev => ({ ...prev, [orderId]: false }));
    }
  };
  
  const handleReject = async (orderId) => {
    if (!window.confirm("Are you sure you want to reject this order?")) return;
    try {
      setProcessing(prev => ({ ...prev, [orderId]: true }));
      const res = await api.post(`/admin/orders/${orderId}/reject`);
      setOrders(orders.map(o => o.id === orderId ? res.data : o));
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to reject order");
    } finally {
      setProcessing(prev => ({ ...prev, [orderId]: false }));
    }
  };
  
  const filtered = orders.filter((o) =>
    !q || 
    o.user_email?.toLowerCase().includes(q.toLowerCase()) || 
    o.id.includes(q) ||
    o.customer_name?.toLowerCase().includes(q.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-display text-[32px] text-slate-900 font-semibold tracking-tight">Orders</h1>
          <p className="text-slate-600 text-[14px] mt-1">
            {orders.length} total · 
            ${orders.filter((o) => o.status === "paid" || o.status === "active" || o.status === "fulfilled").reduce((s, o) => s + o.total, 0).toFixed(0)} revenue
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search email, order id, or customer name"
            className="pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-200 text-[13px] text-slate-900 focus:outline-none focus:border-blue-400/50" />
        </div>
      </div>

      {loading ? <Loader2 className="h-5 w-5 animate-spin text-slate-500" /> : (
        <div className="glass rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-[13px] min-w-[1200px]">
            <thead><tr className="text-left text-slate-500 text-[11.5px] uppercase tracking-wider border-b border-slate-200">
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Items</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">MT5 Acc</th>
              <th className="px-5 py-3">Duration</th>
              <th className="px-5 py-3">Expires</th>
              <th className="px-5 py-3">Actions</th>
              <th className="px-5 py-3">Date</th>
            </tr></thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-5 py-3 text-slate-600 font-mono text-[11.5px]">{o.id.slice(0, 8)}</td>
                  <td className="px-5 py-3">
                    <div className="text-slate-800 font-medium">{o.customer_name || "-"}</div>
                    <div className="text-slate-500 text-[12px]">{o.user_email}</div>
                    {o.customer_phone && <div className="text-slate-500 text-[11px]">{o.customer_phone}</div>}
                  </td>
                  <td className="px-5 py-3 text-slate-700">{o.items.map((i) => i.name).join(", ")}</td>
                  <td className="px-5 py-3 text-slate-900">${o.total.toFixed(2)}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] ${getStatusColor(o.status)}`}>{o.status}</span>
                    {o.simulated && <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-violet-500/10 text-violet-600">sim</span>}
                  </td>
                  <td className="px-5 py-3 text-slate-700 text-[12px]">{o.mt5_account_number || "-"}</td>
                  <td className="px-5 py-3 text-slate-700 text-[12px]">{o.subscription_duration ? `${o.subscription_duration} days` : "-"}</td>
                  <td className="px-5 py-3 text-slate-600 text-[12px]">{o.subscription_expires_at ? new Date(o.subscription_expires_at).toLocaleDateString() : "-"}</td>
                  <td className="px-5 py-3">
                    {o.status === "pending" && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleActivate(o.id)} 
                          disabled={processing[o.id]}
                          className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 rounded-md text-[12px]"
                        >
                          {processing[o.id] ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle2 className="h-3 w-3" />}
                          Activate
                        </button>
                        <button 
                          onClick={() => handleReject(o.id)} 
                          disabled={processing[o.id]}
                          className="flex items-center gap-1 px-2 py-1 bg-rose-500/10 text-rose-700 hover:bg-rose-500/20 rounded-md text-[12px]"
                        >
                          {processing[o.id] ? <Loader2 className="h-3 w-3 animate-spin" /> : <XCircle className="h-3 w-3" />}
                          Reject
                        </button>
                      </div>
                    )}
                    {o.binance_transaction_id && (
                      <div className="text-[11px] text-slate-500 mt-1">TX: {o.binance_transaction_id}</div>
                    )}
                  </td>
                  <td className="px-5 py-3 text-slate-600">{new Date(o.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={10} className="px-5 py-10 text-center text-slate-500">No orders found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
