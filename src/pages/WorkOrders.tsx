import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";

const tabsConfig = [
  { key: "all", label: "All" },
  { key: "draft", label: "Draft" },
  { key: "released", label: "Released" },
  { key: "inprogress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "onhold", label: "On Hold" },
  { key: "overdue", label: "Overdue" },
];

const PRODUCTS = [
  "Industrial Cleaner 5L", "Floor Polish 1L", "Dish Wash Liquid 500ml",
  "Hand Wash 250ml", "Glass Cleaner 1L", "Toilet Cleaner 500ml",
  "Surface Disinfectant 5L", "Multi-Surface Cleaner 1L", "Fabric Softener 1L",
  "Bathroom Cleaner 500ml", "Kitchen Degreaser 1L", "Phenyl White 5L"
];

const SUPERVISORS = ["Suresh P.", "Anita D.", "Mohan K.", "Ramesh T."];

const generateMockWOs = () => {
  const result: any[] = [];
  let woCounter = 847;
  
  let seed = 42;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const addItems = (count: number, status: string, material: string) => {
    for (let i = 0; i < count; i++) {
        woCounter++;
        const product = PRODUCTS[Math.floor(random() * PRODUCTS.length)];
        const ordered = (Math.floor(random() * 10) + 1) * 1000;
        
        let produced = 0;
        if (status === "Completed") produced = ordered;
        else if (status === "In Progress" || status === "On Hold" || status === "Overdue" || status === "At Risk") {
          produced = Math.floor(random() * ordered);
        }
        
        const bom = `v${Math.floor(random() * 4) + 1}.${Math.floor(random() * 5)}`;
        const line = `Line ${Math.floor(random() * 4) + 1}`;
        const supervisor = SUPERVISORS[Math.floor(random() * SUPERVISORS.length)];
        
        const dateObj = new Date(2026, 2, 25 - Math.floor(random() * 30)); 
        const dueObj = new Date(dateObj.getTime() + (Math.floor(random() * 5) + 1) * 86400000);
        
        const scheduled = dateObj.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }).replace(/ /g, " ");
        const due = dueObj.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }).replace(/ /g, " ");
        
        result.push({
            wo: `WO-2026-${String(woCounter).padStart(4, '0')}`,
            product, ordered, produced, bom, scheduled, due, line, supervisor, material, status,
            _timestamp: dateObj.getTime()
        });
    }
  };

  addItems(18, "Draft", "gray");
  addItems(67, "Released", "blue");
  addItems(41, "In Progress", "amber");
  addItems(90, "Completed", "green"); // Adjusted to exactly make sum 234
  addItems(12, "On Hold", "gray");
  addItems(4, "Overdue", "red");
  addItems(2, "At Risk", "red"); // Overdue + At Risk sum to 6

  return result.sort((a, b) => b._timestamp - a._timestamp).map(({ _timestamp, ...rest }) => rest);
};

const workOrders = generateMockWOs();

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

  const filterMap: Record<string, string[]> = {
    draft: ["Draft"], released: ["Released"], inprogress: ["In Progress"],
    completed: ["Completed"], onhold: ["On Hold"], overdue: ["Overdue", "At Risk"],
  };

  const filtered = activeTab === "all" ? workOrders : workOrders.filter((wo) => {
    return filterMap[activeTab]?.includes(wo.status);
  });

  const getCount = (key: string) => {
    if (key === "all") return workOrders.length;
    return workOrders.filter(wo => filterMap[key]?.includes(wo.status)).length;
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold animate-fade-in-up">Work Orders</h2>

      <div className="flex gap-1 border-b border-border overflow-x-auto animate-fade-in-up stagger-1">
        {tabsConfig.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === t.key ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label} ({getCount(t.key)})
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
