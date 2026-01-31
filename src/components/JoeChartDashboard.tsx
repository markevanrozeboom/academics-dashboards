'use client';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { joeChartData, financialData, breakevenData, historicalData, customerMetrics } from '@/data/dashboardData';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement, Filler);

export default function JoeChartDashboard() {
  const { investmentToDate, keyInputLever, breakeven, status, monthlyTrend } = joeChartData;
  const { yearlySummary } = historicalData;

  return (
    <div className="p-5 min-h-screen" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-1" style={{ background: 'linear-gradient(90deg, #a855f7, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Academics (Tech Stack) - Joe Chart
        </h1>
        <p className="text-gray-400 text-sm">Executive Dashboard | Andy.md Framework: Inputs → Assumptions → Output</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className={`px-4 py-1 rounded-full text-sm font-bold ${
            status.overall === 'GREEN' ? 'bg-green-500/20 text-green-400' :
            status.overall === 'YELLOW' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {status.overall}
          </span>
          <span className="text-xs text-gray-500">| Closest to Breakeven Among Tier 1</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Top Row: 3 Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Investment to Date */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 text-sm font-semibold mb-2">CUMULATIVE INVESTMENT (2022-2025)</h3>
            <div className="text-4xl font-bold text-red-400 mb-2">
              ${Math.abs(investmentToDate.value / 1000000).toFixed(1)}M
            </div>
            <p className="text-gray-400 text-xs mb-3">Total net loss over 4 years</p>
            <div className="space-y-1 text-xs">
              {investmentToDate.breakdown.map((item) => (
                <div key={item.year} className="flex justify-between text-gray-500">
                  <span>{item.year}:</span>
                  <div className="text-right">
                    <span className={item.amount > -1000000 ? 'text-yellow-400' : 'text-red-400'}>
                      ${Math.abs(item.amount / 1000000).toFixed(1)}M
                    </span>
                    {item.note && <span className="text-gray-600 ml-1 text-[10px]">({item.note})</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-yellow-500/10 border-l-4 border-yellow-400 p-2 mt-3 rounded-r-lg">
              <p className="text-xs text-gray-300">
                <strong className="text-yellow-400">2022 Context:</strong> Was near breakeven (-$317K) before platform investment
              </p>
            </div>
          </div>

          {/* Key Input Lever */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 text-sm font-semibold mb-2">KEY INPUT LEVER: REVENUE</h3>
            <div className="text-4xl font-bold text-green-400 mb-1">
              ${(keyInputLever.revenue2025 / 1000000).toFixed(1)}M
            </div>
            <p className="text-gray-400 text-xs mb-3">2025 Revenue (Jul-Dec)</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">2022 (baseline):</span>
                <span className="text-green-400">${(keyInputLever.revenue2022 / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">2023 H1 (pre-pause):</span>
                <span className="text-green-400">${(keyInputLever.revenue2023H1 / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">vs 2023:</span>
                <span className="text-green-400">+{keyInputLever.revenueGrowth}%</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-500">
              {keyInputLever.note}
            </div>
          </div>

          {/* Path to Breakeven */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 text-sm font-semibold mb-2">PATH TO BREAKEVEN (2026)</h3>
            <div className="text-4xl font-bold text-yellow-400 mb-1">
              ${Math.abs(breakeven.gap2026 / 1000000).toFixed(1)}M
            </div>
            <p className="text-gray-400 text-xs mb-3">Gap to Close</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Budget Revenue:</span>
                <span className="text-green-400">${(breakeven.revenue2026Budget / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Budget Expenses:</span>
                <span className="text-red-400">${(breakeven.expenses2026Budget / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Gross Margin:</span>
                <span className="text-purple-400">{breakeven.grossMarginPct}%</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-500">
              Need: ${(breakeven.requiredRevenue / 1000000).toFixed(0)}M revenue at current costs
            </div>
          </div>
        </div>

        {/* Revenue vs Expenses Chart */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
          <h3 className="text-purple-400 mb-4">Monthly Revenue vs Expenses</h3>
          <div className="h-72">
            <Bar
              data={{
                labels: monthlyTrend.labels,
                datasets: [
                  {
                    label: 'Revenue',
                    data: monthlyTrend.revenue,
                    backgroundColor: '#00d26a',
                  },
                  {
                    label: 'Expenses',
                    data: monthlyTrend.expenses,
                    backgroundColor: '#ff6b6b',
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    ticks: { color: '#888' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                  },
                  y: {
                    ticks: {
                      callback: (value) => `$${(Number(value) / 1000000).toFixed(1)}M`,
                      color: '#888',
                    },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                  },
                },
                plugins: {
                  legend: { position: 'bottom', labels: { usePointStyle: true, color: '#888' } },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.dataset.label}: $${(Number(context.raw) / 1000).toFixed(0)}K`,
                    },
                  },
                },
              }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-lg font-bold text-red-400">-${Math.abs(monthlyTrend.netIncome[monthlyTrend.netIncome.length - 1] / 1000000).toFixed(2)}M</div>
              <div className="text-xs text-gray-500">Latest Month Burn</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">{breakeven.grossMarginPct}%</div>
              <div className="text-xs text-gray-500">Q4 Gross Margin</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-400">Improving</div>
              <div className="text-xs text-gray-500">Trend Direction</div>
            </div>
          </div>
        </div>

        {/* Customer & Product Metrics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue by Product */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 mb-4">Revenue by Product (2025-2026)</h3>
            <div className="space-y-3">
              {customerMetrics.activeCustomers.products.map((product, idx) => (
                <div key={idx} className="bg-white/5 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm font-medium">{product.name}</span>
                    <span className="text-green-400 font-mono">${(product.monthlyRevenue / 1000).toFixed(0)}K/mo</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${(product.monthlyRevenue / customerMetrics.activeCustomers.totalMonthlyRevenue) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{product.schools}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-gray-400 text-sm">Total Monthly Revenue:</span>
              <span className="text-green-400 font-bold">${(customerMetrics.activeCustomers.totalMonthlyRevenue / 1000).toFixed(0)}K</span>
            </div>
          </div>

          {/* Unit Economics & Business Model */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 mb-4">Unit Economics & Model Evolution</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-green-500/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-400">{customerMetrics.activeCustomers.count}</div>
                <div className="text-xs text-gray-500">Active Products</div>
              </div>
              <div className="bg-purple-500/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-400">{(customerMetrics.unitEconomics.burnCoverageRatio * 100).toFixed(0)}%</div>
                <div className="text-xs text-gray-500">Burn Coverage</div>
              </div>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly Revenue:</span>
                <span className="text-green-400">${(customerMetrics.unitEconomics.currentMonthlyRevenue / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly Burn:</span>
                <span className="text-red-400">${(customerMetrics.unitEconomics.currentMonthlyBurn / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Gap to Breakeven:</span>
                <span className="text-yellow-400">${((customerMetrics.unitEconomics.currentMonthlyBurn - customerMetrics.unitEconomics.currentMonthlyRevenue) / 1000).toFixed(0)}K/mo</span>
              </div>
            </div>
            <div className="bg-purple-500/10 border-l-4 border-purple-400 p-3 rounded-r-lg">
              <p className="text-xs text-gray-300">
                <strong className="text-purple-400">Model Shift:</strong> Pivoted from tech services (2022-23) to pure 2HR platform licensing (2025+). All revenue now from school curriculum licenses.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Expense Breakdown */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 mb-4">Expense Breakdown (2025)</h3>
            <div className="h-64">
              <Doughnut
                data={{
                  labels: financialData.expenseBreakdown.labels,
                  datasets: [{
                    data: financialData.expenseBreakdown.data,
                    backgroundColor: financialData.expenseBreakdown.colors,
                    borderWidth: 0,
                  }],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '60%',
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: { padding: 10, usePointStyle: true, color: '#888', font: { size: 11 } },
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const value = context.raw as number;
                          const pct = financialData.expenseBreakdown.percentages[context.dataIndex];
                          return `${context.label}: $${(value / 1000000).toFixed(1)}M (${pct}%)`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="bg-purple-500/10 border-l-4 border-purple-400 p-3 mt-4 rounded-r-lg">
              <p className="text-sm text-gray-300">
                <strong className="text-purple-400">Key Insight:</strong> NHC OPEX (74.5%) dominates - likely software/infrastructure costs for tech products.
              </p>
            </div>
          </div>

          {/* 2026 Projection */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 mb-4">2026 Scenario Analysis</h3>
            <div className="space-y-4">
              {breakevenData.scenarios.map((scenario, idx) => (
                <div key={idx} className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 font-semibold">{scenario.name}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      scenario.status === 'profit' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {scenario.status === 'profit' ? 'PROFIT' : 'LOSS'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Revenue:</span>
                      <span className="text-green-400 ml-1">${(scenario.revenue / 1000000).toFixed(1)}M</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Expenses:</span>
                      <span className="text-red-400 ml-1">${(scenario.expenses / 1000000).toFixed(1)}M</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Net:</span>
                      <span className={`ml-1 ${scenario.net >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${(scenario.net / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-sm text-gray-400">
              <strong>Note:</strong> Budget is conservative (assumes no enrollment growth). Current run rate: $857K/mo revenue.
            </div>
          </div>
        </div>

        {/* Status Reasons */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-purple-400 mb-4">Why YELLOW Status?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {status.reasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2" />
                <span className="text-gray-300 text-sm">{reason}</span>
              </div>
            ))}
          </div>
          <div className="bg-green-500/10 border-l-4 border-green-400 p-3 mt-4 rounded-r-lg">
            <p className="text-sm text-gray-300">
              <strong className="text-green-400">Bullish Signal:</strong> Academics is the &quot;picks and shovels&quot; play - revenue comes from schools using the technology regardless of which school model succeeds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
