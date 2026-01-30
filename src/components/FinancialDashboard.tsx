'use client';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { financialData } from '@/data/dashboardData';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement, Filler);

export default function FinancialDashboard() {
  const { kpis, revenueByType, expenseBreakdown, monthlyPL, budgetVsActual, yoyComparison } = financialData;

  return (
    <div className="p-5 min-h-screen" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-1" style={{ background: 'linear-gradient(90deg, #a855f7, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Financial Dashboard
        </h1>
        <p className="text-gray-400 text-sm">Revenue, Expenses & P&L Analysis</p>
        <p className="text-gray-500 text-xs mt-1">Source: core_budgets.consolidated_budgets_and_actuals | Filter: business_unit = &apos;Academics&apos;</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <KPICard label="2025 Revenue" value={`$${(kpis.revenue2025 / 1000000).toFixed(1)}M`} subtext="Total YTD" color="green" />
          <KPICard label="2025 Expenses" value={`$${(kpis.expenses2025 / 1000000).toFixed(1)}M`} subtext="Total YTD" color="red" />
          <KPICard label="Net Income" value={`$${(kpis.netIncome2025 / 1000000).toFixed(1)}M`} subtext="Loss" color="red" />
          <KPICard label="COGS" value={`$${(kpis.cogsTotal / 1000000).toFixed(1)}M`} subtext="Cost of Goods" color="purple" />
          <KPICard label="Gross Profit" value={`$${(kpis.grossProfit / 1000000).toFixed(1)}M`} subtext="Rev - COGS" color="blue" />
          <KPICard label="Gross Margin" value={`${kpis.grossMarginPct}%`} subtext="Strong margin" color="green" />
        </div>

        {/* Monthly P&L Chart */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
          <h3 className="text-purple-400 mb-4">Monthly P&L Trend (2025)</h3>
          <div className="h-72">
            <Line
              data={{
                labels: monthlyPL.map(m => m.month.replace(' 2025', '')),
                datasets: [
                  {
                    label: 'Revenue',
                    data: monthlyPL.map(m => m.revenue),
                    borderColor: '#00d26a',
                    backgroundColor: 'rgba(0, 210, 106, 0.1)',
                    fill: true,
                    tension: 0.4,
                  },
                  {
                    label: 'Expenses',
                    data: monthlyPL.map(m => m.expenses),
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    fill: true,
                    tension: 0.4,
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
          <div className="bg-purple-500/10 border-l-4 border-purple-400 p-3 mt-4 rounded-r-lg">
            <p className="text-sm text-gray-300">
              <strong className="text-purple-400">Trend Analysis:</strong> Revenue growing steadily while expenses remain volatile.
              Nov 2025 was best month with only $810K loss.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue by Type */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 mb-4">Revenue by Type (2025)</h3>
            <div className="h-64">
              <Doughnut
                data={{
                  labels: revenueByType.labels,
                  datasets: [{
                    data: revenueByType.data,
                    backgroundColor: revenueByType.colors,
                    borderWidth: 0,
                  }],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '60%',
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { padding: 15, usePointStyle: true, color: '#888' },
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const value = context.raw as number;
                          const total = revenueByType.data.reduce((a, b) => a + b, 0);
                          const pct = ((value / total) * 100).toFixed(1);
                          return `${context.label}: $${(value / 1000000).toFixed(1)}M (${pct}%)`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="bg-yellow-500/10 border-l-4 border-yellow-400 p-3 mt-4 rounded-r-lg">
              <p className="text-sm text-gray-300">
                <strong className="text-yellow-400">Data Note:</strong> Most revenue classified as &quot;Non Recurring&quot; - may need reclassification for subscription products.
              </p>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 mb-4">Expense Breakdown (2025)</h3>
            <div className="h-64">
              <Doughnut
                data={{
                  labels: expenseBreakdown.labels,
                  datasets: [{
                    data: expenseBreakdown.data,
                    backgroundColor: expenseBreakdown.colors,
                    borderWidth: 0,
                  }],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '60%',
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { padding: 15, usePointStyle: true, color: '#888' },
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const value = context.raw as number;
                          const pct = expenseBreakdown.percentages[context.dataIndex];
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
                <strong className="text-purple-400">Key Insight:</strong> NHC OPEX (74.5%) dominates - software/infrastructure costs for tech products.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Budget vs Actual */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 mb-4">Budget vs Actual (2025 YTD)</h3>
            <div className="h-64">
              <Bar
                data={{
                  labels: budgetVsActual.categories.map(c => c.name),
                  datasets: [
                    {
                      label: 'Actual',
                      data: budgetVsActual.categories.map(c => c.actual),
                      backgroundColor: '#a855f7',
                    },
                    {
                      label: 'Budget',
                      data: budgetVsActual.categories.map(c => c.budget),
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  indexAxis: 'y',
                  scales: {
                    x: {
                      ticks: {
                        callback: (value) => `$${(Number(value) / 1000000).toFixed(0)}M`,
                        color: '#888',
                      },
                      grid: { color: 'rgba(255,255,255,0.1)' },
                    },
                    y: {
                      ticks: { color: '#888' },
                      grid: { color: 'rgba(255,255,255,0.1)' },
                    },
                  },
                  plugins: {
                    legend: { position: 'bottom', labels: { usePointStyle: true, color: '#888' } },
                  },
                }}
              />
            </div>
            <div className="mt-4 space-y-2">
              {budgetVsActual.categories.map((cat, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-400">{cat.name}:</span>
                  <span className={cat.variance < 0 ? 'text-green-400' : 'text-red-400'}>
                    {cat.variance}% vs budget
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* YoY Comparison */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 mb-4">Year-over-Year Comparison</h3>
            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 font-semibold">Revenue</span>
                  <span className="text-green-400 font-bold">+{yoyComparison.revenue.growth}%</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">2024:</span>
                    <span className="text-gray-300 ml-2">${(yoyComparison.revenue.y2024 / 1000000).toFixed(1)}M</span>
                  </div>
                  <div>
                    <span className="text-gray-500">2025:</span>
                    <span className="text-green-400 ml-2">${(yoyComparison.revenue.y2025 / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 font-semibold">Expenses</span>
                  <span className="text-red-400 font-bold">+{yoyComparison.expenses.growth}%</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">2024:</span>
                    <span className="text-gray-300 ml-2">${(yoyComparison.expenses.y2024 / 1000000).toFixed(1)}M</span>
                  </div>
                  <div>
                    <span className="text-gray-500">2025:</span>
                    <span className="text-red-400 ml-2">${(yoyComparison.expenses.y2025 / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 font-semibold">Gross Margin</span>
                  <span className="text-green-400 font-bold">+{yoyComparison.margin.improvement}pts</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">2024:</span>
                    <span className="text-gray-300 ml-2">{yoyComparison.margin.y2024}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">2025:</span>
                    <span className="text-green-400 ml-2">{yoyComparison.margin.y2025}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-green-500/10 border-l-4 border-green-400 p-3 mt-4 rounded-r-lg">
              <p className="text-sm text-gray-300">
                <strong className="text-green-400">Positive Signal:</strong> Revenue growing faster than expenses, margin improving.
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Detail Table */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-purple-400 mb-4">Monthly P&L Detail (2025)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-3 text-purple-400 font-semibold">Month</th>
                  <th className="text-right p-3 text-purple-400 font-semibold">Revenue</th>
                  <th className="text-right p-3 text-purple-400 font-semibold">Expenses</th>
                  <th className="text-right p-3 text-purple-400 font-semibold">Net Income</th>
                </tr>
              </thead>
              <tbody>
                {monthlyPL.map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-3 text-gray-300">{row.month}</td>
                    <td className="p-3 text-right font-mono text-green-400">${(row.revenue / 1000).toFixed(0)}K</td>
                    <td className="p-3 text-right font-mono text-red-400">${(row.expenses / 1000000).toFixed(1)}M</td>
                    <td className={`p-3 text-right font-mono font-bold ${row.net >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${(row.net / 1000000).toFixed(2)}M
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, subtext, color }: { label: string; value: string; subtext: string; color: string }) {
  const colors = {
    green: 'bg-green-500/10 text-green-400',
    blue: 'bg-cyan-500/10 text-cyan-400',
    yellow: 'bg-yellow-500/10 text-yellow-400',
    red: 'bg-red-500/10 text-red-400',
    purple: 'bg-purple-500/10 text-purple-400',
  };

  return (
    <div className={`rounded-xl p-4 text-center ${colors[color as keyof typeof colors]}`}>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
      <div className="text-xs text-gray-500 mt-1">{subtext}</div>
    </div>
  );
}
