import React, { useState } from 'react';
import { useAppSelector } from '../hooks/useAppHooks';
import {
  Download,
  PictureAsPdf,
  TableChart,
  CalendarToday,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const monthlyReport = [
  { m: 'Oct', income: 5800, expense: 3200, savings: 2600 },
  { m: 'Nov', income: 6200, expense: 3800, savings: 2400 },
  { m: 'Dec', income: 7100, expense: 4200, savings: 2900 },
  { m: 'Jan', income: 5900, expense: 3100, savings: 2800 },
  { m: 'Feb', income: 7000, expense: 2950, savings: 4050 },
  { m: 'Mar', income: 7000, expense: 480, savings: 6520 },
];

const Reports: React.FC = () => {
  const expenses = useAppSelector((s) => s.expenses.items);
  const [activeMonth, setActiveMonth] = useState('March 2026');
  const months = [
    'March 2026',
    'February 2026',
    'January 2026',
    'December 2025',
  ];

  const totalIncome = expenses
    .filter((e) => e.type === 'income')
    .reduce((a, b) => a + b.amount, 0);
  const totalExpense = expenses
    .filter((e) => e.type === 'expense')
    .reduce((a, b) => a + b.amount, 0);

  const categoryBreakdown = expenses
    .filter((e) => e.type === 'expense')
    .reduce(
      (acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Monthly Reports & Export
          </h2>
          <p className="text-sm text-gray-400">
            Generate and download financial reports
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <TableChart sx={{ fontSize: 16, color: '#10b981' }} /> Export CSV
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #1325ec, #6b7aff)' }}
          >
            <PictureAsPdf sx={{ fontSize: 16 }} /> Export PDF
          </button>
        </div>
      </div>

      {/* Month Selector */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <CalendarToday sx={{ fontSize: 18, color: '#1325ec' }} />
          <h3 className="font-semibold text-gray-800">Select Report Period</h3>
        </div>
        <div className="flex gap-3 flex-wrap">
          {months.map((m) => (
            <button
              key={m}
              onClick={() => setActiveMonth(m)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeMonth === m
                  ? 'text-white shadow-sm'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
              style={
                activeMonth === m
                  ? { background: 'linear-gradient(135deg, #1325ec, #6b7aff)' }
                  : {}
              }
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-5">
        {[
          {
            label: 'Total Income',
            value: `$${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            color: '#10b981',
            bg: '#ecfdf5',
          },
          {
            label: 'Total Expenses',
            value: `$${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            color: '#ef4444',
            bg: '#fef2f2',
          },
          {
            label: 'Net Savings',
            value: `$${(totalIncome - totalExpense).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            color: '#1325ec',
            bg: '#eef0fd',
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
          >
            <div
              className="w-10 h-10 rounded-xl mb-3"
              style={{ background: s.bg }}
            />
            <p className="text-2xl font-bold" style={{ color: s.color }}>
              {s.value}
            </p>
            <p className="text-sm text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Monthly Savings Chart */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-1">
          6-Month Financial Summary
        </h3>
        <p className="text-xs text-gray-400 mb-5">Income, Expenses & Savings</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyReport} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f6fa" />
            <XAxis
              dataKey="m"
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }}
              formatter={(v: number) => [`$${v.toLocaleString()}`, '']}
            />
            <Bar
              dataKey="income"
              name="Income"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              barSize={22}
            />
            <Bar
              dataKey="expense"
              name="Expense"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
              barSize={22}
            />
            <Bar
              dataKey="savings"
              name="Savings"
              fill="#1325ec"
              radius={[4, 4, 0, 0]}
              barSize={22}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown Table */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-5">Category Breakdown</h3>
        <div className="space-y-3">
          {Object.entries(categoryBreakdown)
            .sort((a, b) => b[1] - a[1])
            .map(([cat, amount], i) => {
              const pct = (amount / totalExpense) * 100;
              const colors = [
                '#1325ec',
                '#10b981',
                '#f59e0b',
                '#ef4444',
                '#8b5cf6',
                '#ec4899',
              ];
              return (
                <div key={cat} className="flex items-center gap-4">
                  <span className="text-xs text-gray-400 w-6">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{cat}</span>
                      <span className="text-gray-400">
                        ${amount.toFixed(2)} ({pct.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-2 rounded-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          background: colors[i % colors.length],
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Reports;
