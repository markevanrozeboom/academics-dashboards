# AI Builder Spec Request Template

## Project Name: Academics (Tech Stack / Timeback) Joe Chart Dashboard
**Date:** 2026-01-30
**Version:** 1.0
**Stakeholder:** Mark Rozeboom / Tim Daly / Academics Team

---

## 1. Overview of the Ask

### The Problem
Academics (Tech Stack) is a Tier 1 investment at -$15.9M cumulative, providing core technology that powers the 2 Hour Learning model. Leadership needs visibility into:

1. Total investment deployed in technology development
2. Subscription/revenue growth trajectory
3. Path to profitability (closest Tier 1 to breakeven)
4. Product performance (Lesson Planet vs Timeback vs School SW)

Currently, this requires manually pulling data from multiple systems with no single executive view.

**Current approach:** Manual financial reports, scattered product metrics, no unified dashboard.

### The Solution
Build a Joe Chart dashboard showing:
1. **Investment to Date** - Cumulative technology investment
2. **Key Input Lever** - Active subscriptions/schools using products
3. **Revenue/Margin Trend** - Monthly P&L with gross margin
4. **Path to Breakeven** - Revenue needed to cover costs
5. **Execution Risk Score** - Product delivery and customer success
6. **R/Y/G Status** - Overall health indicator

### Out of Scope
- Detailed product roadmap tracking
- Individual customer contracts
- Engineering velocity metrics
- Technical infrastructure costs (unless in financials)

---

## 2. Key Feature Requirements

| Feature Name | Priority | Description | Acceptance Criteria |
|-------------|----------|-------------|---------------------|
| **Investment to Date Card** | Core Req | Cumulative investment since inception | Single number, updated monthly, clickable for breakdown |
| **Revenue Summary Card** | Core Req | Current revenue with growth indicator | Shows: $5.5M YTD, +X% vs prior year |
| **Revenue/Expense Chart** | Core Req | Monthly trend showing revenue vs expenses | Budget vs Actual toggle, 12-month view |
| **Gross Margin Display** | Core Req | Revenue - COGS = Gross Profit | Percentage and absolute values |
| **Expense Breakdown** | Core Req | HC vs NHC vs CF expense categories | Pie chart with amounts |
| **Path to Breakeven** | Core Req | Show revenue gap to profitability | Current: -$9.6M gap, need: $77M revenue |
| **Budget Variance** | Should Have | Actual vs Budget by category | Green/red indicators for over/under |
| **YoY Comparison** | Should Have | Compare to prior year | Revenue and expense growth rates |
| **Product Revenue Split** | Should Have | Revenue by product line | If class data maps to products |

---

## 3. Expected/Required Data Sources

### Input Data
**No manual input required.** All data flows from Klair.

### Internal Systems (Klair Data Warehouse)

#### Financial Data
- **Table:** `core_budgets.consolidated_budgets_and_actuals`
- **Filter:** `business_unit = 'Academics'`
- **Fields Used:**
  - `reporting_period` - Month-end date
  - `data_source` - 'Actual' vs 'Budget'
  - `type` - Revenue/Expense category
  - `amount` - Financial amount
  - `class` - May indicate product line
  - `department` - Cost center

### Required Calculations

1. **Investment to Date:**
   ```
   cumulative_investment = SUM(expenses) - SUM(revenue)
   ```

2. **Gross Margin:**
   ```
   gross_profit = revenue - COGS
   gross_margin_pct = gross_profit / revenue × 100
   ```

3. **Breakeven Gap:**
   ```
   breakeven_gap = total_expenses - total_revenue
   required_revenue = total_expenses (assuming 0% gross margin)
   or: required_revenue = fixed_costs / gross_margin_pct (with margin)
   ```

4. **Budget Variance:**
   ```
   variance = actual - budget
   variance_pct = (actual - budget) / budget × 100
   ```

### Data Not Available (Gaps)

