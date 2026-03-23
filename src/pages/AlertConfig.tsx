import { useState } from "react";
import { Bell, Mail, MessageSquare } from "lucide-react";

const alertRules = [
  { name: "Stock Exhaustion — Critical", trigger: "Coverage < 3 days", channel: "Email + SMS + In-App", recipients: "Planner, Procurement Head", frequency: "Immediate", enabled: true },
  { name: "Stock Exhaustion — High", trigger: "Coverage 3–7 days", channel: "Email + In-App", recipients: "Planner", frequency: "Daily digest", enabled: true },
  { name: "Stock Exhaustion — Medium", trigger: "Coverage 7–14 days", channel: "In-App", recipients: "Planner", frequency: "Weekly digest", enabled: true },
  { name: "PO Overdue", trigger: "Expected delivery passed", channel: "Email + In-App", recipients: "Procurement", frequency: "Daily", enabled: true },
  { name: "MRP Exception — High", trigger: "High severity exception generated", channel: "Email + SMS", recipients: "Planner, Operations", frequency: "Immediate", enabled: true },
  { name: "Production Delay", trigger: "Work order behind schedule > 4h", channel: "Email + SMS", recipients: "Operations, Plant Head", frequency: "Immediate", enabled: true },
  { name: "Quality Hold", trigger: "QC test failure or quarantine batch", channel: "Email + In-App", recipients: "Quality, Operations", frequency: "Immediate", enabled: true },
  { name: "Batch Expiry Warning", trigger: "Batch expiring in < 30 days", channel: "Email", recipients: "Warehouse, Sales", frequency: "Weekly", enabled: true },
  { name: "Price Variance Alert", trigger: "PO price > 5% above last price", channel: "Email", recipients: "Procurement Head, Finance", frequency: "Per PO", enabled: false },
  { name: "Dead Stock Alert", trigger: "No movement > 90 days", channel: "In-App", recipients: "Planner, Finance", frequency: "Monthly", enabled: true },
  { name: "Integration Failure", trigger: "Sync failure or degraded status", channel: "Email + SMS", recipients: "IT Admin", frequency: "Immediate", enabled: true },
  { name: "Capacity Overload", trigger: "Production line > 100% scheduled", channel: "Email", recipients: "Operations", frequency: "Daily", enabled: false },
];

export default function AlertConfig() {
  const [rules, setRules] = useState(alertRules);

  const toggleRule = (index: number) => {
    setRules(prev => prev.map((r, i) => i === index ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between animate-fade-in-up">
        <h2 className="text-lg font-semibold">Alert Configuration</h2>
        <button className="h-8 px-3 bg-accent text-accent-foreground rounded-md text-xs font-medium hover:opacity-90">+ Create Alert Rule</button>
      </div>

      <div className="grid grid-cols-3 gap-3 animate-fade-in-up stagger-1">
        {[
          { icon: Bell, label: "Active Alert Rules", count: rules.filter(r => r.enabled).length, total: rules.length },
          { icon: Mail, label: "Email Alerts Sent (Today)", count: 47, total: null },
          { icon: MessageSquare, label: "SMS Alerts Sent (Today)", count: 8, total: null },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-lg border border-border p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <s.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <div className="text-lg font-bold tabular-nums">{s.count}{s.total !== null && <span className="text-sm text-muted-foreground font-normal"> / {s.total}</span>}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden animate-fade-in-up stagger-2">
        <table className="w-full text-[13px]">
          <thead><tr className="bg-secondary/50 border-b border-border">
            {["Enabled", "Alert Rule", "Trigger Condition", "Channel", "Recipients", "Frequency", "Actions"].map(h =>
              <th key={h} className="text-left px-3 py-2.5 font-medium text-muted-foreground">{h}</th>)}
          </tr></thead>
          <tbody>
            {rules.map((r, i) => (
              <tr key={i} className={`border-b border-border hover:bg-secondary/30 ${!r.enabled ? "opacity-50" : ""}`}>
                <td className="px-3 py-2">
                  <button onClick={() => toggleRule(i)} className={`w-8 h-4.5 rounded-full transition-colors relative ${r.enabled ? "bg-accent" : "bg-muted"}`}>
                    <span className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-card shadow transition-transform ${r.enabled ? "left-4" : "left-0.5"}`} />
                  </button>
                </td>
                <td className="px-3 py-2 font-medium">{r.name}</td>
                <td className="px-3 py-2 text-muted-foreground">{r.trigger}</td>
                <td className="px-3 py-2 text-xs">{r.channel}</td>
                <td className="px-3 py-2 text-xs">{r.recipients}</td>
                <td className="px-3 py-2">{r.frequency}</td>
                <td className="px-3 py-2"><button className="text-xs text-accent hover:underline">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
