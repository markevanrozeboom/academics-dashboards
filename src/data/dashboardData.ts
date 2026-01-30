// Academics (Tech Stack) Dashboard Data
// Source: Klair Data Warehouse (core_budgets.consolidated_budgets_and_actuals)
// Last Updated: January 30, 2026
// Query: WHERE business_unit = 'Academics'

// ============================================================================
// HISTORICAL DATA (2022-2026) - Full Timeline from Klair
// ============================================================================
export const historicalData = {
  // Yearly Summary (Actuals from Klair)
  yearlySummary: [
    { year: 2022, revenue: 4838051, cogs: 148200, expenses: 5007208, netIncome: -317357, phase: 'Tech Services' },
    { year: 2023, revenue: 4033040, cogs: 493713, expenses: 16066060, netIncome: -12526733, phase: 'Investment Ramp' },
    { year: 2024, revenue: 0, cogs: 2379735, expenses: 28884722, netIncome: -31264457, phase: 'Platform Build' },
    { year: 2025, revenue: 4631420, cogs: 4122867, expenses: 37816255, netIncome: -37307703, phase: 'Revenue Launch' },
    { year: 2026, revenue: 856542, cogs: 199697, expenses: 1998974, netIncome: -1342129, phase: 'Growth (YTD Jan)', isPartial: true },
  ],

  // Monthly Detail (All months from Klair)
  monthlyDetail: [
    // 2022
    { year: 2022, month: 1, revenue: 658400, cogs: 0, expenses: 598941, netIncome: 59459 },
    { year: 2022, month: 2, revenue: 862900, cogs: 0, expenses: 517933, netIncome: 344967 },
    { year: 2022, month: 3, revenue: 680400, cogs: 0, expenses: 534886, netIncome: 145514 },
    { year: 2022, month: 4, revenue: 266000, cogs: 0, expenses: 522196, netIncome: -256196 },
    { year: 2022, month: 5, revenue: 296400, cogs: 0, expenses: 416984, netIncome: -120584 },
    { year: 2022, month: 6, revenue: 281200, cogs: 0, expenses: 425380, netIncome: -144180 },
    { year: 2022, month: 7, revenue: 268733, cogs: 0, expenses: 520382, netIncome: -251649 },
    { year: 2022, month: 8, revenue: 388400, cogs: 0, expenses: 238856, netIncome: 149544 },
    { year: 2022, month: 9, revenue: 328567, cogs: 0, expenses: 219794, netIncome: 108773 },
    { year: 2022, month: 10, revenue: 239350, cogs: 49400, expenses: 342042, netIncome: -152092 },
    { year: 2022, month: 11, revenue: 283850, cogs: 49400, expenses: 275225, netIncome: -40775 },
    { year: 2022, month: 12, revenue: 283850, cogs: 49400, expenses: 394589, netIncome: -160139 },
    // 2023 H1 (Revenue still flowing)
    { year: 2023, month: 1, revenue: 422563, cogs: 102743, expenses: 499031, netIncome: -179211 },
    { year: 2023, month: 2, revenue: 422563, cogs: 102743, expenses: 359062, netIncome: -39242 },
    { year: 2023, month: 3, revenue: 422563, cogs: 102743, expenses: 470001, netIncome: -150181 },
    { year: 2023, month: 4, revenue: 921783, cogs: 12500, expenses: 868295, netIncome: 40988 },
    { year: 2023, month: 5, revenue: 921783, cogs: 12500, expenses: 732377, netIncome: 176906 },
    { year: 2023, month: 6, revenue: 921783, cogs: 12500, expenses: 667902, netIncome: 241381 },
    // 2023 H2 (Investment ramp - no revenue)
    { year: 2023, month: 7, revenue: 0, cogs: 12500, expenses: 2098615, netIncome: -2111115 },
    { year: 2023, month: 8, revenue: 0, cogs: 12500, expenses: 1903607, netIncome: -1916107 },
    { year: 2023, month: 9, revenue: 0, cogs: 12500, expenses: 2033927, netIncome: -2046427 },
    { year: 2023, month: 10, revenue: 0, cogs: 58428, expenses: 1690511, netIncome: -1748939 },
    { year: 2023, month: 11, revenue: 0, cogs: 36828, expenses: 1460098, netIncome: -1496926 },
    { year: 2023, month: 12, revenue: 0, cogs: 15228, expenses: 3282634, netIncome: -3297862 },
    // 2024 (Full investment year - no revenue)
    { year: 2024, month: 1, revenue: 0, cogs: 96248, expenses: 1829707, netIncome: -1925955 },
    { year: 2024, month: 2, revenue: 0, cogs: 96248, expenses: 1965100, netIncome: -2061348 },
    { year: 2024, month: 3, revenue: 0, cogs: 96248, expenses: 2184470, netIncome: -2280718 },
    { year: 2024, month: 4, revenue: 0, cogs: 134740, expenses: 1452392, netIncome: -1587132 },
    { year: 2024, month: 5, revenue: 0, cogs: 134740, expenses: 1790243, netIncome: -1924983 },
    { year: 2024, month: 6, revenue: 0, cogs: 134740, expenses: 2616941, netIncome: -2751681 },
    { year: 2024, month: 7, revenue: 0, cogs: 228267, expenses: 2166150, netIncome: -2394417 },
    { year: 2024, month: 8, revenue: 0, cogs: 228267, expenses: 2127192, netIncome: -2355459 },
    { year: 2024, month: 9, revenue: 0, cogs: 228267, expenses: 2475541, netIncome: -2703808 },
    { year: 2024, month: 10, revenue: 0, cogs: 333990, expenses: 3211090, netIncome: -3545080 },
    { year: 2024, month: 11, revenue: 0, cogs: 333990, expenses: 2270761, netIncome: -2604751 },
    { year: 2024, month: 12, revenue: 0, cogs: 333990, expenses: 4795134, netIncome: -5129124 },
    // 2025 H1 (Still building - no revenue)
    { year: 2025, month: 1, revenue: 0, cogs: 254914, expenses: 2640380, netIncome: -2895294 },
    { year: 2025, month: 2, revenue: 0, cogs: 254914, expenses: 2935533, netIncome: -3190447 },
    { year: 2025, month: 3, revenue: 0, cogs: 254914, expenses: 5024273, netIncome: -5279187 },
    { year: 2025, month: 4, revenue: 0, cogs: 525423, expenses: 3207138, netIncome: -3732561 },
    { year: 2025, month: 5, revenue: 0, cogs: 525423, expenses: 2740155, netIncome: -3265578 },
    { year: 2025, month: 6, revenue: 0, cogs: 525423, expenses: 4632794, netIncome: -5158217 },
    // 2025 H2 (Revenue launch!)
    { year: 2025, month: 7, revenue: 716861, cogs: 311388, expenses: 1739657, netIncome: -1334184 },
    { year: 2025, month: 8, revenue: 823115, cogs: 311388, expenses: 1521417, netIncome: -1009690 },
    { year: 2025, month: 9, revenue: 752278, cogs: 311388, expenses: 7000011, netIncome: -6559121 },
    { year: 2025, month: 10, revenue: 772500, cogs: 282563, expenses: 1864984, netIncome: -1375047 },
    { year: 2025, month: 11, revenue: 789833, cogs: 282563, expenses: 1354131, netIncome: -846861 },
    { year: 2025, month: 12, revenue: 776833, cogs: 282563, expenses: 3155781, netIncome: -2661511 },
    // 2026 (Growth year)
    { year: 2026, month: 1, revenue: 856542, cogs: 199697, expenses: 1998974, netIncome: -1342129 },
  ],

  // Key Milestones
  milestones: [
    { date: '2022-01', event: 'Academics operates as tech services team', type: 'info' },
    { date: '2022-12', event: 'Near breakeven: -$317K annual loss', type: 'positive' },
    { date: '2023-07', event: 'Major investment begins - costs triple', type: 'investment' },
    { date: '2023-12', event: 'Revenue paused for platform rebuild', type: 'info' },
    { date: '2024-01', event: 'Full investment year begins', type: 'investment' },
    { date: '2024-12', event: 'Platform development complete', type: 'positive' },
    { date: '2025-07', event: 'Revenue resumes - schools licensing platform', type: 'positive' },
    { date: '2025-11', event: 'Best month: only $847K loss', type: 'positive' },
    { date: '2026-01', event: 'Revenue grows to $857K/month', type: 'positive' },
  ],

  // Cumulative Investment
  cumulativeInvestment: {
    total: -81459061, // Sum of all net income 2022-2026
    byYear: [
      { year: 2022, cumulative: -317357 },
      { year: 2023, cumulative: -12844090 }, // -317K + -12.5M
      { year: 2024, cumulative: -44108547 }, // + -31.3M
      { year: 2025, cumulative: -81416250 }, // + -37.3M
      { year: 2026, cumulative: -82758379 }, // + -1.3M (Jan only)
    ],
  },

  // Revenue Sources (from vendor analysis)
  revenueSources: [
    { name: '2HR Learning Licensing (Standard)', amount: 3509171, description: 'Schools licensing 2HR curriculum' },
    { name: '2HR Learning Licensing (Virtual/ESA)', amount: 1214500, description: 'Virtual school licenses' },
    { name: '2HR Learning Licensing (MTSS)', amount: 742625, description: 'MTSS program licenses' },
    { name: 'Alpha Coaching', amount: 1894500, description: 'Internal coaching services' },
    { name: 'Other Internal Services', amount: 2997155, description: 'Crossover, Pipeline, Data services' },
  ],

  // Major Cost Centers (from vendor analysis)
  majorCostCenters: [
    { name: 'AE Studio', amount: 25509289, department: 'Product', description: 'Primary development partner' },
    { name: 'LightCI', amount: 5803650, department: 'Product', description: 'Development services' },
    { name: 'Eigen Consulting', amount: 5028759, department: 'Product/Engineering', description: 'Consulting' },
    { name: 'Beyond AI LTDA', amount: 3418650, department: 'Engineering/Product', description: 'AI development' },
    { name: 'AWS/SaaS Central', amount: 3400296, department: 'Infrastructure', description: 'Cloud infrastructure' },
    { name: 'First Principles Catalyst', amount: 2258056, department: 'Product', description: 'Development' },
    { name: 'Kickdrum Technology', amount: 2139126, department: 'Product', description: 'Development' },
  ],
};

