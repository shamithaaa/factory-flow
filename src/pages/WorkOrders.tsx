import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";

const statusTabs = [
  { key: "all", label: "All", count: 234 },
  { key: "draft", label: "Draft", count: 18 },
  { key: "released", label: "Released", count: 67 },
  { key: "inprogress", label: "In Progress", count: 41 },
  { key: "completed", label: "Completed", count: 108 },
  { key: "onhold", label: "On Hold", count: 12 },
  { key: "overdue", label: "Overdue", count: 6 },
];

const workOrders = [
  { wo: "WO-2026-0847", product: "Industrial Cleaner 5L", ordered: 2000, produced: 0, bom: "v3.2", scheduled: "24 Mar 2026", due: "24 Mar 2026", line: "Line 3", supervisor: "Suresh P.", material: "green" as const, status: "Released" },
  { wo: "WO-2026-0848", product: "Floor Polish 1L", ordered: 5000, produced: 0, bom: "v2.1", scheduled: "24 Mar 2026", due: "25 Mar 2026", line: "Line 1", supervisor: "Anita D.", material: "amber" as const, status: "Released" },
  { wo: "WO-2026-0849", product: "Dish Wash Liquid 500ml", ordered: 8000, produced: 0, bom: "v4.0", scheduled: "25 Mar 2026", due: "25 Mar 2026", line: "Line 2", supervisor: "Mohan K.", material: "red" as const, status: "At Risk" },
  { wo: "WO-2026-0840", product: "Hand Wash 250ml", ordered: 10000, produced: 6200, bom: "v1.5", scheduled: "22 Mar 2026", due: "23 Mar 2026", line: "Line 4", supervisor: "Ramesh T.", material: "green" as const, status: "In Progress" },
  { wo: "WO-2026-0835", product: "Glass Cleaner 1L", ordered: 3000, produced: 3000, bom: "v2.0", scheduled: "20 Mar 2026", due: "21 Mar 2026", line: "Line 3", supervisor: "Suresh P.", material: "green" as const, status: "Completed" },
  { wo: "WO-2026-0838", product: "Toilet Cleaner 500ml", ordered: 6000, produced: 6000, bom: "v3.1", scheduled: "21 Mar 2026", due: "22 Mar 2026", line: "Line 2", supervisor: "Mohan K.", material: "green" as const, status: "Completed" },
  { wo: "WO-2026-0830", product: "Surface Disinfectant 5L", ordered: 1500, produced: 750, bom: "v1.2", scheduled: "19 Mar 2026", due: "20 Mar 2026", line: "Line 1", supervisor: "Anita D.", material: "green" as const, status: "On Hold" },
  { wo: "WO-2026-0825", product: "Multi-Surface Cleaner 1L", ordered: 4000, produced: 1200, bom: "v2.3", scheduled: "18 Mar 2026", due: "19 Mar 2026", line: "Line 3", supervisor: "Suresh P.", material: "amber" as const, status: "Overdue" },
  { wo: "WO-2026-0820", product: "Fabric Softener 1L", ordered: 3500, produced: 3500, bom: "v1.0", scheduled: "17 Mar 2026", due: "18 Mar 2026", line: "Line 4", supervisor: "Ramesh T.", material: "green" as const, status: "Completed" },
  { wo: "WO-2026-0818", product: "Bathroom Cleaner 500ml", ordered: 7000, produced: 7000, bom: "v2.8", scheduled: "16 Mar 2026", due: "17 Mar 2026", line: "Line 2", supervisor: "Mohan K.", material: "green" as const, status: "Completed" },
  { wo: "WO-2026-0815", product: "Kitchen Degreaser 1L", ordered: 2500, produced: 0, bom: "v1.1", scheduled: "29 Mar 2026", due: "30 Mar 2026", line: "Line 1", supervisor: "Anita D.", material: "green" as const, status: "Draft" },
  { wo: "WO-2026-0812", product: "Phenyl White 5L", ordered: 3000, produced: 800, bom: "v3.0", scheduled: "18 Mar 2026", due: "19 Mar 2026", line: "Line 4", supervisor: "Ramesh T.", material: "amber" as const, status: "Overdue" },
];

const statusColorMap: Record<string, "green" | "amber" | "red" | "blue" | "gray"> = {
  "Released": "blue",
  "In Progress": "amber",
  "Completed": "green",
  "At Risk": "red",
  "On Hold": "gray",
  "Overdue": "red",
  "Draft": "gray",
};

export default function WorkOrders() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all" ? workOrders : workOrders.filter((wo) => {
    const map: Record<string, string[]> = {
      draft: ["Draft"], released: ["Released"], inprogress: ["In Progress"],
      completed: ["Completed"], onhold: ["On Hold"], overdue: ["Overdue", "At Risk"],
    };
    return map[activeTab]?.includes(wo.status);
  });

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold animate-fade-in-up">Work Orders</h2>

      <div className="flex gap-1 border-b border-border animate-fade-in-up stagger-1">
        {statusTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === t.key ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                {["Work Order", "Product", "Ordered", "Produced", "BOM", "Scheduled", "Due", "Line", "Supervisor", "Material", "Status"].map((h) => (
                  <th key={h} className="text-left px-3 py-2.5 font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((wo, i) => (
                <tr key={i} className="border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer">
                  <td className="px-3 py-2 font-mono text-xs text-accent">{wo.wo}</td>
                  <td className="px-3 py-2 font-medium">{wo.product}</td>
                  <td className="px-3 py-2 tabular-nums">{wo.ordered.toLocaleString()}</td>
                  <td className="px-3 py-2 tabular-nums">{wo.produced.toLocaleString()}</td>
                  <td className="px-3 py-2 text-muted-foreground">{wo.bom}</td>
                  <td className="px-3 py-2">{wo.scheduled}</td>
                  <td className="px-3 py-2">{wo.due}</td>
                  <td className="px-3 py-2">{wo.line}</td>
                  <td className="px-3 py-2">{wo.supervisor}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${wo.material === "green" ? "bg-success" : wo.material === "amber" ? "bg-warning" : "bg-danger"}`} />
                  </td>
                  <td className="px-3 py-2"><StatusBadge status={statusColorMap[wo.status]} label={wo.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
