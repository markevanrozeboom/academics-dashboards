'use client';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { historicalData, grossMarginData } from '@/data/dashboardData';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement, Filler);

export default function HistoricalDashboard() {
  const { yearlySummary, monthlyDetail, milestones, cumulativeInvestment, revenueSources, majorCostCenters } = historicalData;

  // Prepare yearly data for charts
  const years = yearlySummary.map(y => y.year.toString());
  const revenues = yearlySummary.map(y => y.revenue);
  const expenses = yearlySummary.map(y => y.cogs + y.expenses);
  const netIncomes = yearlySummary.map(y => y.netIncome);
  const cumulatives = cumulativeInvestment.byYear.map(y => y.cumulative);

  // Prepare monthly data for the detailed chart (last 24 months)
  const recentMonths = monthlyDetail.slice(-24);
  const monthLabels = recentMonths.map(m => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[m.month - 1]} ${m.year.toString().slice(-2)}`;
  });

  return (
    <div className="p-5 min-h-screen" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-1" style={{ background: 'linear-gradient(90deg, #a855f7, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Historical Analysis (2022-2026)
        </h1>
        <p className="text-gray-400 text-sm">Complete Financial Timeline from Klair</p>
        <p className="text-gray-500 text-xs mt-1">Source: core_budgets.consolidated_budgets_and_actuals | 49 months of data</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Key Story Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StoryCard
            year="2022"
            phase="Tech Services"
            revenue="$4.8M"
            loss="-$317K"
            highlight="Near Breakeven"
            color="green"
          />
          <StoryCard
            year="2023"
            phase="Investment Ramp"
            revenue="$4.0M → $0"
            loss="-$12.5M"
            highlight="H2: Costs 3x"
            color="yellow"
          />
          <StoryCard
            year="2024"
            phase="Platform Build"
            revenue="$0"
            loss="-$31.3M"
            highlight="Full Investment"
            color="red"
          />
          <StoryCard
            year="2025"
            phase="Revenue Launch"
            revenue="$4.6M (H2)"
            loss="-$37.3M"
            highlight="Revenue Returns!"
            color="purple"
          />
        </div>

        {/* Cumulative Investment Chart */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
          <h3 className="text-purple-400 mb-4">Cumulative Investment Over Time</h3>
          <div className="h-72">
            <Line
              data={{
                labels: years,
                datasets: [
                  {
                    label: 'Cumulative Investment',
                    data: cumulatives,
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.2)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 8,
                    pointBackgroundColor: years.map((_, i) =>
                      i === 0 ? '#00d26a' : '#ff6b6b'
                    ),
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
                      callback: (value) => `$${(Math.abs(Number(value)) / 1000000).toFixed(0)}M`,
                      color: '#888',
                    },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    reverse: true,
                  },
                },
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (context) => `Total Investment: $${(Math.abs(Number(context.raw)) / 1000000).toFixed(1)}M`,
                    },
                  },
                },
              }}
            />
          </div>
          <div className="grid grid-cols-5 gap-2 mt-4 text-center text-xs">
            {cumulativeInvestment.byYear.map((item, idx) => (
              <div key={idx} className={`p-2 rounded ${idx === 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                <div className="font-bold">{item.year}</div>
                <div>${(Math.abs(item.cumulative) / 1000000).toFixed(1)}M</div>
              </div>
            ))}
          </div>
        </div>

        {/* Year-over-Year Revenue vs Expenses */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
          <h3 className="text-purple-400 mb-4">Annual Revenue vs Expenses (2022-2025)</h3>
          <div className="h-72">
            <Bar
              data={{
                labels: years.slice(0, 4), // Exclude partial 2026
                datasets: [
                  {
                    label: 'Revenue',
                    data: revenues.slice(0, 4),
                    backgroundColor: '#00d26a',
                    borderRadius: 4,
                  },
                  {
                    label: 'Expenses',
                    data: expenses.slice(0, 4),
                    backgroundColor: '#ff6b6b',
                    borderRadius: 4,
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
                      callback: (value) => `$${(Number(value) / 1000000).toFixed(0)}M`,
                      color: '#888',
                    },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                  },
                },
                plugins: {
                  legend: { position: 'bottom', labels: { usePointStyle: true, color: '#888' } },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.dataset.label}: $${(Number(context.raw) / 1000000).toFixed(1)}M`,
                    },
                  },
                },
              }}
            />
          </div>
          <div className="bg-purple-500/10 border-l-4 border-purple-400 p-3 mt-4 rounded-r-lg">
            <p className="text-sm text-gray-300">
              <strong className="text-purple-400">The Story:</strong> 2022 was near breakeven ($4.8M revenue, $5.2M costs).
              Investment ramped in H2 2023, peaked in 2024 with $0 revenue, and revenue returned in H2 2025 with the new platform.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Detail (Last 24 Months) */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 mb-4">Monthly Revenue Trend (2024-2026)</h3>
            <div className="h-64">
              <Line
                data={{
                  labels: monthLabels,
                  datasets: [
                    {
                      label: 'Revenue',
                      data: recentMonths.map(m => m.revenue),
                      borderColor: '#00d26a',
                      backgroundColor: 'rgba(0, 210, 106, 0.1)',
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
                      ticks: {
                        color: '#888',
                        maxRotation: 45,
                        minRotation: 45,
                        font: { size: 9 },
                      },
                      grid: { color: 'rgba(255,255,255,0.1)' },
                    },
                    y: {
                      ticks: {
                        callback: (value) => `$${(Number(value) / 1000).toFixed(0)}K`,
                        color: '#888',
                      },
                      grid: { color: 'rgba(255,255,255,0.1)' },
                    },
                  },
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (context) => `Revenue: $${(Number(context.raw) / 1000).toFixed(0)}K`,
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="bg-green-500/10 border-l-4 border-green-400 p-3 mt-4 rounded-r-lg">
              <p className="text-sm text-gray-300">
                <strong className="text-green-400">Revenue Launch:</strong> After 18 months of $0 revenue (platform build),
                revenue resumed in July 2025 at $717K/month and grew to $857K by Jan 2026.
              </p>
            </div>
          </div>

          {/* Historical Gross Margin */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 mb-4">Gross Margin by Year</h3>
            <div className="h-64">
              <Bar
                data={{
                  labels: grossMarginData.historicalMargin.map(h => h.year.toString()),
                  datasets: [
                    {
                      label: 'Gross Margin %',
                      data: grossMarginData.historicalMargin.map(h => h.margin),
                      backgroundColor: grossMarginData.historicalMargin.map(h =>
                        h.margin > 60 ? '#00d26a' : h.margin > 0 ? '#feca57' : '#ff6b6b'
                      ),
                      borderRadius: 4,
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
                      max: 100,
                      ticks: {
                        callback: (value) => `${value}%`,
                        color: '#888',
                      },
                      grid: { color: 'rgba(255,255,255,0.1)' },
                    },
                  },
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (context) => `Gross Margin: ${context.raw}%`,
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="bg-yellow-500/10 border-l-4 border-yellow-400 p-3 mt-4 rounded-r-lg">
              <p className="text-sm text-gray-300">
                <strong className="text-yellow-400">Margin Evolution:</strong> 2022-2023 had 87-97% margins (low COGS).
                2025 shows 11% full-year but 63.8% in Q4 when revenue was flowing.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Sources */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 mb-4">Revenue Sources (Cumulative)</h3>
            <div className="h-64">
              <Doughnut
                data={{
                  labels: revenueSources.map(s => s.name),
                  datasets: [{
                    data: revenueSources.map(s => s.amount),
                    backgroundColor: ['#00d26a', '#4facfe', '#f093fb', '#feca57', '#00f2fe'],
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
                      labels: { padding: 10, usePointStyle: true, color: '#888', font: { size: 10 } },
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const value = context.raw as number;
                          return `${context.label}: $${(value / 1000000).toFixed(1)}M`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="text-center mt-4">
              <span className="text-2xl font-bold text-green-400">
                ${(revenueSources.reduce((a, b) => a + b.amount, 0) / 1000000).toFixed(1)}M
              </span>
              <span className="text-gray-400 text-sm ml-2">Total Revenue (All Time)</span>
            </div>
          </div>

          {/* Major Cost Centers */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-purple-400 mb-4">Top Cost Centers (Cumulative)</h3>
            <div className="space-y-3">
              {majorCostCenters.map((cost, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-300 text-sm">{cost.name}</span>
                      <span className="text-red-400 font-mono text-sm">
                        ${(cost.amount / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-red-500 h-2 rounded-full"
                        style={{ width: `${(cost.amount / majorCostCenters[0].amount) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{cost.department} - {cost.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4 pt-4 border-t border-white/10">
              <span className="text-2xl font-bold text-red-400">
                ${(majorCostCenters.reduce((a, b) => a + b.amount, 0) / 1000000).toFixed(1)}M
              </span>
              <span className="text-gray-400 text-sm ml-2">Top 7 Vendors (All Time)</span>
            </div>
          </div>
        </div>

        {/* Timeline/Milestones */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-purple-400 mb-4">Key Milestones</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-500/30" />
            <div className="space-y-4">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex items-start gap-4 relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                    milestone.type === 'positive' ? 'bg-green-500/20 text-green-400' :
                    milestone.type === 'investment' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {milestone.type === 'positive' ? '✓' :
                     milestone.type === 'investment' ? '$' : 'i'}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="text-xs text-gray-500">{milestone.date}</div>
                    <div className="text-gray-300">{milestone.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryCard({ year, phase, revenue, loss, highlight, color }: {
  year: string;
  phase: string;
  revenue: string;
  loss: string;
  highlight: string;
  color: 'green' | 'yellow' | 'red' | 'purple';
}) {
  const colors = {
    green: 'bg-green-500/10 border-green-500/30',
    yellow: 'bg-yellow-500/10 border-yellow-500/30',
    red: 'bg-red-500/10 border-red-500/30',
    purple: 'bg-purple-500/10 border-purple-500/30',
  };

  const textColors = {
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    red: 'text-red-400',
    purple: 'text-purple-400',
  };

  return (
    <div className={`rounded-xl p-4 border ${colors[color]}`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`text-2xl font-bold ${textColors[color]}`}>{year}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${colors[color]} ${textColors[color]}`}>
          {phase}
        </span>
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Revenue:</span>
          <span className="text-green-400">{revenue}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Net:</span>
          <span className="text-red-400">{loss}</span>
        </div>
      </div>
      <div className={`mt-2 pt-2 border-t border-white/10 text-xs ${textColors[color]} font-medium`}>
        {highlight}
      </div>
    </div>
  );
}
