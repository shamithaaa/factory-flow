# MatrixOps (Factory Flow)

MatrixOps is a demo website that tells one simple story:

**“How do we keep a factory running smoothly—without running out of materials, over-buying inventory, or missing shipping dates?”**

It does this by putting planning, purchasing, production, inventory, and reporting into one place—so every team can see the same “version of the truth”.

> Note: This project is a UI/demo. The numbers, names, and orders you see are sample data meant to illustrate how the workflow feels.

---

## The Website, Explained Like a Story

### Scene 1 — The morning check-in (Login)
Rajesh opens MatrixOps, signs in, and picks a role (Admin / Planner / Procurement / Operations). The role is there to help you imagine what each person cares about as they move through the site.

### Scene 2 — “What’s going to hurt us today?” (Dashboard)
The Dashboard is the control room.

Rajesh sees five quick signals at the top:

- **Materials at Risk**: items that could run out soon.
- **Open Purchase Orders**: what’s already on order (and how much money is tied up).
- **Schedule Adherence**: how well the factory is sticking to plan.
- **Inventory Health**: whether stock is in a healthy range (not too low, not too high).
- **Pending Work Orders**: what work is waiting on the shop floor.

Then the dashboard shows the “shape of the next few weeks”:

- A **Material Coverage Trend** chart (coverage = “how long will this material last if we keep consuming at the expected rate?”)
- A **Procurement vs Consumption** chart (are we buying faster or slower than we’re using?)

Finally, the dashboard highlights the practical next actions:

- **MRP Run Status** (when the last run happened, how many planned orders, how many exceptions)
- **Stock Exhaustion Alerts** (materials that need attention right now)
- **Production Schedule (Next 7 Days)** (what the factory intends to make next)
- “Do something now” buttons like **Run MRP**, **Review Purchase Plan**, and **Check Slow-Moving Stock**

### Scene 3 — Planning materials so production doesn’t stop (Material Planning)
This is where a planner answers: **“What do we need, when do we need it, and what should we do about it?”**

#### MRP Run & Results
MRP (Material Requirements Planning) is the website’s “planning engine”. When Rajesh clicks **Run MRP Now**, the site simulates a planning run.

It returns three ways to look at the result:

- **Planned Orders**: a list of what needs to be purchased or arranged, with required dates, vendors, and lead times.
- **Exceptions**: a focused list of problems (shortages, late delivery risks, missing BOMs) with recommended actions and an owner.
- **Pegging View**: a “why is this material needed?” explanation that links a material shortage back to the work orders / sales orders that are driving demand.

#### Material Requirements
This is the “materials ledger for the plan”. It shows:

- What you start with (opening stock)
- What you’ll need (gross requirement)
- What’s already coming in (scheduled receipts)
- What’s left to cover (net requirement)
- The guard rails (safety stock, reorder quantity)

There’s also a simple switch: **show only shortages**—so a planner can immediately focus on what’s risky.

#### BOM Management, Safety Stock, and Alerts
In the story, these pages are the “rules and references” that make planning believable:

- **BOM Management**: the recipe for building products (what materials go into what).
- **Safety Stock**: how much buffer inventory you want for uncertainty.
- **Stock Exhaustion Alerts**: the shortlist of materials that are about to become tomorrow’s emergency.

### Scene 4 — Turning plans into factory work (Production)
Planning is only useful if it becomes action.

Production pages help the operations team answer:

- **What are we making next?** (Production Schedule)
- **What jobs are currently open?** (Work Orders)
- **What’s blocking us?** (Constraints)
- **What changed from the original plan, and why?** (Schedule Updates)

### Scene 5 — Knowing what you actually have (Inventory)
Inventory is where surprises tend to hide.

MatrixOps treats inventory as a living picture across locations:

- **Stock Overview**: quantities by site (e.g., plant vs warehouse), plus reorder points and stock value.
- **Multi-Location Inventory**: a clearer view of “where” stock sits.
- **Batch & Serial Tracking**: traceability—useful when quality questions come up.
- **Inventory Health**: a score-style view to spot slow-moving / excess stock and reduce waste.

### Scene 6 — Buying the right things at the right time (Purchase)
Now the procurement team steps in. Their story is:

**“Place orders early enough to avoid shortages, but not so early that cash is stuck on shelves.”**

Key pages include:

- **Purchase Planning**: what purchasing should do next.
- **Purchase Orders**: a full list of POs, grouped into tabs like Draft, Pending Approval, Ordered, Partially Received, and Fully Received.
- **Vendor Management**: who you buy from.
- **Procurement Analytics**: how purchasing is performing (cycle time, delays, and patterns).

### Scene 7 — Demand & forecasting (Demand & Forecasting)
This area answers: **“What do we think customers will ask for, and how close were we?”**

- **Demand Forecast**: the best estimate of future demand.
- **Forecast vs Actuals**: checks how reality compares to the plan.
- **Sales Order Intake**: captures real orders coming in.

### Scene 8 — Explaining the business in numbers (Analytics & Reports)
When leaders ask “how are we doing?”, this is where the story becomes measurable:

- **BI Dashboard**: a high-level performance view.
- **Material Coverage**: how long key materials will last.
- **Procurement Reports**: purchase performance summaries.
- **MRP Efficiency**: how well planning is working (exceptions, stability, outcomes).
- **Custom Reports**: build the report that matches your question.

### Scene 9 — Keeping the system trustworthy (Settings)
These pages keep the “world” of the website consistent:

- **Company & Warehouses**: the places you operate.
- **Users & Roles**: who can do what.
- **Integrations**: connecting to outside systems.
- **Alert Configuration**: what counts as “urgent” and who should be notified.

---

## A tiny legend (so the screens make sense)

- **Green** usually means “safe / adequate / on track”.
- **Amber** means “watch this / getting low / at some risk”.
- **Red** means “act now / critical / will cause a stoppage or miss”.
- **Blue** is often used for “planned / ordered / informational status”.
- **Gray** is used for “draft / inactive / neutral status”.

---

## If you’re building/running this project (developer notes)

- Start the dev server: `npm install` then `npm run dev`
- Build: `npm run build`
- Run tests: `npm test`

Vite runs on port `8080` in this repo’s config.