| Gap | Impact | Workaround |
|-----|--------|------------|
| Subscription count | Cannot show customer metric | Use revenue as proxy |
| Customer list | Cannot calculate unit economics | Aggregate only |
| Product-level revenue | Limited product insights | Check if class maps to products |
| Churn rate | Cannot assess retention | Not available |

---

## 4. Design & Reference Material

### Joe Chart Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  ACADEMICS (TECH STACK)                          [🟡 YELLOW]    │
├──────────────────┬──────────────────┬──────────────────────────┤
│ INVESTMENT       │ KEY INPUT LEVER  │ PATH TO BREAKEVEN        │
│ TO DATE          │                  │                          │
│ -$33.4M          │ $5.5M Revenue    │ Gap: -$9.6M (2026)       │
│ (cumulative)     │ +X% YoY          │ Need: $77M revenue       │
├──────────────────┴──────────────────┴──────────────────────────┤
│ REVENUE/MARGIN TREND                                            │
│ [Monthly stacked bar: Revenue, COGS, Operating Expenses]        │
│ [Line overlay: Net Income]                                      │
├──────────────────────────────────────┬─────────────────────────┤
│ EXPENSE BREAKDOWN                    │ GROSS MARGIN             │
│ ┌────────────────────────────────┐  │                          │
│ │ [Pie Chart]                    │  │ Revenue: $5.5M           │
│ │ HC: 23% | NHC: 65% | CF: 12%  │  │ COGS: $2.6M              │
│ └────────────────────────────────┘  │ Gross Profit: $2.9M     │
│                                      │ Margin: 52%             │
└──────────────────────────────────────┴─────────────────────────┘
```

### Color Scheme
- Dark theme (consistent with financial dashboards)
- Revenue: Green (#4CAF50)
- Expenses: Red (#F44336)
- Net: Blue (#2196F3)
- Budget: Gray dashed lines

---

## 5. Additional Technical Notes

### Critical Data Filters

| Data Source | Filter Field | Filter Value |
|-------------|--------------|--------------|
| Budget vs Actuals | `business_unit` | `'Academics'` |

### Expense Type Mapping

| Type in Klair | Category | Description |
|---------------|----------|-------------|
| `Non Recurring Revenue` | Revenue | Subscription/License fees |
| `Recurring Revenue` | Revenue | Ongoing subscriptions |
| `CF COGS` | COGS | Direct product costs |
| `HC Expenses` | OpEx | Personnel costs |
| `NHC OPEX` | OpEx | Software, hosting, tools |
| `CF Expenses` | OpEx | Contractor/funding expenses |

### Known Data Quality Notes

1. **Revenue Type**: Currently all revenue appears as "Non Recurring Revenue" even though subscriptions may be recurring
2. **No Customer Count**: Cannot determine number of schools using products
3. **Product Attribution**: Need to verify if `class` field maps to products

### Success Metrics
1. Dashboard loads in <3 seconds
2. Financial metrics match Budget vs Actuals source
3. Gross margin calculation verified with Finance
4. Clear visualization of path to breakeven

---

## 6. Open Questions for Klair Team

1. **Product Breakdown**: Does the `class` field in Budget vs Actuals map to products (Lesson Planet, Timeback, School SW)?

2. **Customer Data**: Is there a customer/subscription table that shows number of schools using Academics products?

3. **Historical Data**: How far back does data go? Need inception-to-date investment.

4. **Revenue Classification**: Why is subscription revenue classified as "Non Recurring"? Should it be Recurring?

5. **Gross Margin**: Is the COGS calculation accurate for software subscriptions?

---

## 7. Implementation Priority

### Phase 1 (Week 1): Core Metrics
- [ ] Investment to Date card
- [ ] Revenue/Expense trend chart
- [ ] Gross margin calculation

### Phase 2 (Week 2): Analysis
- [ ] Budget vs Actual comparison
- [ ] Expense breakdown
- [ ] Path to Breakeven display

### Phase 3 (Week 3+): Enhancement
- [ ] YoY comparison
- [ ] Product-level split (if data available)
- [ ] Drill-down capabilities

---

*This spec was generated based on live Klair data warehouse analysis. All queries verified against actual data as of 2026-01-30.*
