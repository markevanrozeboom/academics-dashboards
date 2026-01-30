'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const JoeChartDashboard = dynamic(() => import('@/components/JoeChartDashboard'), { ssr: false });
const FinancialDashboard = dynamic(() => import('@/components/FinancialDashboard'), { ssr: false });
const GrossMarginDashboard = dynamic(() => import('@/components/GrossMarginDashboard'), { ssr: false });
const HistoricalDashboard = dynamic(() => import('@/components/HistoricalDashboard'), { ssr: false });

type DashboardType = 'joechart' | 'financial' | 'margin' | 'historical';

interface DashboardTab {
  id: DashboardType;
  label: string;
  description: string;
}

const dashboards: DashboardTab[] = [
  { id: 'joechart', label: 'Joe Chart', description: 'Executive Summary (Andy.md Framework)' },
  { id: 'financial', label: 'Financial', description: 'Revenue, expenses & P&L' },
  { id: 'margin', label: 'Gross Margin', description: 'Revenue - COGS analysis' },
  { id: 'historical', label: 'Historical', description: 'Full timeline 2022-2026 from Klair' },
];

export default function Home() {
  const [activeDashboard, setActiveDashboard] = useState<DashboardType>('joechart');

  return (
    <main className="min-h-screen">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm">
                ATS
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Academics (Tech Stack)</h1>
                <p className="text-xs text-gray-500">Tier 1 Investment | $81.4M Cumulative (2022-2025)</p>
              </div>
            </div>

            {/* Dashboard Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {dashboards.map((dashboard) => (
                <button
                  key={dashboard.id}
                  onClick={() => setActiveDashboard(dashboard.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeDashboard === dashboard.id
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {dashboard.label}
                </button>
              ))}
            </div>

            {/* Status Indicator */}
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm font-medium text-gray-700">YELLOW</span>
              </div>
              <span className="text-xs text-gray-500">| Data: Jan 2026</span>
            </div>
          </div>
        </div>

        {/* Dashboard Description Bar */}
        <div className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {dashboards.find(d => d.id === activeDashboard)?.description}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Filter: business_unit = &apos;Academics&apos;</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {activeDashboard === 'joechart' && <JoeChartDashboard />}
        {activeDashboard === 'financial' && <FinancialDashboard />}
        {activeDashboard === 'margin' && <GrossMarginDashboard />}
        {activeDashboard === 'historical' && <HistoricalDashboard />}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div>
              <h4 className="text-white font-semibold mb-2">Revenue Sources</h4>
              <ul className="space-y-1">
                <li>2HR Learning Licensing (Standard)</li>
                <li>2HR Learning Licensing (Virtual/ESA)</li>
                <li>2HR Learning Licensing (MTSS)</li>
                <li>Internal Services</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Top Cost Centers</h4>
              <ul className="space-y-1">
                <li>AE Studio - $25.5M</li>
                <li>LightCI - $5.8M</li>
                <li>Eigen Consulting - $5.0M</li>
                <li>AWS/Infrastructure - $3.4M</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Timeline</h4>
              <ul className="space-y-1">
                <li className="text-green-400">2022: Near breakeven (-$317K)</li>
                <li className="text-yellow-400">2023: Investment ramp (-$12.5M)</li>
                <li className="text-red-400">2024: Platform build (-$31.3M)</li>
                <li className="text-purple-400">2025: Revenue launch (-$37.3M)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Key Metrics</h4>
              <ul className="space-y-1">
                <li className="text-green-400">Q4 2025 Margin: 63.8%</li>
                <li className="text-yellow-400">Jan 2026 Revenue: $857K</li>
                <li className="text-blue-400">Cumulative: $81.4M invested</li>
                <li className="text-purple-400">49 months of Klair data</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-xs">
            <p>Academics (Tech Stack) Joe Chart | Tier 1 Investment Dashboard</p>
            <p className="mt-1">Source: Klair (core_budgets.consolidated_budgets_and_actuals) | Last Updated: January 30, 2026</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
