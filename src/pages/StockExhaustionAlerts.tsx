import { useNavigate } from "react-router-dom";
import StatusBadge from "@/components/StatusBadge";

const alerts = [
  { level: "red" as const, levelLabel: "Critical", material: "Stearic Acid", warehouse: "Pune Plant", stock: "180 kg", daily: "42 kg/d", days: 4.3, reqBy: "27 Mar 2026", reorderBy: "Immediate", lead: 14, vendor: "Rashtriya Chemicals" },
  { level: "red" as const, levelLabel: "Critical", material: "Fragrance Blend FG-04", warehouse: "Mumbai WH", stock: "22 L", daily: "6 L/d", days: 3.7, reqBy: "27 Mar 2026", reorderBy: "Immediate", lead: 10, vendor: "Givaudan India" },
  { level: "red" as const, levelLabel: "Critical", material: "EDTA Disodium Salt", warehouse: "Pune Plant", stock: "95 kg", daily: "18 kg/d", days: 5.3, reqBy: "28 Mar 2026", reorderBy: "Immediate", lead: 10, vendor: "Aarti Industries" },
  { level: "red" as const, levelLabel: "Critical", material: "Shrink Labels (Type B)", warehouse: "Pune Plant", stock: "1,200 pcs", daily: "320 pcs/d", days: 3.8, reqBy: "27 Mar 2026", reorderBy: "Immediate", lead: 4, vendor: "Uflex Packaging" },
  { level: "red" as const, levelLabel: "Critical", material: "Pine Oil", warehouse: "Chennai Hub", stock: "45 L", daily: "12 L/d", days: 3.8, reqBy: "27 Mar 2026", reorderBy: "Immediate", lead: 8, vendor: "Camphor & Allied" },
  { level: "red" as const, levelLabel: "Critical", material: "Methyl Salicylate", warehouse: "Pune Plant", stock: "28 kg", daily: "8 kg/d", days: 3.5, reqBy: "27 Mar 2026", reorderBy: "Immediate", lead: 12, vendor: "Jayant Agro" },
  { level: "red" as const, levelLabel: "Critical", material: "Preservative BKC-50", warehouse: "Delhi Depot", stock: "15 L", daily: "4 L/d", days: 3.8, reqBy: "27 Mar 2026", reorderBy: "Immediate", lead: 7, vendor: "Thor Specialties" },
  { level: "amber" as const, levelLabel: "High", material: "Titanium Dioxide", warehouse: "Pune Plant", stock: "640 kg", daily: "78 kg/d", days: 8.2, reqBy: "31 Mar 2026", reorderBy: "25 Mar 2026", lead: 6, vendor: "Tronox India" },
  { level: "amber" as const, levelLabel: "High", material: "Citric Acid Monohydrate", warehouse: "Pune Plant", stock: "380 kg", daily: "35 kg/d", days: 10.9, reqBy: "3 Apr 2026", reorderBy: "26 Mar 2026", lead: 8, vendor: "Jungbunzlauer India" },
  { level: "amber" as const, levelLabel: "High", material: "Polypropylene Granules", warehouse: "Mumbai WH", stock: "1,800 kg", daily: "280 kg/d", days: 6.4, reqBy: "29 Mar 2026", reorderBy: "23 Mar 2026", lead: 7, vendor: "Reliance Polymers" },
  { level: "amber" as const, levelLabel: "High", material: "Sodium Hypochlorite", warehouse: "Pune Plant", stock: "680 L", daily: "85 L/d", days: 8.0, reqBy: "31 Mar 2026", reorderBy: "26 Mar 2026", lead: 5, vendor: "Gujarat Alkalies" },
  { level: "amber" as const, levelLabel: "High", material: "Shrink Labels (Type A)", warehouse: "Pune Plant", stock: "4,500 pcs", daily: "480 pcs/d", days: 9.4, reqBy: "2 Apr 2026", reorderBy: "29 Mar 2026", lead: 4, vendor: "Uflex Packaging" },
  { level: "amber" as const, levelLabel: "High", material: "LDPE Caps 5L", warehouse: "Mumbai WH", stock: "2,200 pcs", daily: "350 pcs/d", days: 6.3, reqBy: "30 Mar 2026", reorderBy: "25 Mar 2026", lead: 5, vendor: "Mold-Tek Containers" },
];

export default function StockExhaustionAlerts() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between animate-fade-in-up">
        <h2 className="text-lg font-semibold">Stock Exhaustion Alerts</h2>
        <button className="text-xs text-accent hover:underline">Configure alert thresholds →</button>
      </div>

      <div className="grid grid-cols-4 gap-3 animate-fade-in-up stagger-1">
        {[
          { label: "Critical (< 3 days)", count: 7, color: "bg-danger/10 text-danger border-danger/20" },
          { label: "High (3–7 days)", count: 12, color: "bg-warning/10 text-warning border-warning/20" },
          { label: "Medium (7–14 days)", count: 23, color: "bg-accent/10 text-accent border-accent/20" },
          { label: "Total Active Alerts", count: 42, color: "bg-secondary text-foreground border-border" },
        ].map((s) => (
          <div key={s.label} className={`rounded-lg border p-3 ${s.color}`}>
            <div className="text-2xl font-bold tabular-nums">{s.count}</div>
            <div className="text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden animate-fade-in-up stagger-2">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                {["Level", "Material", "Warehouse", "Current Stock", "Daily Use", "Days Cover", "Required By", "Reorder By", "Lead (d)", "Vendor", "Action"].map((h) => (
                  <th key={h} className="text-left px-3 py-2.5 font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alerts.map((a, i) => (
                <tr key={i} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-3 py-2"><StatusBadge status={a.level} label={a.levelLabel} /></td>
                  <td className="px-3 py-2 font-medium">{a.material}</td>
                  <td className="px-3 py-2 text-muted-foreground">{a.warehouse}</td>
                  <td className="px-3 py-2 tabular-nums">{a.stock}</td>
                  <td className="px-3 py-2 tabular-nums">{a.daily}</td>
                  <td className="px-3 py-2 tabular-nums font-medium">{a.days}d</td>
                  <td className="px-3 py-2">{a.reqBy}</td>
                  <td className="px-3 py-2 font-medium">{a.reorderBy}</td>
                  <td className="px-3 py-2 tabular-nums">{a.lead}</td>
                  <td className="px-3 py-2">{a.vendor}</td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => navigate("/purchase-orders")}
                      className="h-7 px-2.5 bg-accent text-accent-foreground rounded text-xs font-medium hover:opacity-90 active:scale-[0.97]"
                    >
                      Raise PO
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
