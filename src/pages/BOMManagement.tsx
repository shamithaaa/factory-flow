import { useState } from "react";
import { ChevronRight, ChevronDown, Package, FileText, Download } from "lucide-react";

interface BOMNode {
  code: string;
  name: string;
  qty: string;
  uom: string;
  lead: number;
  children?: BOMNode[];
}

const bomTree: BOMNode = {
  code: "FG-001", name: "Industrial Cleaning Compound 5L", qty: "1", uom: "unit", lead: 0,
  children: [
    {
      code: "SA-101", name: "Concentrate Base", qty: "2.5", uom: "L", lead: 1,
      children: [
        { code: "RM-4023", name: "Sodium Lauryl Sulphate", qty: "0.8", uom: "kg", lead: 7 },
        { code: "RM-5018", name: "EDTA Disodium Salt", qty: "0.12", uom: "kg", lead: 10 },
        { code: "RM-7044", name: "Demineralised Water", qty: "1.8", uom: "L", lead: 2 },
        { code: "RM-2087", name: "Stearic Acid", qty: "0.15", uom: "kg", lead: 14 },
      ],
    },
    { code: "RM-8012", name: "Fragrance Blend FG-04", qty: "0.05", uom: "L", lead: 10 },
    { code: "PM-1001", name: "HDPE Bottle 5L", qty: "1", uom: "pc", lead: 5 },
    { code: "PM-2003", name: "Foil Seal", qty: "1", uom: "pc", lead: 5 },
    { code: "PM-1002", name: "Shrink Label", qty: "1", uom: "pc", lead: 4 },
  ],
};

const products = [
  "Industrial Cleaning Compound 5L",
  "Floor Polish 1L",
  "Dish Wash Liquid 500ml",
  "Hand Wash 250ml",
  "Glass Cleaner 1L",
  "Toilet Cleaner 500ml",
  "Surface Disinfectant 5L",
  "Anti-Bacterial Compound V2",
];

function TreeNode({ node, depth = 0 }: { node: BOMNode; depth?: number }) {
  const [open, setOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-1.5 px-2 hover:bg-secondary/50 rounded-md cursor-pointer transition-colors text-sm`}
        style={{ paddingLeft: depth * 20 + 8 }}
        onClick={() => hasChildren && setOpen(!open)}
      >
        {hasChildren ? (
          open ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
        ) : (
          <span className="w-3.5 flex-shrink-0" />
        )}
        <Package className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
        <span className="font-mono text-xs text-muted-foreground">{node.code}</span>
        <span className="font-medium">{node.name}</span>
        <span className="text-muted-foreground ml-auto text-xs tabular-nums">{node.qty} {node.uom}</span>
        {node.lead > 0 && <span className="text-xs text-muted-foreground">{node.lead}d</span>}
      </div>
      {hasChildren && open && node.children!.map((child, i) => (
        <TreeNode key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

const itemDetails: Record<string, { stock: string; openPO: string; vendor: string; altVendor: string; cost: string; lastPrice: string }> = {
  "RM-4023": { stock: "1,450 kg", openPO: "800 kg (ETA 2 Apr)", vendor: "Galaxy Surfactants", altVendor: "BASF India", cost: "₹185/kg", lastPrice: "₹182/kg" },
  "RM-5018": { stock: "95 kg", openPO: "None", vendor: "Aarti Industries", altVendor: "Loba Chemie", cost: "₹420/kg", lastPrice: "₹410/kg" },
  "RM-2087": { stock: "180 kg", openPO: "500 kg (ETA 10 Apr)", vendor: "Rashtriya Chemicals", altVendor: "Godrej Industries", cost: "₹145/kg", lastPrice: "₹138/kg" },
  "PM-1001": { stock: "8,200 pcs", openPO: "10,000 pcs (ETA 4 Apr)", vendor: "Mold-Tek Containers", altVendor: "Time Technoplast", cost: "₹42/pc", lastPrice: "₹40/pc" },
};

export default function BOMManagement() {
  const [selected, setSelected] = useState("Industrial Cleaning Compound 5L");
  const [selectedItem, setSelectedItem] = useState<string | null>("RM-4023");

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between animate-fade-in-up">
        <h2 className="text-lg font-semibold">BOM Management</h2>
        <div className="flex gap-2">
          <button className="h-8 px-3 bg-card border border-border rounded-md text-xs font-medium hover:bg-secondary transition-colors">Edit BOM</button>
          <button className="h-8 px-3 bg-card border border-border rounded-md text-xs font-medium hover:bg-secondary transition-colors">Compare Versions</button>
          <button className="h-8 px-3 bg-card border border-border rounded-md text-xs font-medium hover:bg-secondary transition-colors flex items-center gap-1">
            <Download className="w-3 h-3" /> Export
          </button>
        </div>
      </div>

      <div className="animate-fade-in-up stagger-1">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="h-9 px-3 rounded-lg border border-input bg-card text-sm w-80"
        >
          {products.map((p) => <option key={p}>{p}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-5 gap-4 animate-fade-in-up stagger-2">
        {/* BOM Tree */}
        <div className="col-span-3 bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-semibold mb-3">Bill of Materials — {selected}</h3>
          <TreeNode node={bomTree} />
        </div>

        {/* Detail Panel */}
        <div className="col-span-2 bg-card rounded-lg border border-border p-4">
          <h3 className="text-sm font-semibold mb-3">Component Details</h3>
          {selectedItem && itemDetails[selectedItem] ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Current Stock</span><span className="font-medium">{itemDetails[selectedItem].stock}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Open POs</span><span className="font-medium">{itemDetails[selectedItem].openPO}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Primary Vendor</span><span className="font-medium">{itemDetails[selectedItem].vendor}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Alternate Vendor</span><span className="font-medium">{itemDetails[selectedItem].altVendor}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Standard Cost</span><span className="font-medium">{itemDetails[selectedItem].cost}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Last Purchase Price</span><span className="font-medium">{itemDetails[selectedItem].lastPrice}</span></div>
              <div className="pt-2 border-t border-border">
                <button className="text-xs text-accent hover:underline">Where-used analysis →</button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Click a component in the BOM tree to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
}
