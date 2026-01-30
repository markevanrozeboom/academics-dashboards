'use client';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { grossMarginData, breakevenData } from '@/data/dashboardData';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement, Filler);

export default function GrossMarginDashboard() {
  const { summary, quarterlyMargin, monthlyMargin, cogsBreakdown, benchmarks } = grossMarginData;

  // Filter to only months with revenue (Jul-Dec)
  const monthsWithRevenue = monthlyMargin.marginPct.filter(m => m > 0);
  const avgMarginWithRevenue = monthsWithRevenue.length > 0
    ? monthsWithRevenue.reduce((a, b) => a + b, 0) / monthsWithRevenue.length
    : 0;

  return (
    <div className="p-5 min-h-screen" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-1" style={{ background: 'linear-gradient(90deg, #a855f7, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Gross Margin Dashboard
        </h1>
        <p className="text-gray-400 text-sm">Revenue - COGS = Gross Profit Analysis</p>
        <p className="text-gray-500 text-xs mt-1">Note: Revenue started July 2025. Full-year margin reflects 6 months of $0 revenue.</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Alert Banner */}
        <div className="bg-blue-500/10 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
          <p className="text-sm text-gray-300">
            <strong className="text-blue-400">Key Context:</strong> Academics began generating revenue in July 2025.
            Q3-Q4 gross margin of <strong className="text-green-400">59-64%</strong> is strong and approaching SaaS benchmarks.
            Full-year margin of {summary.marginPct}% reflects 6 months of pre-revenue infrastructure costs.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <SummaryCard
            label="2025 Revenue"
            value={`$${(summary.revenue / 1000000).toFixed(1)}M`}
            subtext="Jul-Dec only"
            color="green"
          />
          <SummaryCard
            label="CF COGS"
            value={`$${(summary.cogs / 1000000).toFixed(1)}M`}
            subtext="Infrastructure"
            color="red"
          />
          <SummaryCard
            label="Gross Profit"
            value={`$${(summary.grossProfit / 1000000).toFixed(1)}M`}
            subtext="Rev - COGS"
            color="blue"
          />
          <SummaryCard
            label="Full Year GM"
            value={`${summary.marginPct}%`}
            subtext="Includes pre-rev"
            color="yellow"
          />
          <SummaryCard
            label="Q4 Margin"
            value={`${benchmarks.q4Actual}%`}
            subtext="When revenue flowing"
            color="purple"
          />
        </div>

        {/* Gross Margin Gauge - Show Q4 as the meaningful metric */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
          <h3 className="text-purple-400 mb-4 text-center">Gross Margin Performance (Q4 2025 - Revenue Period)</h3>
          <div className="flex justify-center mb-4">
            <div className="relative w-48 h-48">
              <Doughnut
                data={{
                  labels: ['Q4 Margin', 'Room to Target'],
                  datasets: [{
                    data: [benchmarks.q4Actual, 100 - benchmarks.q4Actual],
                    backgroundColor: ['#a855f7', 'rgba(255,255,255,0.1)'],
                    borderWidth: 0,
                  }],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  cutout: '75%',
                  plugins: { legend: { display: false }, tooltip: { enabled: false } },
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400">{benchmarks.q4Actual}%</div>
                  <div className="text-xs text-gray-500">Q4 Gross Margin</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 text-center mt-4">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-sm text-gray-500">Full Year</div>
              <div className="text-xl font-bold text-yellow-400">{benchmarks.current}%</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-sm text-gray-500">Q4 Actual</div>
              <div className="text-xl font-bold text-green-400">{benchmarks.q4Actual}%</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-sm text-gray-500">Target</div>
              <div className="text-xl font-bold text-purple-400">{benchmarks.target}%</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-sm text-gray-500">Industry Avg</div>
              <div className="text-xl font-bold text-cyan-400">{benchmarks.industryAvg}%</div>
            </div>
          </div>
          <div className="bg-green-500/10 border-l-4 border-green-400 p-3 mt-4 rounded-r-lg">
            <p className="text-sm text-gray-300">
              <strong className="text-green-400">Positive Signal:</strong> Q4 margin of {benchmarks.q4Actual}% is within striking distance of {benchmarks.industryAvg}% industry average.
              As revenue scales and pre-revenue COGS amortizes, full-year margin should converge to Q4 levels.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Quarterly Margin Trend */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 mb-4">Quarterly Revenue vs COGS (2025)</h3>
            <div className="h-64">
              <Bar
                data={{
                  labels: quarterlyMargin.map(q => q.quarter),
                  datasets: [
                    {
                      label: 'Revenue',
                      data: quarterlyMargin.map(q => q.revenue),
                      backgroundColor: '#00d26a',
                      yAxisID: 'y',
                    },
                    {
                      label: 'COGS',
                      data: quarterlyMargin.map(q => q.cogs),
                      backgroundColor: '#ff6b6b',
                      yAxisID: 'y',
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
                  },
                }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4 text-center">
              {quarterlyMargin.map((q, idx) => (
                <div key={idx} className={`rounded-lg p-2 ${q.revenue > 0 ? 'bg-green-500/10' : 'bg-white/5'}`}>
                  <div className="text-xs text-gray-500">{q.quarter}</div>
                  <div className={`text-sm font-bold ${q.margin > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                    {q.margin > 0 ? `${q.margin}%` : 'No Rev'}
                  </div>
                  <div className="text-xs text-gray-600">
                    {q.grossProfit >= 0 ? `$${(q.grossProfit / 1000).toFixed(0)}K GP` : `$(${Math.abs(q.grossProfit / 1000).toFixed(0)}K)`}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-yellow-500/10 border-l-4 border-yellow-400 p-3 mt-4 rounded-r-lg">
              <p className="text-sm text-gray-300">
                <strong className="text-yellow-400">Note:</strong> Q1-Q2 had COGS but no revenue (infrastructure buildout).
                Q3-Q4 show healthy margins as revenue came online.
              </p>
            </div>
          </div>

          {/* COGS Breakdown */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 mb-4">COGS Structure</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-purple-400 mb-4">
                  ${(cogsBreakdown.data[0] / 1000000).toFixed(1)}M
                </div>
                <div className="text-gray-400 text-lg">CF COGS (100%)</div>
                <div className="text-gray-500 text-sm mt-2">Central Factory / Infrastructure</div>
              </div>
            </div>
            <div className="bg-purple-500/10 border-l-4 border-purple-400 p-3 mt-4 rounded-r-lg">
              <p className="text-sm text-gray-300">
                <strong className="text-purple-400">Structure:</strong> All COGS is CF COGS (Central Factory) -
                shared infrastructure costs. No direct HC or NHC COGS for this business unit.
                This is typical for SaaS/software businesses.
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Margin Trend */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
          <h3 className="text-purple-400 mb-4">Monthly Gross Margin Trend (2025)</h3>
          <div className="h-64">
            <Line
              data={{
                labels: monthlyMargin.labels,
                datasets: [
                  {
                    label: 'Gross Margin %',
                    data: monthlyMargin.marginPct,
                    borderColor: '#a855f7',
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y1',
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
                  y1: {
                    type: 'linear',
                    position: 'left',
                    min: 0,
                    max: 80,
                    ticks: {
                      callback: (value) => `${value}%`,
                      color: '#888',
                    },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                  },
                },
                plugins: {
                  legend: { position: 'bottom', labels: { usePointStyle: true, color: '#888' } },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const value = context.raw as number;
                        return value === 0 ? 'No revenue this month' : `Gross Margin: ${value}%`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4 text-center">
            <div>
              <div className="text-gray-500 text-xs">Avg (Jul-Dec)</div>
              <div className="text-xl font-bold text-purple-400">
                {avgMarginWithRevenue.toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-xs">Best Month</div>
              <div className="text-xl font-bold text-green-400">
                {Math.max(...monthlyMargin.marginPct).toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-xs">Dec 2025</div>
              <div className="text-xl font-bold text-cyan-400">
                {monthlyMargin.marginPct[11].toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-xs">Months w/ Rev</div>
              <div className="text-xl font-bold text-yellow-400">
                {monthsWithRevenue.length}/12
              </div>
            </div>
          </div>
        </div>

        {/* Path to Breakeven via Margin */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-purple-400 mb-4">Path to Breakeven: Margin Levers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-gray-300 font-semibold">Current State</h4>
              <div className="bg-white/5 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Q4 Margin:</span>
                  <span className="text-green-400 font-bold">{benchmarks.q4Actual}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">FY26 Gap:</span>
                  <span className="text-red-400 font-bold">${(Math.abs(breakevenData.analysis.currentGap) / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">2026 Budget Revenue:</span>
                  <span className="text-green-400 font-bold">${(breakevenData.analysis.budgetRevenue2026 / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Growth Required:</span>
                  <span className="text-yellow-400 font-bold">8.7x</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-gray-300 font-semibold">2026 Scenarios</h4>
              <div className="space-y-3">
                {breakevenData.scenarios.map((scenario, idx) => (
                  <div key={idx} className={`rounded-lg p-3 ${scenario.status === 'profit' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{scenario.name}</span>
                      <span className={`font-bold ${scenario.status === 'profit' ? 'text-green-400' : 'text-red-400'}`}>
                        ${(scenario.net / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Rev: ${(scenario.revenue / 1000000).toFixed(1)}M | Exp: ${(scenario.expenses / 1000000).toFixed(1)}M
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-green-500/10 border-l-4 border-green-400 p-3 mt-6 rounded-r-lg">
            <p className="text-sm text-gray-300">
              <strong className="text-green-400">Strategic Insight:</strong> With Q4 gross margin already at {benchmarks.q4Actual}%,
              the path to profitability depends primarily on scaling revenue. The budget assumes $40.4M revenue (8.7x current)
              which would achieve profitability even with similar cost structure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, subtext, color }: { label: string; value: string; subtext: string; color: string }) {
  const colors = {
    green: 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-400',
    red: 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-400',
    blue: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
    yellow: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400',
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color as keyof typeof colors]} rounded-xl p-4 border`}>
      <div className="text-gray-400 text-xs mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-gray-500 text-xs mt-1">{subtext}</div>
    </div>
  );
}
