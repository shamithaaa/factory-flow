import StatusBadge from "@/components/StatusBadge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const vendors = [
  { name: "Reliance Polymers", value: "₹1.2 Cr", otd: 92, rejection: 1.2, avgLead: 6, priceVar: -1.8, score: 88, trend: "↑" },
  { name: "Galaxy Surfactants", value: "₹85L", otd: 88, rejection: 2.1, avgLead: 7, priceVar: 3.2, score: 82, trend: "→" },
  { name: "Rashtriya Chemicals", value: "₹72L", otd: 78, rejection: 3.5, avgLead: 14, priceVar: 5.1, score: 68, trend: "↓" },
  { name: "Aarti Industries", value: "₹68L", otd: 85, rejection: 1.8, avgLead: 10, priceVar: 2.4, score: 79, trend: "→" },
  { name: "Mold-Tek Containers", value: "₹62L", otd: 94, rejection: 0.5, avgLead: 5, priceVar: -0.5, score: 92, trend: "↑" },
  { name: "Tronox India", value: "₹58L", otd: 82, rejection: 2.8, avgLead: 6, priceVar: 4.8, score: 74, trend: "↓" },
  { name: "Uflex Packaging", value: "₹52L", otd: 91, rejection: 0.8, avgLead: 4, priceVar: 1.2, score: 87, trend: "↑" },
  { name: "Deepak Nitrite", value: "₹48L", otd: 86, rejection: 1.5, avgLead: 5, priceVar: 2.1, score: 81, trend: "→" },
  { name: "Givaudan India", value: "₹42L", otd: 75, rejection: 0.3, avgLead: 10, priceVar: 6.2, score: 71, trend: "↓" },
  { name: "Gujarat Alkalies", value: "₹38L", otd: 90, rejection: 1.0, avgLead: 5, priceVar: 0.8, score: 85, trend: "↑" },
  { name: "SRF Limited", value: "₹35L", otd: 87, rejection: 1.4, avgLead: 7, priceVar: 1.5, score: 83, trend: "→" },
  { name: "Hindustan Zinc", value: "₹32L", otd: 93, rejection: 0.6, avgLead: 8, priceVar: -2.1, score: 89, trend: "↑" },
];

const otdData = vendors.slice(0, 10).map(v => ({ name: v.name.split(" ")[0], otd: v.otd }));

export default function VendorManagement() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold animate-fade-in-up">Vendor Management</h2>
      <div className="bg-card rounded-lg border border-border p-4 animate-fade-in-up stagger-1">
        <h3 className="text-sm font-semibold mb-3">On-Time Delivery by Vendor (%)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={otdData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
            <XAxis type="number" domain={[60, 100]} tick={{ fontSize: 11 }} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={90} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Bar dataKey="otd" fill="hsl(162,100%,36%)" radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-card rounded-lg border border-border overflow-hidden animate-fade-in-up stagger-2">
        <table className="w-full text-[13px]">
          <thead><tr className="bg-secondary/50 border-b border-border">
            {["Vendor", "PO Value (6M)", "OTD %", "Rejection %", "Avg Lead (d)", "Price Var %", "Score", "Trend"].map(h =>
              <th key={h} className="text-left px-3 py-2.5 font-medium text-muted-foreground">{h}</th>
            )}
          </tr></thead>
          <tbody>
            {vendors.map((v, i) => (
              <tr key={i} className="border-b border-border hover:bg-secondary/30">
                <td className="px-3 py-2 font-medium">{v.name}</td>
                <td className="px-3 py-2 tabular-nums">{v.value}</td>
                <td className="px-3 py-2 tabular-nums"><span className={v.otd >= 90 ? "text-success" : v.otd >= 80 ? "text-warning" : "text-danger"}>{v.otd}%</span></td>
                <td className="px-3 py-2 tabular-nums"><span className={v.rejection <= 1 ? "text-success" : v.rejection <= 2 ? "text-warning" : "text-danger"}>{v.rejection}%</span></td>
                <td className="px-3 py-2 tabular-nums">{v.avgLead}</td>
                <td className="px-3 py-2 tabular-nums"><span className={v.priceVar <= 0 ? "text-success" : v.priceVar <= 3 ? "text-warning" : "text-danger"}>{v.priceVar > 0 ? "+" : ""}{v.priceVar}%</span></td>
                <td className="px-3 py-2"><span className={`font-bold tabular-nums ${v.score >= 85 ? "text-success" : v.score >= 75 ? "text-warning" : "text-danger"}`}>{v.score}</span></td>
                <td className="px-3 py-2 text-lg">{v.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
