import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppHooks';
import { openAddExpense } from '../store/slices/uiSlice';
import { AppCard, AppButton } from '../components/CustomMUI';
import {
  TrendingUp,
  TrendingDown,
  AccountBalanceWallet,
  Receipt,
  ArrowUpward,
  ArrowDownward,
  Add,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const monthlyData = [
  { month: 'Oct', income: 5800, expense: 3200 },
  { month: 'Nov', income: 6200, expense: 3800 },
  { month: 'Dec', income: 7100, expense: 4200 },
  { month: 'Jan', income: 5900, expense: 3100 },
  { month: 'Feb', income: 7000, expense: 2950 },
  { month: 'Mar', income: 7000, expense: 479.98 },
];

const categoryData = [
  { name: 'Food & Dining', value: 226.1, color: '#f59e0b' },
  { name: 'Utilities', value: 154.19, color: '#10b981' },
  { name: 'Shopping', value: 67.3, color: '#ec4899' },
  { name: 'Health', value: 45.0, color: '#ef4444' },
  { name: 'Transport', value: 18.4, color: '#3b82f6' },
  { name: 'Entertainment', value: 15.99, color: '#8b5cf6' },
];

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector((s: any) => s.expenses.items);

  const totalIncome = expenses
    .filter((e: any) => e.type === 'income')
    .reduce((a: number, b: any) => a + b.amount, 0);
  const totalExpense = expenses
    .filter((e: any) => e.type === 'expense')
    .reduce((a: number, b: any) => a + b.amount, 0);
  const balance = totalIncome - totalExpense;
  const recentExpenses = expenses.slice(0, 6);

  const categoryIcons: Record<string, string> = {
    'Food & Dining': '🍔',
    Entertainment: '🎬',
    Income: '💰',
    Utilities: '⚡',
    Transport: '🚗',
    Health: '❤️',
    Shopping: '🛍️',
    Education: '📚',
  };

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-5">
        {[
          {
            label: 'Total Balance',
            value: `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            icon: <AccountBalanceWallet />,
            color: '#4F46E5',
            bg: '#EEF2FF',
            change: '+2.5%',
            up: true,
          },
          {
            label: 'Monthly Income',
            value: `$${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            icon: <TrendingUp />,
            color: '#10b981',
            bg: '#ecfdf5',
            change: '+8.1%',
            up: true,
          },
          {
            label: 'Monthly Expense',
            value: `$${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            icon: <TrendingDown />,
            color: '#ef4444',
            bg: '#fef2f2',
            change: '-3.2%',
            up: false,
          },
          {
            label: 'Transactions',
            value: expenses.length.toString(),
            icon: <Receipt />,
            color: '#f59e0b',
            bg: '#fffbeb',
            change: '+12',
            up: true,
          },
        ].map((stat) => (
          <AppCard key={stat.label} className="!p-5">
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: stat.bg }}
              >
                <span style={{ color: stat.color, display: 'flex' }}>
                  {stat.icon}
                </span>
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${stat.up ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'}`}
              >
                {stat.up ? (
                  <ArrowUpward sx={{ fontSize: 12 }} />
                ) : (
                  <ArrowDownward sx={{ fontSize: 12 }} />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1 font-medium">
              {stat.label}
            </p>
          </AppCard>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-5">
        {/* Income vs Expense Chart */}
        <AppCard className="col-span-2 !p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-900 text-base">
                Income vs Expenses
              </h3>
              <p className="text-xs text-gray-400">Last 6 months overview</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: '#4F46E5' }}
                />
                Income
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                Expense
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  fontSize: 12,
                }}
                formatter={(val: any) => [`$${val?.toLocaleString()}`, '']}
              />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#4F46E5"
                strokeWidth={2.5}
                fill="url(#colorIncome)"
              />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={2.5}
                fill="url(#colorExpense)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </AppCard>

        {/* Pie Chart */}
        <AppCard className="!p-6">
          <h3 className="font-bold text-gray-900 text-base mb-1">
            Spending by Category
          </h3>
          <p className="text-xs text-gray-400 mb-4">This month</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                dataKey="value"
                paddingAngle={3}
              >
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val: any) => [`$${val?.toFixed(2)}`, '']}
                contentStyle={{ borderRadius: 12, fontSize: 11 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {categoryData.slice(0, 4).map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: c.color }}
                  />
                  <span className="text-gray-500 font-medium">{c.name}</span>
                </div>
                <span className="font-bold text-gray-700">
                  ${c.value.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </AppCard>
      </div>

      {/* Recent Transactions */}
      <AppCard className="!p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-gray-900 text-base">
              Recent Transactions
            </h3>
            <p className="text-xs text-gray-400">Your latest activity</p>
          </div>
          <AppButton
            variant="contained"
            onClick={() => dispatch(openAddExpense())}
            startIcon={<Add />}
          >
            Add Expense
          </AppButton>
        </div>
        <div className="space-y-3">
          {recentExpenses.map((exp: any) => (
            <div
              key={exp.id}
              className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-lg group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-100">
                {categoryIcons[exp.category] || '💳'}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">{exp.title}</p>
                <p className="text-xs text-gray-400 font-medium">
                  {exp.category} • {exp.date}
                </p>
              </div>
              <span
                className={`text-sm font-extrabold ${exp.type === 'income' ? 'text-green-500' : 'text-red-500'}`}
              >
                {exp.type === 'income' ? '+' : '-'}${exp.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </AppCard>
    </div>
  );
};

export default Dashboard;
