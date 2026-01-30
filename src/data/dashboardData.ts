// Academics (Tech Stack) Dashboard Data
// Source: Klair Data Warehouse (core_budgets.consolidated_budgets_and_actuals)
// Last Updated: January 30, 2026
// Query: WHERE business_unit = 'Academics' AND entity_type IN ('BU', 'CF', 'Education', 'Other')

// Joe Chart KPIs
export const joeChartData = {
  // Investment to Date (FY26 Investment per Business Tiering Framework)
  investmentToDate: {
    value: -15900000, // -$15.9M FY26 Investment (from Business Tiering Framework)
    label: 'FY26 Investment',
    source: 'EDU Cash Burn 2025 and 2026.xlsx - Business Tiering Framework',
    breakdown: [
      { year: 2024, amount: -31264457 }, // Actual: $0 revenue, $31.3M costs
      { year: 2025, amount: -37307702 }, // Actual: $4.6M revenue, $41.9M costs
    ],
  },

  // Key Input Lever: Revenue (subscription count not available in Klair)
  keyInputLever: {
    revenue2025: 4631420, // $4.63M actual YTD (Jul-Dec only had revenue)
    revenueGrowth: 0, // N/A - 2024 had $0 revenue
    label: 'Revenue (Proxy for Subscriptions)',
    note: 'Revenue started July 2025. Products: Lesson Planet, Timeback, School Management SW',
  },

  // Path to Breakeven
  breakeven: {
    revenue2026Budget: 40441250, // $40.4M (2026-Q1 budget version)
    expenses2026Budget: 23936586, // COGS + Expenses from budget
    gap2026: -15900000, // Per Business Tiering Framework
    requiredRevenue: 42000000, // At current cost structure
    grossMarginPct: 11, // Actual: (Revenue - COGS) / Revenue
    currentTrend: 'improving',
  },

  // R/Y/G Status
  status: {
    overall: 'YELLOW',
    reasons: [
      'FY26 Investment -$15.9M (lowest among Tier 1)',
      'Revenue growth Q3-Q4 2025 strong ($717K→$857K/mo)',
      'High NHC OPEX (76% of expenses) - optimization opportunity',
    ],
  },

  // Monthly Revenue/Expense Trend (Actual from Klair)
  monthlyTrend: {
    labels: ['Jul 25', 'Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26'],
    revenue: [716861, 823115, 752278, 772500, 789833, 776833, 856542],
    expenses: [2051046, 1832806, 7311399, 2147548, 1636694, 3438344, 2198671], // COGS + Expenses
    netIncome: [-1334185, -1009691, -6559121, -1375048, -846861, -2661511, -1342129],
  },
};

// Financial Data
export const financialData = {
  // Summary KPIs (2025 Actuals from Klair)
  kpis: {
    revenue2025: 4631420, // $4.63M (Jul-Dec 2025 only)
    expenses2025: 41939123, // COGS ($4.12M) + Expenses ($37.82M)
    netIncome2025: -37307703, // -$37.3M loss
    cogsTotal: 4122867, // CF COGS only (no HC/NHC COGS for this BU)
    grossProfit: 508553, // Revenue - COGS
    grossMarginPct: 11, // Very low - COGS nearly matches revenue
  },

  // Revenue by Type (2025 Actuals)
  revenueByType: {
    labels: ['Non Recurring Revenue', 'Recurring Revenue'],
    data: [4631420, 0], // All revenue classified as Non Recurring
    colors: ['#00d26a', '#4facfe'],
  },

  // Expense Breakdown (2025 Actuals from Klair)
  expenseBreakdown: {
    labels: ['NHC OPEX', 'HC Expenses', 'CF COGS', 'CF Expenses'],
    data: [28908447, 8465558, 4122867, 442250],
    colors: ['#4facfe', '#00f2fe', '#f093fb', '#feca57'],
    percentages: [68.9, 20.2, 9.8, 1.1],
  },

  // Monthly P&L Detail (2025 Actuals from Klair)
  monthlyPL: [
    { month: 'Jan 2025', revenue: 0, expenses: 2895294, net: -2895294 },
    { month: 'Feb 2025', revenue: 0, expenses: 3190447, net: -3190447 },
    { month: 'Mar 2025', revenue: 0, expenses: 5279187, net: -5279187 },
    { month: 'Apr 2025', revenue: 0, expenses: 3732562, net: -3732562 },
    { month: 'May 2025', revenue: 0, expenses: 3265578, net: -3265578 },
    { month: 'Jun 2025', revenue: 0, expenses: 5158217, net: -5158217 },
    { month: 'Jul 2025', revenue: 716861, expenses: 2051046, net: -1334185 },
    { month: 'Aug 2025', revenue: 823115, expenses: 1832806, net: -1009691 },
    { month: 'Sep 2025', revenue: 752278, expenses: 7311399, net: -6559121 },
    { month: 'Oct 2025', revenue: 772500, expenses: 2147548, net: -1375048 },
    { month: 'Nov 2025', revenue: 789833, expenses: 1636694, net: -846861 },
    { month: 'Dec 2025', revenue: 776833, expenses: 3438344, net: -2661511 },
  ],

  // Budget vs Actual (2025)
  budgetVsActual: {
    categories: [
      { name: 'Revenue', actual: 4631420, budget: 0, variance: 0 }, // No budget data for 2025
      { name: 'HC Expenses', actual: 8465558, budget: 10221640, variance: -17 },
      { name: 'NHC OPEX', actual: 28908447, budget: 17856532, variance: 62 }, // Over budget
      { name: 'CF COGS', actual: 4122867, budget: 3603154, variance: 14 },
      { name: 'CF Expenses', actual: 442250, budget: 375000, variance: 18 },
    ],
  },

  // YoY Comparison (Actuals from Klair)
  yoyComparison: {
    revenue: { y2024: 0, y2025: 4631420, growth: 0 }, // No 2024 revenue
    expenses: { y2024: 31264457, y2025: 41939123, growth: 34.2 },
    margin: { y2024: 0, y2025: 11, improvement: 11 }, // Started generating revenue
  },
};

