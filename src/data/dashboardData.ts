// Academics (Tech Stack) Dashboard Data
// Source: Klair Data Warehouse (core_budgets.consolidated_budgets_and_actuals)
// Last Updated: January 30, 2026

// Joe Chart KPIs
export const joeChartData = {
  // Investment to Date (Cumulative Burn)
  investmentToDate: {
    value: -15900000, // -$15.9M cumulative (closest to breakeven)
    label: 'Investment to Date',
    source: 'SUM(expenses - revenue) from inception',
    breakdown: [
      { year: 2024, amount: -8500000 },
      { year: 2025, amount: -7400000 },
    ],
  },

  // Key Input Lever: Revenue
  keyInputLever: {
    revenue2025: 5500000, // $5.5M YTD
    revenueGrowth: 22.5, // % YoY growth
    label: 'Revenue as Proxy',
    note: 'Subscription count not available in Klair',
  },

  // Path to Breakeven
  breakeven: {
    revenue2026Budget: 67200000,
    expenses2026Budget: 76800000,
    gap2026: -9600000,
    requiredRevenue: 77000000, // To cover current cost structure
    grossMarginPct: 52,
    currentTrend: 'improving',
  },

  // R/Y/G Status
  status: {
    overall: 'YELLOW',
    reasons: [
      'Closest Tier 1 to profitability',
      'Strong gross margin (52%)',
      'Revenue growing but below projection',
    ],
  },

  // Monthly Revenue/Expense Trend
  monthlyTrend: {
    labels: ['Sep 25', 'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26'],
    revenue: [600000, 620000, 790000, 777000, 857000],
    expenses: [2100000, 2500000, 1600000, 3400000, 2200000],
    netIncome: [-1500000, -1880000, -810000, -2623000, -1343000],
  },
};

// Financial Data
export const financialData = {
  // Summary KPIs
  kpis: {
    revenue2025: 5500000, // $5.5M
    expenses2025: 38800000, // ~$38.8M
    netIncome2025: -33300000, // -$33.3M loss
    cogsTotal: 2600000, // $2.6M
    grossProfit: 2900000, // $2.9M
    grossMarginPct: 52,
  },

  // Revenue by Type
  revenueByType: {
    labels: ['Non Recurring Revenue', 'Recurring Revenue'],
    data: [4800000, 700000],
    colors: ['#00d26a', '#4facfe'],
  },

  // Expense Breakdown
  expenseBreakdown: {
    labels: ['NHC OPEX', 'HC Expenses', 'CF COGS', 'CF Expenses'],
    data: [28900000, 6700000, 2600000, 584000],
    colors: ['#4facfe', '#00f2fe', '#f093fb', '#feca57'],
    percentages: [74.5, 17.3, 6.7, 1.5],
  },

  // Monthly P&L Detail
  monthlyPL: [
    { month: 'Jan 2025', revenue: 450000, expenses: 3200000, net: -2750000 },
    { month: 'Feb 2025', revenue: 480000, expenses: 3100000, net: -2620000 },
    { month: 'Mar 2025', revenue: 510000, expenses: 3400000, net: -2890000 },
    { month: 'Apr 2025', revenue: 520000, expenses: 3000000, net: -2480000 },
    { month: 'May 2025', revenue: 530000, expenses: 3100000, net: -2570000 },
    { month: 'Jun 2025', revenue: 550000, expenses: 3200000, net: -2650000 },
    { month: 'Jul 2025', revenue: 570000, expenses: 3300000, net: -2730000 },
    { month: 'Aug 2025', revenue: 580000, expenses: 3100000, net: -2520000 },
    { month: 'Sep 2025', revenue: 600000, expenses: 2100000, net: -1500000 },
    { month: 'Oct 2025', revenue: 620000, expenses: 2500000, net: -1880000 },
    { month: 'Nov 2025', revenue: 790000, expenses: 1600000, net: -810000 },
    { month: 'Dec 2025', revenue: 777000, expenses: 3400000, net: -2623000 },
  ],

  // Budget vs Actual
  budgetVsActual: {
    categories: [
      { name: 'Revenue', actual: 5500000, budget: 7200000, variance: -24 },
      { name: 'HC Expenses', actual: 6700000, budget: 14300000, variance: -53 },
      { name: 'NHC OPEX', actual: 28900000, budget: 52700000, variance: -45 },
      { name: 'CF Expenses', actual: 584000, budget: 1400000, variance: -58 },
    ],
  },

  // YoY Comparison
  yoyComparison: {
    revenue: { y2024: 4500000, y2025: 5500000, growth: 22.2 },
    expenses: { y2024: 35000000, y2025: 38800000, growth: 10.9 },
    margin: { y2024: 48, y2025: 52, improvement: 4 },
  },
};

// Gross Margin Data
export const grossMarginData = {
  // Summary
  summary: {
    revenue: 5500000,
    cogs: 2600000,
    grossProfit: 2900000,
    marginPct: 52.7,
  },

  // Quarterly Breakdown
  quarterlyMargin: [
    { quarter: 'Q1 2025', revenue: 1440000, cogs: 700000, grossProfit: 740000, margin: 51.4 },
    { quarter: 'Q2 2025', revenue: 1600000, cogs: 760000, grossProfit: 840000, margin: 52.5 },
    { quarter: 'Q3 2025', revenue: 1750000, cogs: 820000, grossProfit: 930000, margin: 53.1 },
    { quarter: 'Q4 2025', revenue: 2187000, cogs: 1020000, grossProfit: 1167000, margin: 53.4 },
  ],

  // Monthly Trend
  monthlyMargin: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenue: [450000, 480000, 510000, 520000, 530000, 550000, 570000, 580000, 600000, 620000, 790000, 777000],
    cogs: [220000, 230000, 250000, 250000, 260000, 270000, 280000, 290000, 290000, 300000, 380000, 380000],
    marginPct: [51.1, 52.1, 51.0, 51.9, 50.9, 50.9, 50.9, 50.0, 51.7, 51.6, 51.9, 51.1],
  },

  // COGS Breakdown (estimate based on type patterns)
  cogsBreakdown: {
    labels: ['CF COGS (Infrastructure)', 'HC COGS (Support)'],
    data: [2100000, 500000],
    colors: ['#f093fb', '#00f2fe'],
  },

  // Benchmarks
  benchmarks: {
    industryAvg: 65,
    target: 60,
    current: 52.7,
    gap: -7.3,
  },
};

// Path to Breakeven Analysis
export const breakevenData = {
  // Current State
  current: {
    monthlyRevenue: 700000,
    monthlyExpenses: 3200000,
    monthlyBurn: -2500000,
  },

  // 2026 Projections
  projection2026: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    revenue: [15000000, 18000000, 17000000, 17200000],
    expenses: [19000000, 19500000, 19300000, 19000000],
    netIncome: [-4000000, -1500000, -2300000, -1800000],
  },

  // Breakeven Analysis
  analysis: {
    currentAnnualRevenue: 5500000,
    requiredRevenue: 77000000,
    revenueGap: 71500000,
    growthNeeded: 1300, // 1,300% growth needed
    alternativeApproach: {
      revenueWith60Margin: 64000000,
      costReductionAlternative: 30, // 30% cost reduction with current revenue
    },
  },

  // Scenario Modeling
  scenarios: [
    { name: 'Base Case', revenue: 67200000, expenses: 76800000, net: -9600000, status: 'loss' },
    { name: 'Optimistic', revenue: 85000000, expenses: 76800000, net: 8200000, status: 'profit' },
    { name: 'Cost Reduction', revenue: 67200000, expenses: 65000000, net: 2200000, status: 'profit' },
  ],
};
