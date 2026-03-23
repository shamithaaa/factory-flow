import StatusBadge from "@/components/StatusBadge";

const integrations = [
  { name: "Tally Prime", desc: "Accounting sync — purchase invoices, GRNs, stock values", status: "green" as const, statusLabel: "Active", lastSync: "10 min ago", records: "12,450 / 342 today", syncType: "Real-time", icon: "💰" },
  { name: "Zoho Books", desc: "Alternate accounting integration", status: "amber" as const, statusLabel: "Degraded", lastSync: "3 hours ago", records: "8,200 / 0 today", syncType: "Scheduled (4h)", icon: "📗", warning: "14 records failed validation" },
  { name: "WooCommerce", desc: "Sales order intake", status: "green" as const, statusLabel: "Active", lastSync: "5 min ago", records: "3,280 / 28 today", syncType: "Real-time", icon: "🛒" },
  { name: "Amazon Seller Central", desc: "Marketplace orders", status: "green" as const, statusLabel: "Active", lastSync: "12 min ago", records: "1,840 / 15 today", syncType: "Real-time", icon: "📦" },
  { name: "GSTN Portal", desc: "GST filing and e-invoicing", status: "green" as const, statusLabel: "Active", lastSync: "1 hour ago", records: "6,120 / 45 today", syncType: "Scheduled (1h)", icon: "🏛️" },
  { name: "IndiaMART", desc: "Inquiry and lead intake", status: "green" as const, statusLabel: "Active", lastSync: "30 min ago", records: "890 / 8 today", syncType: "Scheduled (30m)", icon: "🏪" },
  { name: "Transport Management (TMS)", desc: "Dispatch and logistics", status: "amber" as const, statusLabel: "Degraded", lastSync: "6 hours ago", records: "4,560 / 0 today", syncType: "Real-time", icon: "🚛", warning: "API rate limit exceeded" },
  { name: "Quality Management (QMS)", desc: "QC results and rejection data", status: "green" as const, statusLabel: "Active", lastSync: "25 min ago", records: "2,340 / 12 today", syncType: "Real-time", icon: "✅" },
  { name: "HR & Payroll", desc: "Shift and manpower data", status: "green" as const, statusLabel: "Active", lastSync: "2 hours ago", records: "1,120 / 0 today", syncType: "Scheduled (6h)", icon: "👥" },
  { name: "Email/SMS Gateway", desc: "Alert notifications", status: "green" as const, statusLabel: "Active", lastSync: "Just now", records: "15,800 / 124 today", syncType: "Real-time", icon: "📧" },
];

export default function Integrations() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold animate-fade-in-up">Integrations</h2>
      <div className="grid grid-cols-2 gap-4 animate-fade-in-up stagger-1">
        {integrations.map((int, i) => (
          <div key={i} className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="text-2xl">{int.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold">{int.name}</h3>
                  <StatusBadge status={int.status} label={int.statusLabel} />
                </div>
                <p className="text-xs text-muted-foreground mb-2">{int.desc}</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div><span className="text-muted-foreground">Last sync:</span><br /><span className="font-medium">{int.lastSync}</span></div>
                  <div><span className="text-muted-foreground">Records:</span><br /><span className="font-medium">{int.records}</span></div>
                  <div><span className="text-muted-foreground">Type:</span><br /><span className="font-medium">{int.syncType}</span></div>
                </div>
                {int.warning && (
                  <div className="mt-2 px-2 py-1 bg-warning/10 text-warning rounded text-[11px] font-medium">⚠️ {int.warning}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
