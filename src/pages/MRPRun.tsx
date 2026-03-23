import { useState } from "react";
import { Zap, Clock, AlertTriangle, CheckCircle, Filter } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

const plannedOrders = [
  { code: "RM-1042", name: "Polypropylene Granules", warehouse: "Pune Plant", qty: "5,000 kg", orderDate: "29 Mar 2026", reqDate: "5 Apr 2026", vendor: "Reliance Polymers", lead: 7, status: "planned" },
  { code: "RM-2087", name: "Stearic Acid", warehouse: "Pune Plant", qty: "500 kg", orderDate: "Immediate", reqDate: "27 Mar 2026", vendor: "Rashtriya Chemicals", lead: 14, status: "exception" },
  { code: "RM-3011", name: "HDPE Resin", warehouse: "Mumbai WH", qty: "8,000 kg", orderDate: "1 Apr 2026", reqDate: "8 Apr 2026", vendor: "GAIL India", lead: 7, status: "firmed" },
  { code: "RM-4023", name: "Sodium Lauryl Sulphate", warehouse: "Pune Plant", qty: "1,200 kg", orderDate: "26 Mar 2026", reqDate: "2 Apr 2026", vendor: "Galaxy Surfactants", lead: 7, status: "planned" },
  { code: "RM-5018", name: "EDTA Disodium Salt", warehouse: "Pune Plant", qty: "300 kg", orderDate: "Immediate", reqDate: "28 Mar 2026", vendor: "Aarti Industries", lead: 10, status: "exception" },
  { code: "RM-6031", name: "Titanium Dioxide", warehouse: "Chennai Hub", qty: "2,000 kg", orderDate: "27 Mar 2026", reqDate: "3 Apr 2026", vendor: "Tronox India", lead: 6, status: "planned" },
  { code: "PM-1001", name: "HDPE Bottle 5L", warehouse: "Pune Plant", qty: "10,000 pcs", orderDate: "28 Mar 2026", reqDate: "4 Apr 2026", vendor: "Mold-Tek Containers", lead: 5, status: "firmed" },
  { code: "PM-1002", name: "Shrink Labels (Type A)", warehouse: "Mumbai WH", qty: "25,000 pcs", orderDate: "30 Mar 2026", reqDate: "6 Apr 2026", vendor: "Uflex Packaging", lead: 4, status: "planned" },
  { code: "RM-7044", name: "Demineralised Water", warehouse: "Pune Plant", qty: "15,000 L", orderDate: "25 Mar 2026", reqDate: "28 Mar 2026", vendor: "Aqua Pure Systems", lead: 2, status: "firmed" },
  { code: "RM-8012", name: "Fragrance Blend FG-04", warehouse: "Pune Plant", qty: "200 L", orderDate: "Immediate", reqDate: "27 Mar 2026", vendor: "Givaudan India", lead: 10, status: "exception" },
  { code: "PM-2003", name: "Foil Seals 5L", warehouse: "Pune Plant", qty: "15,000 pcs", orderDate: "29 Mar 2026", reqDate: "5 Apr 2026", vendor: "Bilcare Solutions", lead: 5, status: "planned" },
  { code: "RM-9055", name: "Caustic Soda Flakes", warehouse: "Delhi Depot", qty: "3,000 kg", orderDate: "28 Mar 2026", reqDate: "4 Apr 2026", vendor: "Deepak Nitrite", lead: 5, status: "planned" },
  { code: "RM-1066", name: "Citric Acid Monohydrate", warehouse: "Pune Plant", qty: "800 kg", orderDate: "30 Mar 2026", reqDate: "8 Apr 2026", vendor: "Jungbunzlauer India", lead: 8, status: "planned" },
  { code: "PM-3004", name: "Corrugated Cartons (5L x6)", warehouse: "Pune Plant", qty: "5,000 pcs", orderDate: "1 Apr 2026", reqDate: "7 Apr 2026", vendor: "Packman Industries", lead: 3, status: "firmed" },
  { code: "RM-1177", name: "Isopropyl Alcohol", warehouse: "Mumbai WH", qty: "600 L", orderDate: "27 Mar 2026", reqDate: "31 Mar 2026", vendor: "Deepak Fertilisers", lead: 4, status: "planned" },
];

const exceptions = [
  { type: "Material Shortage", material: "Stearic Acid (RM-2087)", severity: "high", action: "Place emergency PO — 500 kg required by 27 Mar", assigned: "Priya S." },
  { type: "Late Delivery Risk", material: "Fragrance Blend FG-04 (RM-8012)", severity: "high", action: "Expedite with Givaudan India — current ETA 4 Apr", assigned: "Vikram T." },
  { type: "BOM Missing", material: "Anti-Bacterial Compound V2", severity: "medium", action: "BOM not defined — cannot plan materials", assigned: "Rajesh K." },
  { type: "Material Shortage", material: "EDTA Disodium Salt (RM-5018)", severity: "high", action: "Place emergency PO — 300 kg shortfall", assigned: "Priya S." },
  { type: "Excess Stock", material: "LDPE Granules (RM-3045)", severity: "low", action: "Reduce safety stock — 45 days coverage on hand", assigned: "Arun M." },
  { type: "Late Delivery Risk", material: "Titanium Dioxide (RM-6031)", severity: "medium", action: "Vendor delayed — new ETA 5 Apr (was 3 Apr)", assigned: "Vikram T." },
  { type: "Material Shortage", material: "Shrink Labels Type B (PM-2008)", severity: "medium", action: "Alternate vendor available — Switch to PrintPack India", assigned: "Priya S." },
];

