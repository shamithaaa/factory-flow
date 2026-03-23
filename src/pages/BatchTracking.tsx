import StatusBadge from "@/components/StatusBadge";
import { Search } from "lucide-react";

const batches = [
  { batch: "B-2026-0412", material: "Industrial Cleaner 5L", qty: "1,800 units", mfgDate: "18 Mar 2026", expiry: "18 Mar 2028", warehouse: "Pune Plant", bin: "FG-A12", qc: "Approved", age: "5 days" },
  { batch: "B-2026-0408", material: "Floor Polish 1L", qty: "4,200 units", mfgDate: "15 Mar 2026", expiry: "15 Sep 2027", warehouse: "Mumbai WH", bin: "FG-B04", qc: "Approved", age: "8 days" },
  { batch: "B-2026-0401", material: "Hand Wash 250ml", qty: "8,500 units", mfgDate: "12 Mar 2026", expiry: "12 Mar 2028", warehouse: "Pune Plant", bin: "FG-C08", qc: "Approved", age: "11 days" },
  { batch: "B-2026-0395", material: "Dish Wash 500ml", qty: "3,100 units", mfgDate: "10 Mar 2026", expiry: "10 Mar 2028", warehouse: "Delhi Depot", bin: "FG-A02", qc: "Quarantine", age: "13 days" },
  { batch: "B-2026-0388", material: "Glass Cleaner 1L", qty: "2,600 units", mfgDate: "8 Mar 2026", expiry: "8 Mar 2028", warehouse: "Pune Plant", bin: "FG-D11", qc: "Approved", age: "15 days" },
  { batch: "B-2026-0380", material: "Toilet Cleaner 500ml", qty: "5,800 units", mfgDate: "5 Mar 2026", expiry: "5 Sep 2027", warehouse: "Chennai Hub", bin: "FG-B07", qc: "Approved", age: "18 days" },
  { batch: "B-2026-0371", material: "Surface Disinfectant 5L", qty: "1,200 units", mfgDate: "1 Mar 2026", expiry: "1 Mar 2028", warehouse: "Pune Plant", bin: "FG-A15", qc: "Approved", age: "22 days" },
  { batch: "B-2025-1245", material: "Bathroom Cleaner 500ml", qty: "420 units", mfgDate: "15 Dec 2025", expiry: "15 Apr 2026", warehouse: "Mumbai WH", bin: "FG-C03", qc: "Approved", age: "98 days" },
];

const expiringBatches = [
  { batch: "B-2025-1245", material: "Bathroom Cleaner 500ml", qty: "420 units", expiry: "15 Apr 2026", value: "₹1.26L" },
  { batch: "B-2025-1198", material: "Fabric Softener 1L", qty: "180 units", expiry: "22 Apr 2026", value: "₹0.54L" },
  { batch: "B-2025-1150", material: "Multi-Surface Cleaner", qty: "340 units", expiry: "30 Apr 2026", value: "₹0.85L" },
];

export default function BatchTracking() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between animate-fade-in-up">
        <h2 className="text-lg font-semibold">Batch & Serial Tracking</h2>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Search batch, serial, or material..." className="w-full h-9 pl-9 pr-3 rounded-lg border border-input bg-card text-sm" />
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-4 animate-fade-in-up stagger-1">
        <h3 className="text-sm font-semibold mb-3">Traceability: Batch B-2026-0412</h3>
        <div className="grid grid-cols-2 gap-4 text-sm font-mono">
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">← Backward Trace</h4>
            <div className="space-y-1 text-xs">
              <div>📦 RM Batch: RM-B-4023-0089 — SLS — 640 kg — Galaxy Surfactants — GRN-2026-0312</div>
              <div>📦 RM Batch: RM-B-5018-0045 — EDTA — 96 kg — Aarti Industries — GRN-2026-0298</div>
              <div>📦 RM Batch: RM-B-7044-0201 — DM Water — 3,600 L — Aqua Pure — GRN-2026-0305</div>
              <div>📦 PM Batch: PM-B-1001-0120 — HDPE Bottle 5L — 2,000 pcs — Mold-Tek — GRN-2026-0310</div>
              <div>✅ QC Lot: QC-2026-0412 — All parameters passed — 18 Mar 2026</div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Forward Trace →</h4>
            <div className="space-y-1 text-xs">
              <div>📤 SO-4521 — Reliance Retail — 800 units — INV-2026-1845 — Delivered 20 Mar</div>
              <div>📤 SO-4528 — DMart — 500 units — INV-2026-1852 — In Transit</div>
              <div>📍 Remaining: 500 units in Pune Plant (FG-A12)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-card rounded-lg border border-border overflow-hidden animate-fade-in-up stagger-2">
          <table className="w-full text-[13px]">
            <thead><tr className="bg-secondary/50 border-b border-border">
              {["Batch", "Material", "Qty", "Mfg Date", "Expiry", "Warehouse", "Bin", "QC", "Age"].map(h => <th key={h} className="text-left px-3 py-2.5 font-medium text-muted-foreground">{h}</th>)}
            </tr></thead>
            <tbody>
              {batches.map((b, i) => (
                <tr key={i} className="border-b border-border hover:bg-secondary/30 cursor-pointer">
                  <td className="px-3 py-2 font-mono text-xs text-accent">{b.batch}</td>
                  <td className="px-3 py-2 font-medium">{b.material}</td>
                  <td className="px-3 py-2 tabular-nums">{b.qty}</td>
                  <td className="px-3 py-2">{b.mfgDate}</td>
                  <td className="px-3 py-2">{b.expiry}</td>
                  <td className="px-3 py-2">{b.warehouse}</td>
                  <td className="px-3 py-2 font-mono text-xs">{b.bin}</td>
                  <td className="px-3 py-2"><StatusBadge status={b.qc === "Approved" ? "green" : "amber"} label={b.qc} /></td>
                  <td className="px-3 py-2">{b.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 animate-fade-in-up stagger-3">
          <h3 className="text-sm font-semibold mb-3 text-danger">Expiring Within 30 Days</h3>
          <div className="space-y-3">
            {expiringBatches.map((b, i) => (
              <div key={i} className="p-2.5 rounded-md bg-danger/5 border border-danger/10">
                <div className="text-xs font-mono text-accent">{b.batch}</div>
                <div className="text-sm font-medium">{b.material}</div>
                <div className="text-xs text-muted-foreground">{b.qty} · Expires {b.expiry} · {b.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
