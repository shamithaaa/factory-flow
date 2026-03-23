import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";

const tabs = [
  { key: "all", label: "All", count: 412 }, { key: "draft", label: "Draft", count: 8 },
  { key: "pending", label: "Pending Approval", count: 12 }, { key: "approved", label: "Approved", count: 24 },
  { key: "ordered", label: "Ordered", count: 87 }, { key: "partial", label: "Partially Received", count: 34 },
  { key: "received", label: "Fully Received", count: 241 }, { key: "cancelled", label: "Cancelled", count: 6 },
];

const pos = [
  { po: "PO-2026-0498", vendor: "Reliance Polymers", date: "20 Mar 2026", delivery: "27 Mar 2026", value: "₹4.10L", items: 2, received: 0, payment: "Pending", status: "Ordered" },
  { po: "PO-2026-0495", vendor: "Rashtriya Chemicals", date: "18 Mar 2026", delivery: "1 Apr 2026", value: "₹72,500", items: 1, received: 0, payment: "Pending", status: "Ordered" },
  { po: "PO-2026-0490", vendor: "Galaxy Surfactants", date: "15 Mar 2026", delivery: "22 Mar 2026", value: "₹2.22L", items: 2, received: 65, payment: "Partial", status: "Partially Received" },
  { po: "PO-2026-0488", vendor: "Aarti Industries", date: "14 Mar 2026", delivery: "24 Mar 2026", value: "₹1.68L", items: 1, received: 100, payment: "Paid", status: "Fully Received" },
  { po: "PO-2026-0485", vendor: "Mold-Tek Containers", date: "12 Mar 2026", delivery: "17 Mar 2026", value: "₹4.20L", items: 3, received: 100, payment: "Paid", status: "Fully Received" },
  { po: "PO-2026-0482", vendor: "Tronox India", date: "10 Mar 2026", delivery: "16 Mar 2026", value: "₹6.40L", items: 1, received: 80, payment: "Partial", status: "Partially Received" },
  { po: "PO-2026-0478", vendor: "Uflex Packaging", date: "8 Mar 2026", delivery: "12 Mar 2026", value: "₹1.85L", items: 4, received: 100, payment: "Paid", status: "Fully Received" },
  { po: "PO-2026-0475", vendor: "Deepak Nitrite", date: "5 Mar 2026", delivery: "10 Mar 2026", value: "₹1.14L", items: 2, received: 100, payment: "Paid", status: "Fully Received" },
  { po: "PO-2026-0500", vendor: "Givaudan India", date: "22 Mar 2026", delivery: "1 Apr 2026", value: "₹2.80L", items: 1, received: 0, payment: "Pending", status: "Pending Approval" },
  { po: "PO-2026-0501", vendor: "Gujarat Alkalies", date: "23 Mar 2026", delivery: "28 Mar 2026", value: "₹22,000", items: 1, received: 0, payment: "Pending", status: "Draft" },
  { po: "PO-2026-0472", vendor: "SRF Limited", date: "3 Mar 2026", delivery: "10 Mar 2026", value: "₹3.45L", items: 2, received: 100, payment: "Paid", status: "Fully Received" },
  { po: "PO-2026-0468", vendor: "Hindustan Zinc", date: "1 Mar 2026", delivery: "8 Mar 2026", value: "₹5.20L", items: 1, received: 100, payment: "Paid", status: "Fully Received" },
];

const statusMap: Record<string, "green" | "amber" | "red" | "blue" | "gray"> = {
  "Draft": "gray", "Pending Approval": "amber", "Approved": "blue", "Ordered": "blue",
  "Partially Received": "amber", "Fully Received": "green", "Cancelled": "red",
};

export default function PurchaseOrders() {
  const [tab, setTab] = useState("all");

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between animate-fade-in-up">
        <h2 className="text-lg font-semibold">Purchase Orders</h2>
        <button className="h-8 px-3 bg-accent text-accent-foreground rounded-md text-xs font-medium hover:opacity-90">+ Create PO</button>
      </div>
      <div className="flex gap-1 border-b border-border overflow-x-auto animate-fade-in-up stagger-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${tab === t.key ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {t.label} ({t.count})
          </button>
        ))}
      </div>
      <div className="bg-card rounded-lg border border-border overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead><tr className="bg-secondary/50 border-b border-border">
              {["PO Number", "Vendor", "Order Date", "Expected Delivery", "Value", "Items", "Received %", "Payment", "Status"].map(h =>
                <th key={h} className="text-left px-3 py-2.5 font-medium text-muted-foreground whitespace-nowrap">{h}</th>
              )}
            </tr></thead>
            <tbody>
              {pos.map((p, i) => (
                <tr key={i} className="border-b border-border hover:bg-secondary/30 cursor-pointer">
                  <td className="px-3 py-2 font-mono text-xs text-accent">{p.po}</td>
                  <td className="px-3 py-2 font-medium">{p.vendor}</td>
                  <td className="px-3 py-2">{p.date}</td>
                  <td className="px-3 py-2">{p.delivery}</td>
                  <td className="px-3 py-2 tabular-nums">{p.value}</td>
                  <td className="px-3 py-2 tabular-nums">{p.items}</td>
                  <td className="px-3 py-2 tabular-nums">{p.received}%</td>
                  <td className="px-3 py-2"><StatusBadge status={p.payment === "Paid" ? "green" : p.payment === "Partial" ? "amber" : "gray"} label={p.payment} /></td>
                  <td className="px-3 py-2"><StatusBadge status={statusMap[p.status]} label={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