// ============================================================================
// JOE CHART KPIs
// ============================================================================
export const joeChartData = {
  // Investment to Date (Cumulative from Klair actuals)
  investmentToDate: {
    value: -81416250, // Cumulative net loss 2022-2025
    label: 'Cumulative Investment',
    source: 'Klair: core_budgets.consolidated_budgets_and_actuals',
    breakdown: [
      { year: 2022, amount: -317357, note: 'Near breakeven as tech services' },
      { year: 2023, amount: -12526733, note: 'Investment ramp H2' },
      { year: 2024, amount: -31264457, note: 'Full platform build year' },
      { year: 2025, amount: -37307703, note: 'Revenue launch H2' },
    ],
  },

  // Key Input Lever: Revenue
  keyInputLever: {
    revenue2025: 4631420, // $4.63M actual (Jul-Dec 2025)
    revenue2022: 4838051, // Historical baseline
    revenue2023H1: 4033040, // Before investment pause
    revenueGrowth: 15, // 2025 vs 2023 (comparable periods)
    label: 'Revenue (Licensing Fees)',
    note: 'Revenue = schools licensing 2HR platform. Paused 2023 H2-2025 H1 for platform rebuild.',
  },

  // Path to Breakeven
  breakeven: {
    revenue2026Budget: 40441250, // $40.4M (conservative - assumes no enrollment growth)
    expenses2026Budget: 23936586, // Budget expenses
    gap2026: -15900000, // Per Business Tiering Framework
    requiredRevenue: 42000000, // At current cost structure
    grossMarginPct: 63.8, // Q4 2025 margin (when revenue flowing)
    currentTrend: 'improving',
    note: 'Budget is conservative - assumes no enrollment growth',
  },

  // R/Y/G Status
  status: {
    overall: 'YELLOW',
    reasons: [
      'Cumulative investment $81.4M over 4 years',
      'Revenue resumed July 2025 at $717K-$857K/month',
      'Q4 2025 gross margin 63.8% (strong when revenue flows)',
      'Path to profit requires 8.7x revenue growth OR cost optimization',
    ],
  },

  // Monthly Revenue/Expense Trend (Recent - Actual from Klair)
  monthlyTrend: {
    labels: ['Jul 25', 'Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26'],
    revenue: [716861, 823115, 752278, 772500, 789833, 776833, 856542],
    expenses: [2051046, 1832806, 7311399, 2147548, 1636694, 3438344, 2198671],
    netIncome: [-1334185, -1009691, -6559121, -1375048, -846861, -2661511, -1342129],
  },
};

