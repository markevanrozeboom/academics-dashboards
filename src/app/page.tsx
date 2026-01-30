'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const JoeChartDashboard = dynamic(() => import('@/components/JoeChartDashboard'), { ssr: false });
const FinancialDashboard = dynamic(() => import('@/components/FinancialDashboard'), { ssr: false });
const GrossMarginDashboard = dynamic(() => import('@/components/GrossMarginDashboard'), { ssr: false });

type DashboardType = 'joechart' | 'financial' | 'margin';

interface DashboardTab {
  id: DashboardType;
  label: string;
  description: string;
}

const dashboards: DashboardTab[] = [
  { id: 'joechart', label: 'Joe Chart', description: 'Executive Summary (Andy.md Framework)' },
  { id: 'financial', label: 'Financial', description: 'Revenue, expenses & P&L' },
  { id: 'margin', label: 'Gross Margin', description: 'Revenue - COGS analysis' },
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
                <p className="text-xs text-gray-500">Tier 1 Investment | -$15.9M Cumulative</p>
              </div>
            </div>

            {/* Dashboard Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {dashboards.map((dashboard) => (
                <button
                  key={dashboard.id}
                  onClick={() => setActiveDashboard(dashboard.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
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
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="text-white font-semibold mb-2">Products</h4>
              <ul className="space-y-1">
                <li>Lesson Planet - Curriculum content</li>
                <li>Timeback - Learning management</li>
                <li>School Management Software</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Data Filters</h4>
              <ul className="space-y-1">
                <li>Budget: business_unit = &apos;Academics&apos;</li>
                <li>Revenue types: Recurring + Non-Recurring</li>
                <li>Expense types: HC, NHC OPEX, CF, COGS</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Key Insight</h4>
              <ul className="space-y-1">
                <li className="text-green-400">Closest to Breakeven</li>
                <li className="text-yellow-400">52% Gross Margin</li>
                <li className="text-blue-400">-$9.6M 2026 Gap</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-xs">
            <p>Academics (Tech Stack) Joe Chart | Tier 1 Investment Dashboard</p>
            <p className="mt-1">Last Updated: January 30, 2026</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