export default function MRPRun() {
  const [tab, setTab] = useState<"planned" | "exceptions" | "pegging">("planned");
  const [running, setRunning] = useState(false);

  const handleRun = () => {
    setRunning(true);
    setTimeout(() => setRunning(false), 3000);
  };

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="bg-card rounded-lg border border-border p-4 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            <div><span className="text-muted-foreground">Last run:</span> <span className="font-medium">23 Mar 2026, 06:30 AM</span></div>
            <div><span className="text-muted-foreground">Type:</span> <span className="font-medium">Full regenerative</span></div>
            <div><span className="text-muted-foreground">Duration:</span> <span className="font-medium">4m 12s</span></div>
            <div><span className="text-muted-foreground">Planned orders:</span> <span className="font-semibold">312</span></div>
            <div><span className="text-muted-foreground">Exceptions:</span> <span className="font-semibold text-danger">18</span></div>
          </div>
          <div className="flex items-center gap-3">
            <select className="h-9 px-3 rounded-lg border border-input bg-background text-sm">
              <option>Full regenerative</option>
              <option>Net change</option>
            </select>
            <button
              onClick={handleRun}
              disabled={running}
              className="h-9 px-4 bg-accent text-accent-foreground rounded-lg text-sm font-medium flex items-center gap-1.5 hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-60"
            >
              <Zap className="w-3.5 h-3.5" /> {running ? "Running..." : "Run MRP Now"}
            </button>
          </div>
        </div>
        {running && (
          <div className="mt-3">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full animate-pulse" style={{ width: "65%", transition: "width 3s ease" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Processing material requirements... 65% complete</p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {([["planned", "Planned Orders (312)"], ["exceptions", "Exceptions (18)"], ["pegging", "Pegging View"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === key ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Table */}
      {tab === "planned" && (
        <div className="bg-card rounded-lg border border-border overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-secondary/50 border-b border-border">
                  <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">Code</th>
                  <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">Material</th>
                  <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">Warehouse</th>
                  <th className="text-right px-3 py-2.5 font-medium text-muted-foreground">Req. Qty</th>
                  <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">Order Date</th>
                  <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">Req. Date</th>
                  <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">Vendor</th>
                  <th className="text-right px-3 py-2.5 font-medium text-muted-foreground">Lead (d)</th>
                  <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {plannedOrders.map((o, i) => (
                  <tr key={i} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="px-3 py-2"><input type="checkbox" className="rounded" /></td>
                    <td className="px-3 py-2 font-mono text-xs">{o.code}</td>
                    <td className="px-3 py-2 font-medium">{o.name}</td>
                    <td className="px-3 py-2 text-muted-foreground">{o.warehouse}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{o.qty}</td>
                    <td className="px-3 py-2">{o.orderDate}</td>
                    <td className="px-3 py-2">{o.reqDate}</td>
                    <td className="px-3 py-2">{o.vendor}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{o.lead}</td>
                    <td className="px-3 py-2 text-center">
                      <StatusBadge
                        status={o.status === "firmed" ? "green" : o.status === "exception" ? "red" : "blue"}
                        label={o.status === "firmed" ? "Firmed" : o.status === "exception" ? "Exception" : "Planned"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-border flex items-center justify-between">
            <button className="h-8 px-3 bg-accent text-accent-foreground rounded-md text-xs font-medium hover:opacity-90 active:scale-[0.98]">
              Firm Selected Orders
            </button>
            <span className="text-xs text-muted-foreground">Showing 15 of 312 planned orders</span>
          </div>
        </div>
      )}

      {tab === "exceptions" && (
        <div className="bg-card rounded-lg border border-border overflow-hidden animate-fade-in">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">Type</th>
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">Material</th>
                <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">Severity</th>
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">Recommended Action</th>
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">Assigned</th>
              </tr>
            </thead>
            <tbody>
              {exceptions.map((e, i) => (
                <tr key={i} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-3 py-2">{e.type}</td>
                  <td className="px-3 py-2 font-medium">{e.material}</td>
                  <td className="px-3 py-2 text-center">
                    <StatusBadge status={e.severity === "high" ? "red" : e.severity === "medium" ? "amber" : "green"} label={e.severity} />
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{e.action}</td>
                  <td className="px-3 py-2">{e.assigned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "pegging" && (
        <div className="bg-card rounded-lg border border-border p-6 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-4">Select a material from the Planned Orders tab to view the supply-demand pegging chain.</p>
          <div className="bg-secondary/30 rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-3">Pegging: Stearic Acid (RM-2087)</h4>
            <div className="space-y-2 text-sm font-mono">
              <div className="pl-0">📦 <span className="font-medium">Demand: WO-2026-0847</span> — Industrial Cleaner 5L — 120 kg</div>
              <div className="pl-4">↳ BOM Level 1: Concentrate Base — 48 kg per 1,000 units</div>
              <div className="pl-8">↳ BOM Level 2: Stearic Acid — 0.12 kg per L</div>
              <div className="pl-0 mt-2">📦 <span className="font-medium">Demand: WO-2026-0853</span> — Hand Wash 250ml — 80 kg</div>
              <div className="pl-4">↳ BOM Level 1: Emulsifier Blend — 32 kg per 5,000 units</div>
              <div className="pl-0 mt-2">📦 <span className="font-medium">Demand: SO-4521</span> — Sales Order (Reliance Retail) — 300 kg</div>
              <div className="pl-0 mt-3 border-t border-border pt-3">🔄 <span className="font-medium">Supply:</span></div>
              <div className="pl-4">📍 On-hand stock: 180 kg (Pune Plant)</div>
              <div className="pl-4">🚚 PO-2026-0412 — 500 kg — ETA: 10 Apr 2026 (Rashtriya Chemicals)</div>
              <div className="pl-4 text-danger">⚠️ Shortfall: 320 kg before PO arrives</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