// ============================================================================
// FINANCIAL DATA
// ============================================================================
export const financialData = {
  // Summary KPIs (2025 Actuals from Klair)
  kpis: {
    revenue2025: 4631420,
    expenses2025: 41939123,
    netIncome2025: -37307703,
    cogsTotal: 4122867,
    grossProfit: 508553,
    grossMarginPct: 11, // Full year (includes 6 months no revenue)
    grossMarginQ4: 63.8, // Q4 when revenue was flowing
  },

  // Revenue by Type (2025 Actuals)
  revenueByType: {
    labels: ['2HR Licensing (Standard)', '2HR Licensing (Virtual)', '2HR Licensing (MTSS)', 'Internal Services'],
    data: [3509171, 1214500, 742625, 4891655], // Total ~$10.4M over all years
    colors: ['#00d26a', '#4facfe', '#f093fb', '#feca57'],
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
      { name: 'Revenue', actual: 4631420, budget: 0, variance: 0 },
      { name: 'HC Expenses', actual: 8465558, budget: 10221640, variance: -17 },
      { name: 'NHC OPEX', actual: 28908447, budget: 17856532, variance: 62 },
      { name: 'CF COGS', actual: 4122867, budget: 3603154, variance: 14 },
      { name: 'CF Expenses', actual: 442250, budget: 375000, variance: 18 },
    ],
  },

  // Multi-Year Comparison (Actuals from Klair)
  yearOverYearComparison: [
    { year: 2022, revenue: 4838051, expenses: 5155408, netIncome: -317357, grossMargin: 97 },
    { year: 2023, revenue: 4033040, expenses: 16559773, netIncome: -12526733, grossMargin: 88 },
    { year: 2024, revenue: 0, expenses: 31264457, netIncome: -31264457, grossMargin: 0 },
    { year: 2025, revenue: 4631420, expenses: 41939123, netIncome: -37307703, grossMargin: 11 },
  ],
};

