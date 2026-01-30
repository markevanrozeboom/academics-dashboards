'use client';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { grossMarginData, breakevenData } from '@/data/dashboardData';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement, Filler);

export default function GrossMarginDashboard() {
  const { summary, quarterlyMargin, monthlyMargin, cogsBreakdown, benchmarks } = grossMarginData;

  return (
    <div className="p-5 min-h-screen" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-1" style={{ background: 'linear-gradient(90deg, #a855f7, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Gross Margin Dashboard
        </h1>
        <p className="text-gray-400 text-sm">Revenue - COGS = Gross Profit Analysis</p>
        <p className="text-gray-500 text-xs mt-1">Formula: gross_margin_pct = (revenue - COGS) / revenue × 100</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <SummaryCard
            label="Revenue"
            value={`$${(summary.revenue / 1000000).toFixed(1)}M`}
            color="green"
            icon="↑"
          />
          <SummaryCard
            label="COGS"
            value={`$${(summary.cogs / 1000000).toFixed(1)}M`}
            color="red"
            icon="↓"
          />
          <SummaryCard
            label="Gross Profit"
            value={`$${(summary.grossProfit / 1000000).toFixed(1)}M`}
            color="blue"
            icon="="
          />
          <SummaryCard
            label="Gross Margin"
            value={`${summary.marginPct}%`}
            color="purple"
            icon="★"
          />
        </div>

        {/* Gross Margin Gauge */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
          <h3 className="text-purple-400 mb-4 text-center">Gross Margin Performance</h3>
          <div className="flex justify-center mb-4">
            <div className="relative w-48 h-48">
              <Doughnut
                data={{
                  labels: ['Current Margin', 'Room to Target'],
                  datasets: [{
                    data: [summary.marginPct, 100 - summary.marginPct],
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
                  <div className="text-4xl font-bold text-purple-400">{summary.marginPct}%</div>
                  <div className="text-xs text-gray-500">Gross Margin</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center mt-4">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-sm text-gray-500">Current</div>
              <div className="text-xl font-bold text-purple-400">{benchmarks.current}%</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-sm text-gray-500">Target</div>
              <div className="text-xl font-bold text-yellow-400">{benchmarks.target}%</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-sm text-gray-500">Industry Avg</div>
              <div className="text-xl font-bold text-green-400">{benchmarks.industryAvg}%</div>
            </div>
          </div>
          <div className="bg-yellow-500/10 border-l-4 border-yellow-400 p-3 mt-4 rounded-r-lg">
            <p className="text-sm text-gray-300">
              <strong className="text-yellow-400">Gap to Target:</strong> {Math.abs(benchmarks.gap).toFixed(1)} percentage points below target.
              SaaS industry typically achieves 65-80% gross margins.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Quarterly Margin Trend */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 mb-4">Quarterly Gross Margin Trend</h3>
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
                <div key={idx} className="bg-white/5 rounded-lg p-2">
                  <div className="text-xs text-gray-500">{q.quarter}</div>
                  <div className="text-sm font-bold text-purple-400">{q.margin}%</div>
                  <div className="text-xs text-gray-600">${(q.grossProfit / 1000).toFixed(0)}K GP</div>
                </div>
              ))}
            </div>
          </div>

          {/* COGS Breakdown */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 mb-4">COGS Breakdown (Estimated)</h3>
            <div className="h-64">
              <Doughnut
                data={{
                  labels: cogsBreakdown.labels,
                  datasets: [{
                    data: cogsBreakdown.data,
                    backgroundColor: cogsBreakdown.colors,
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
                          const total = cogsBreakdown.data.reduce((a, b) => a + b, 0);
                          const pct = ((value / total) * 100).toFixed(1);
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
                <strong className="text-purple-400">Note:</strong> COGS primarily CF COGS (infrastructure/hosting).
                Opportunity to optimize cloud costs.
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
                    min: 45,
                    max: 60,
                    ticks: {
                      callback: (value) => `${value}%`,
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
          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <div>
              <div className="text-gray-500 text-xs">Average Margin</div>
              <div className="text-xl font-bold text-purple-400">
                {(monthlyMargin.marginPct.reduce((a, b) => a + b, 0) / monthlyMargin.marginPct.length).toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-xs">Best Month</div>
              <div className="text-xl font-bold text-green-400">
                {Math.max(...monthlyMargin.marginPct).toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-xs">Worst Month</div>
              <div className="text-xl font-bold text-yellow-400">
                {Math.min(...monthlyMargin.marginPct).toFixed(1)}%
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
                  <span className="text-gray-400">Current Margin:</span>
                  <span className="text-purple-400 font-bold">{summary.marginPct}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">2026 Gap:</span>
                  <span className="text-red-400 font-bold">${(breakevenData.analysis.currentGap / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Revenue Needed:</span>
                  <span className="text-green-400 font-bold">${(breakevenData.analysis.requiredRevenue / 1000000).toFixed(0)}M</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-gray-300 font-semibold">Improvement Scenarios</h4>
              <div className="space-y-3">
                <div className="bg-green-500/10 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Target 60% Margin</span>
                    <span className="text-green-400 font-bold">$64M needed</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Lower revenue required with better margin</div>
                </div>
                <div className="bg-yellow-500/10 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Reduce COGS 20%</span>
                    <span className="text-yellow-400 font-bold">56% Margin</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Cloud optimization opportunity</div>
                </div>
                <div className="bg-purple-500/10 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Current Path</span>
                    <span className="text-purple-400 font-bold">$77M needed</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">With existing 52% margin</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-green-500/10 border-l-4 border-green-400 p-3 mt-6 rounded-r-lg">
            <p className="text-sm text-gray-300">
              <strong className="text-green-400">Strategic Insight:</strong> Improving gross margin to 60% (SaaS benchmark) would reduce breakeven revenue by $13M.
              Focus on COGS optimization alongside revenue growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color, icon }: { label: string; value: string; color: string; icon: string }) {
  const colors = {
    green: 'from-green-500/20 to-green-600/10 border-green-500/30',
    red: 'from-red-500/20 to-red-600/10 border-red-500/30',
    blue: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
  };

  const textColors = {
    green: 'text-green-400',
    red: 'text-red-400',
    blue: 'text-cyan-400',
    purple: 'text-purple-400',
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color as keyof typeof colors]} rounded-xl p-4 border`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm">{label}</span>
        <span className={`text-xl ${textColors[color as keyof typeof textColors]}`}>{icon}</span>
      </div>
      <div className={`text-2xl font-bold ${textColors[color as keyof typeof textColors]}`}>
        {value}
      </div>
    </div>
  );
}