// Gross Margin Data
export const grossMarginData = {
  // Summary (2025 Actuals)
  summary: {
    revenue: 4631420,
    cogs: 4122867, // CF COGS
    grossProfit: 508553,
    marginPct: 11.0,
  },

  // Quarterly Breakdown (2025 - revenue only in Q3/Q4)
  quarterlyMargin: [
    { quarter: 'Q1 2025', revenue: 0, cogs: 764742, grossProfit: -764742, margin: 0 },
    { quarter: 'Q2 2025', revenue: 0, cogs: 1576270, grossProfit: -1576270, margin: 0 },
    { quarter: 'Q3 2025', revenue: 2292254, cogs: 934165, grossProfit: 1358089, margin: 59.2 },
    { quarter: 'Q4 2025', revenue: 2339166, cogs: 847690, grossProfit: 1491476, margin: 63.8 },
  ],

  // Monthly Trend (Revenue started July 2025)
  monthlyMargin: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenue: [0, 0, 0, 0, 0, 0, 716861, 823115, 752278, 772500, 789833, 776833],
    cogs: [254914, 254914, 254914, 525423, 525423, 525423, 311388, 311388, 311388, 282563, 282563, 282563],
    marginPct: [0, 0, 0, 0, 0, 0, 56.6, 62.2, 58.6, 63.4, 64.2, 63.6],
  },

  // COGS Breakdown (CF COGS is the only COGS type for Academics)
  cogsBreakdown: {
    labels: ['CF COGS (Central Factory/Infrastructure)'],
    data: [4122867],
    colors: ['#f093fb'],
  },

  // Benchmarks (SaaS industry)
  benchmarks: {
    industryAvg: 65,
    target: 60,
    current: 11.0, // Full year basis (including months with no revenue)
    q4Actual: 63.8, // Q4 margin when revenue was flowing
    gap: -49.0, // Gap to industry on full year basis
  },
};

// Path to Breakeven Analysis
export const breakevenData = {
  // Current State (based on Dec 2025)
  current: {
    monthlyRevenue: 776833,
    monthlyExpenses: 3438344, // COGS + Expenses
    monthlyBurn: -2661511,
  },

  // 2026 Budget Projections (from 2026-Q1 budget version)
  projection2026: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    revenue: [10110312, 10110312, 10110312, 10110312], // $40.4M / 4
    expenses: [5984056, 5984056, 5984056, 5984056], // Estimated quarterly
    netIncome: [4126256, 4126256, 4126256, 4126256], // Budget shows path to profit
  },

  // Breakeven Analysis
  analysis: {
    currentAnnualRevenue: 4631420,
    budgetRevenue2026: 40441250, // 8.7x growth required
    currentGap: -15900000, // FY26 Investment target
    requiredRevenue: 42000000, // At current expense run rate
    alternativeApproach: {
      revenueWith60Margin: 35000000,
      costReductionAlternative: 50, // 50% cost reduction with current revenue
    },
  },

  // Scenario Modeling
  scenarios: [
    { name: 'FY26 Budget', revenue: 40441250, expenses: 23936586, net: 16504664, status: 'profit' },
    { name: 'Conservative (50% of budget)', revenue: 20220625, expenses: 23936586, net: -3715961, status: 'loss' },
    { name: 'Cost Reduction (30%)', revenue: 20220625, expenses: 16755610, net: 3465015, status: 'profit' },
  ],
};