// ============================================================================
// GROSS MARGIN DATA
// ============================================================================
export const grossMarginData = {
  // Summary (2025 Actuals)
  summary: {
    revenue: 4631420,
    cogs: 4122867,
    grossProfit: 508553,
    marginPct: 11.0, // Full year
    marginPctQ4: 63.8, // Q4 when revenue flowing
  },

  // Quarterly Breakdown (2025)
  quarterlyMargin: [
    { quarter: 'Q1 2025', revenue: 0, cogs: 764742, grossProfit: -764742, margin: 0 },
    { quarter: 'Q2 2025', revenue: 0, cogs: 1576270, grossProfit: -1576270, margin: 0 },
    { quarter: 'Q3 2025', revenue: 2292254, cogs: 934165, grossProfit: 1358089, margin: 59.2 },
    { quarter: 'Q4 2025', revenue: 2339166, cogs: 847690, grossProfit: 1491476, margin: 63.8 },
  ],

  // Monthly Trend (2025)
  monthlyMargin: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenue: [0, 0, 0, 0, 0, 0, 716861, 823115, 752278, 772500, 789833, 776833],
    cogs: [254914, 254914, 254914, 525423, 525423, 525423, 311388, 311388, 311388, 282563, 282563, 282563],
    marginPct: [0, 0, 0, 0, 0, 0, 56.6, 62.2, 58.6, 63.4, 64.2, 63.6],
  },

  // Historical Margin Trend (Yearly)
  historicalMargin: [
    { year: 2022, revenue: 4838051, cogs: 148200, grossProfit: 4689851, margin: 96.9 },
    { year: 2023, revenue: 4033040, cogs: 493713, grossProfit: 3539327, margin: 87.8 },
    { year: 2024, revenue: 0, cogs: 2379735, grossProfit: -2379735, margin: 0 },
    { year: 2025, revenue: 4631420, cogs: 4122867, grossProfit: 508553, margin: 11.0 },
  ],

  // COGS Breakdown
  cogsBreakdown: {
    labels: ['CF COGS (Central Factory/Infrastructure)'],
    data: [4122867],
    colors: ['#f093fb'],
  },

  // Benchmarks
  benchmarks: {
    industryAvg: 65,
    target: 60,
    current: 11.0,
    q4Actual: 63.8,
    historical2022: 96.9,
    gap: -49.0,
  },
};

// ============================================================================
// PATH TO BREAKEVEN
// ============================================================================
export const breakevenData = {
  // Current State (based on Jan 2026)
  current: {
    monthlyRevenue: 856542,
    monthlyExpenses: 2198671,
    monthlyBurn: -1342129,
    annualizedRevenue: 10278504, // $857K * 12
    annualizedExpenses: 26384052, // $2.2M * 12
  },

  // 2026 Budget Projections
  projection2026: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    revenue: [10110312, 10110312, 10110312, 10110312],
    expenses: [5984056, 5984056, 5984056, 5984056],
    netIncome: [4126256, 4126256, 4126256, 4126256],
    note: 'Budget is conservative - assumes no enrollment growth',
  },

  // Breakeven Analysis
  analysis: {
    currentAnnualRevenue: 10278504, // Annualized from Jan 2026
    budgetRevenue2026: 40441250,
    currentGap: -15900000,
    requiredRevenue: 42000000,
    alternativeApproach: {
      revenueWith60Margin: 35000000,
      costReductionAlternative: 50,
    },
  },

  // Scenario Modeling
  scenarios: [
    { name: 'FY26 Budget', revenue: 40441250, expenses: 23936586, net: 16504664, status: 'profit' },
    { name: 'Conservative (50%)', revenue: 20220625, expenses: 23936586, net: -3715961, status: 'loss' },
    { name: 'Current Run Rate', revenue: 10278504, expenses: 26384052, net: -16105548, status: 'loss' },
    { name: 'Cost Reduction (30%)', revenue: 10278504, expenses: 18468836, net: -8190332, status: 'loss' },
  ],

  // Historical Context
  historicalBreakeven: {
    note: 'Academics was near breakeven in 2022 (-$317K) before major platform investment',
    nearBreakevenYear: 2022,
    nearBreakevenLoss: -317357,
    peakInvestmentYear: 2025,
    peakInvestmentLoss: -37307703,
  },
};
