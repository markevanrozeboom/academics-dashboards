# Academics (Tech Stack / Timeback) Joe Chart Dashboard

**Purpose**: Executive decision dashboard (Joe Chart) for Academics portfolio - technology products enabling the 2 Hour Learning model.

**Status**: Spec/Prototype for Klair team implementation

**Last Updated**: January 30, 2026

**Owner**: Tim Daly / Academics

---

## Business Context

**Academics** provides the core technology stack that enables 2 Hour Learning:
- **Lesson Planet** - Curriculum content and lesson planning
- **Timeback** - Learning management and time tracking
- **School Management Software** - Operations tools for schools

**Key Insight**: This is the "picks and shovels" business - revenue comes from schools using the technology, regardless of which school model succeeds.

---

## Joe Chart Components (Andy-Style Metrics)

| Component | Status | Data Source | Key Formula |
|-----------|--------|-------------|-------------|
| **Investment to Date** | ✅ READY | Budget vs Actuals | `SUM(expenses) - SUM(revenue)` cumulative |
| **Key Input Lever** | ⚠️ PARTIAL | Need subscription data | `active_subscriptions × avg_price` |
| **Revenue/Margin Trend** | ✅ READY | Budget vs Actuals | Monthly `revenue - expenses` |
| **Path to Breakeven** | ⚠️ PARTIAL | Derived | Requires unit economics model |
| **Execution Risk Score** | ❌ BLOCKED | Manual | No automated data source |
| **R/Y/G Status** | ⚠️ PARTIAL | Derived | Rule-based on other metrics |

---

## Data Availability Summary

### Financial Data (Budget vs Actuals)
**Source**: `core_budgets.consolidated_budgets_and_actuals`
**Filter**: `business_unit = 'Academics'`

| Metric | 2025 YTD Actual | 2026 Budget (Annual) |
|--------|-----------------|----------------------|
| Revenue (Non-Recurring) | $5.5M | $67.2M |
| CF COGS | $2.6M | $8.4M |
| HC Expenses | $6.7M | $14.3M |
| NHC OPEX | $28.9M | $52.7M |
| CF Expenses | $584K | $1.4M |
| **Net (Burn)** | **($33.4M)** | **($9.6M)** |

**Key Insight**: Academics is projecting to be near breakeven in 2026 with $67M revenue vs ~$77M expenses.

### Monthly Trends (Recent Actuals)

| Month | Revenue | Expenses | Net |
|-------|---------|----------|-----|
| Jan 2026 | $857K | $2.2M | -$1.3M |
| Dec 2025 | $777K | $3.4M | -$2.7M |
| Nov 2025 | $790K | $1.6M | -$0.8M |
| Oct 2025 | ~$600K | ~$2.5M | -$1.9M |

---

## Project Structure

```
academics-dashboards/
├── README.md                    # This file
├── AI-BUILDER-SPEC.md          # Full spec for Klair team
├── dashboards/
│   └── joe-chart.html          # Executive summary view
├── sql/
│   └── financial-queries.sql   # Revenue/expense queries
├── data/
│   └── sample-data.json        # Sample data export
└── docs/
    └── data-requirements.md    # Technical specifications
```

---

## Key Metrics (Andy-Style)

### 1. Investment to Date
**Formula**: `cumulative(expenses - revenue)` since inception
**Current Value**: ~$33.4M (2025)
**Data Quality**: ✅ Auditable from Budget vs Actuals

### 2. Key Input Lever: Active Subscriptions
**Formula**: `active_schools × avg_contract_value`
**Current Challenge**: No subscription tracking in Klair
**Proxy**: Revenue can indicate subscription growth
**Data Quality**: ⚠️ Need subscription data integration

### 3. Revenue/Margin Trend
**Formula**: `monthly_revenue - monthly_expenses`
**Trend**: Improving - moving toward breakeven
**Data Quality**: ✅ Monthly from Budget vs Actuals

### 4. Path to Breakeven
**2026 Projection**: $67.2M revenue vs ~$77M expenses = -$9.6M
**Current Gap**: ~$10M to breakeven
**Lever**: +15% revenue or -12% costs
**Data Quality**: ⚠️ Based on budget, not model

### 5. R/Y/G Status
**Current Assessment**: 🟡 YELLOW
- Strong revenue growth trajectory
- Still burning cash but improving
- Path to profitability visible

---

## Critical Data Gaps

### 1. Subscription/Contract Data (HIGH PRIORITY)
**Need**: Active subscription count, contract values, renewal rates
**Impact**: Cannot show true "Key Input Lever"
**Source**: Likely in Salesforce or billing system
**Action**: Request subscription data integration

### 2. Product-Level Revenue Breakdown
**Need**: Revenue by product (Lesson Planet vs Timeback vs School SW)
**Impact**: Cannot identify which products driving growth
**Source**: May be in class/department breakdown
**Action**: Check if class field maps to products

### 3. Customer Count
**Need**: Number of schools/districts using products
**Impact**: Cannot calculate unit economics
**Action**: Identify customer master data source

---

## Key Business Questions

1. **How many schools are using Academics products?**
   - Data Gap: Need customer count

2. **What's the average revenue per school?**
   - Data Gap: Need customer-level revenue

3. **What's the gross margin on subscriptions?**
   - Available: Can calculate from COGS vs Revenue

4. **Is churn a problem?**
   - Data Gap: Need subscription churn data

5. **What's driving expense growth?**
   - Available: HC vs NHC vs CF breakdown

---

## For Klair Team Implementation

### Immediate Actions
1. Add "Academics" business unit filter to dashboards
2. Create Joe Chart view with available metrics
3. Build Revenue/Expense trend visualization

### Data Integration Needed
1. Subscription/contract data from Salesforce
2. Customer (school/district) count
3. Product-level revenue breakdown

### Filter Values
- Budget: `business_unit = 'Academics'`

---

## Comparison to Other Tier 1 Businesses

| Business | Investment | Revenue | Path to Profit |
|----------|------------|---------|----------------|
| **Academics** | -$33.4M | $5.5M | 🟡 Near-term possible |
| Physical Schools | -$98.7M | $20.4M | 🔴 Long-term |
| 2HR Learning | -$55.3M | $0 | 🔴 Pre-revenue |
| Alpha Anywhere | -$2.1M | $0.7M | 🟡 Growing |

**Key Insight**: Academics is closest to profitability among Tier 1 investments.

---

## Contact

Questions about this spec: Mark Rozeboom / Education Analytics Team
