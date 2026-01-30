-- Academics (Tech Stack) Financial Queries
-- For Joe Chart Dashboard
-- Last Updated: 2026-01-30

-- ============================================
-- 1. INVESTMENT TO DATE (Cumulative Burn)
-- ============================================

SELECT SUM(
    CASE
        WHEN type LIKE '%Revenue%' THEN -CAST(amount AS DECIMAL(18,2))
        ELSE CAST(amount AS DECIMAL(18,2))
    END
) as investment_to_date
FROM core_budgets.consolidated_budgets_and_actuals
WHERE business_unit = 'Academics'
  AND data_source = 'Actual';

-- With monthly breakdown
WITH monthly_totals AS (
    SELECT
        reporting_period,
        SUM(CASE WHEN type LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as revenue,
        SUM(CASE WHEN type NOT LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as expenses
    FROM core_budgets.consolidated_budgets_and_actuals
    WHERE business_unit = 'Academics'
      AND data_source = 'Actual'
    GROUP BY reporting_period
)
SELECT
    reporting_period,
    revenue,
    expenses,
    expenses - revenue as net_burn,
    SUM(expenses - revenue) OVER (ORDER BY reporting_period) as cumulative_investment
FROM monthly_totals
ORDER BY reporting_period;

-- ============================================
-- 2. GROSS MARGIN CALCULATION
-- ============================================

SELECT
    EXTRACT(YEAR FROM reporting_period) as year,
    SUM(CASE WHEN type LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as revenue,
    SUM(CASE WHEN type LIKE '%COGS%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as cogs,
    SUM(CASE WHEN type LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) -
    SUM(CASE WHEN type LIKE '%COGS%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as gross_profit,
    ROUND(
        (SUM(CASE WHEN type LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) -
         SUM(CASE WHEN type LIKE '%COGS%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END)) * 100.0 /
        NULLIF(SUM(CASE WHEN type LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END), 0),
        1
    ) as gross_margin_pct
FROM core_budgets.consolidated_budgets_and_actuals
WHERE business_unit = 'Academics'
  AND data_source = 'Actual'
GROUP BY EXTRACT(YEAR FROM reporting_period)
ORDER BY year;

-- ============================================
-- 3. EXPENSE BREAKDOWN BY TYPE
-- ============================================

SELECT
    type,
    SUM(CAST(amount AS DECIMAL(18,2))) as total_amount,
    ROUND(
        SUM(CAST(amount AS DECIMAL(18,2))) * 100.0 /
        SUM(SUM(CAST(amount AS DECIMAL(18,2)))) OVER (),
        1
    ) as pct_of_total
FROM core_budgets.consolidated_budgets_and_actuals
WHERE business_unit = 'Academics'
  AND data_source = 'Actual'
  AND type NOT LIKE '%Revenue%'
GROUP BY type
ORDER BY total_amount DESC;

-- ============================================
-- 4. MONTHLY REVENUE/EXPENSE TREND
-- ============================================

SELECT
    reporting_period,
    SUM(CASE WHEN type LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as revenue,
    SUM(CASE WHEN type LIKE '%COGS%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as cogs,
    SUM(CASE WHEN type = 'HC Expenses' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as hc_expenses,
    SUM(CASE WHEN type = 'NHC OPEX' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as nhc_opex,
    SUM(CASE WHEN type = 'CF Expenses' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as cf_expenses,
    SUM(CASE WHEN type LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) -
    SUM(CASE WHEN type NOT LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as net_income
FROM core_budgets.consolidated_budgets_and_actuals
WHERE business_unit = 'Academics'
  AND data_source = 'Actual'
  AND reporting_period >= '2025-01-01'
GROUP BY reporting_period
ORDER BY reporting_period;

-- ============================================
-- 5. BUDGET VS ACTUAL COMPARISON
-- ============================================

SELECT
    reporting_period,
    SUM(CASE WHEN data_source = 'Actual' AND type LIKE '%Revenue%'
        THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as actual_revenue,
    SUM(CASE WHEN data_source = 'Budget' AND type LIKE '%Revenue%'
        THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as budget_revenue,
    SUM(CASE WHEN data_source = 'Actual' AND type NOT LIKE '%Revenue%'
        THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as actual_expenses,
    SUM(CASE WHEN data_source = 'Budget' AND type NOT LIKE '%Revenue%'
        THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as budget_expenses
FROM core_budgets.consolidated_budgets_and_actuals
WHERE business_unit = 'Academics'
  AND reporting_period >= '2025-01-01'
GROUP BY reporting_period
ORDER BY reporting_period;

-- ============================================
-- 6. PATH TO BREAKEVEN
-- ============================================

-- Annual projection
SELECT
    EXTRACT(YEAR FROM reporting_period) as year,
    data_source,
    SUM(CASE WHEN type LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as total_revenue,
    SUM(CASE WHEN type NOT LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as total_expenses,
    SUM(CASE WHEN type LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) -
    SUM(CASE WHEN type NOT LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as net_income,
    CASE
        WHEN SUM(CASE WHEN type LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) >=
             SUM(CASE WHEN type NOT LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END)
        THEN 'PROFITABLE'
        ELSE 'LOSS'
    END as status
FROM core_budgets.consolidated_budgets_and_actuals
WHERE business_unit = 'Academics'
GROUP BY EXTRACT(YEAR FROM reporting_period), data_source
ORDER BY year, data_source;

-- ============================================
-- 7. YoY GROWTH COMPARISON
-- ============================================

WITH yearly_data AS (
    SELECT
        EXTRACT(YEAR FROM reporting_period) as year,
        SUM(CASE WHEN type LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as revenue,
        SUM(CASE WHEN type NOT LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as expenses
    FROM core_budgets.consolidated_budgets_and_actuals
    WHERE business_unit = 'Academics'
      AND data_source = 'Actual'
    GROUP BY EXTRACT(YEAR FROM reporting_period)
)
SELECT
    year,
    revenue,
    LAG(revenue) OVER (ORDER BY year) as prior_year_revenue,
    ROUND((revenue - LAG(revenue) OVER (ORDER BY year)) * 100.0 /
          NULLIF(LAG(revenue) OVER (ORDER BY year), 0), 1) as revenue_growth_pct,
    expenses,
    LAG(expenses) OVER (ORDER BY year) as prior_year_expenses,
    ROUND((expenses - LAG(expenses) OVER (ORDER BY year)) * 100.0 /
          NULLIF(LAG(expenses) OVER (ORDER BY year), 0), 1) as expense_growth_pct
FROM yearly_data
ORDER BY year;

-- ============================================
-- 8. MONTHLY BURN RATE
-- ============================================

SELECT
    reporting_period,
    SUM(CASE WHEN type NOT LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) -
    SUM(CASE WHEN type LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) as monthly_burn,
    AVG(
        SUM(CASE WHEN type NOT LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END) -
        SUM(CASE WHEN type LIKE '%Revenue%' THEN CAST(amount AS DECIMAL(18,2)) ELSE 0 END)
    ) OVER (ORDER BY reporting_period ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as three_month_avg_burn
FROM core_budgets.consolidated_budgets_and_actuals
WHERE business_unit = 'Academics'
  AND data_source = 'Actual'
GROUP BY reporting_period
ORDER BY reporting_period;
