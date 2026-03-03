import React, { useState } from 'react';
import { useAppSelector } from '../hooks/useAppHooks';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';
import { AppCard } from '../components/CustomMUI';

const weeklyData = [
  { day: 'Mon', amount: 42 },
  { day: 'Tue', amount: 88 },
  { day: 'Wed', amount: 15 },
  { day: 'Thu', amount: 124 },
  { day: 'Fri', amount: 67 },
  { day: 'Sat', amount: 195 },
  { day: 'Sun', amount: 35 },
];

const monthlyTrend = [
  { m: 'Sep', expense: 2800, income: 5200 },
  { m: 'Oct', expense: 3200, income: 5800 },
  { m: 'Nov', expense: 3800, income: 6200 },
  { m: 'Dec', expense: 4200, income: 7100 },
  { m: 'Jan', expense: 3100, income: 5900 },
  { m: 'Feb', expense: 2950, income: 7000 },
  { m: 'Mar', expense: 480, income: 7000 },
];

const COLORS = [
  '#4F46E5', // Indigo
  '#10b981', // Green
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#8b5cf6', // Violet
  '#ec4899', // Pink
];

const Analytics: React.FC = () => {
  const expenses = useAppSelector((s: any) => s.expenses.items);
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('monthly');

  const categorySpend = expenses
    .filter((e: any) => e.type === 'expense')
    .reduce(
      (acc: any, e: any) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

  const pieData = Object.entries(categorySpend).map(([name, value]) => ({
    name,
    value: value as number,
  }));
  const avgDailySpend =
    expenses
      .filter((e: any) => e.type === 'expense')
      .reduce((a: number, b: any) => a + b.amount, 0) / 30;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-[#1a1a2e] tracking-tight">
          Advanced Analytics
        </h2>
        <p className="text-slate-500 font-medium text-sm">
          Deep insights into your spending habits and financial patterns.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-5">
        {[
          {
            label: 'Avg Daily Spend',
            value: `$${avgDailySpend.toFixed(2)}`,
            color: '#4F46E5',
            bg: '#EEF2FF',
          },
          {
            label: 'Biggest Expense',
            value: `$${Math.max(...expenses.filter((e: any) => e.type === 'expense').map((e: any) => e.amount), 0).toFixed(2)}`,
            color: '#ef4444',
            bg: '#fef2f2',
          },
          {
            label: 'Top Category',
            value:
              Object.entries(categorySpend).sort(
                (a: any, b: any) => (b[1] as number) - (a[1] as number),
              )[0]?.[0] || '-',
            color: '#f59e0b',
            bg: '#fffbeb',
          },
          {
            label: 'Savings Rate',
            value: '58.6%',
            color: '#10b981',
            bg: '#ecfdf5',
          },
        ].map((kpi) => (
          <AppCard key={kpi.label} className="!p-5 border border-slate-100">
            <div
              className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center shadow-sm"
              style={{ background: kpi.bg }}
            >
              <span
                className="text-lg font-extrabold"
                style={{ color: kpi.color }}
              >
                {kpi.label.charAt(0)}
              </span>
            </div>
            <p className="text-2xl font-extrabold text-slate-800 truncate tracking-tight">
              {kpi.value}
            </p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
              {kpi.label}
            </p>
          </AppCard>
        ))}
      </div>

      {/* Trend Chart */}
      <AppCard className="!p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-extrabold text-slate-800">
              Income vs Expense Trend
            </h3>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              7-month financial overview
            </p>
          </div>
          <div className="flex bg-slate-100/50 rounded-2xl p-1.5 border border-slate-100">
            {(['weekly', 'monthly'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-white text-[#4F46E5] shadow-md border border-slate-100'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyTrend}>
            <defs>
              <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              vertical={false}
            />
            <XAxis
              dataKey="m"
              tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `$${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: 'none',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                fontSize: 12,
                fontWeight: 600,
                padding: '12px 16px',
              }}
              formatter={(v: any) => [`$${v?.toLocaleString()}`, '']}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#gIncome)"
              name="Income"
              dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={3}
              fill="url(#gExpense)"
              name="Expense"
              dot={{ r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </AppCard>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Weekly Spending Bar */}
        <AppCard className="!p-8 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-extrabold text-slate-800 mb-1">
            Weekly Activity
          </h3>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-8">
            Breakdown of daily spending
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData} barSize={36}>
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `$${v}`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: 'none',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  fontSize: 12,
                  fontWeight: 600,
                }}
                formatter={(v: any) => [`$${v}`, 'Spent']}
                cursor={{ fill: '#f8fafc', radius: 12 }}
              />
              <Bar dataKey="amount" radius={[8, 8, 8, 8]} fill="#4F46E5">
                {weeklyData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i === 5 ? '#ef4444' : '#4F46E5'}
                    fillOpacity={1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </AppCard>

        {/* Category Breakdown Pie */}
        <AppCard className="!p-8 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-extrabold text-slate-800 mb-1">
            Category Insights
          </h3>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-4">
            Total spending distribution
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                paddingAngle={4}
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: 'none',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  fontSize: 12,
                  fontWeight: 600,
                }}
                formatter={(v: any) => [`$${v?.toFixed(2)}`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {pieData.slice(0, 4).map((d, i) => (
              <div
                key={d.name}
                className="flex items-center gap-3 p-2 rounded-xl bg-slate-50/50"
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <span className="text-slate-600 font-bold text-xs truncate">
                  {d.name}
                </span>
              </div>
            ))}
          </div>
        </AppCard>
      </div>
    </div>
  );
};

export default Analytics;
