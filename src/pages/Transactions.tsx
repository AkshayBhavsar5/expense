import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppHooks';
import { deleteExpense } from '../store/slices/expenseSlice';
import { openAddExpense } from '../store/slices/uiSlice';
import {
  Add,
  Delete,
  FilterList,
  Search,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';
import { Chip } from '@mui/material';
import { AppCard, AppButton, AppTextField } from '../components/CustomMUI';
import { InputAdornment } from '@mui/material';

const CATEGORIES = [
  'All',
  'Food & Dining',
  'Transport',
  'Entertainment',
  'Utilities',
  'Shopping',
  'Health',
  'Education',
  'Income',
];

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

const Transactions: React.FC = () => {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector((s: any) => s.expenses.items);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filtered = expenses
    .filter(
      (e: any) => activeCategory === 'All' || e.category === activeCategory,
    )
    .filter((e: any) => e.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a: any, b: any) =>
      sortDir === 'desc'
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

  const totalIncome = filtered
    .filter((e: any) => e.type === 'income')
    .reduce((a: number, b: any) => a + b.amount, 0);
  const totalExpense = filtered
    .filter((e: any) => e.type === 'expense')
    .reduce((a: number, b: any) => a + b.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Transactions
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Review and manage all your financial records
          </p>
        </div>
        <AppButton
          variant="contained"
          onClick={() => dispatch(openAddExpense())}
          startIcon={<Add />}
        >
          Add Transaction
        </AppButton>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-5">
        <AppCard className="!p-6 border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Activities
          </p>
          <p className="text-2xl font-extrabold text-slate-800">
            {filtered.length}
          </p>
        </AppCard>
        <AppCard className="!p-6 border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Total Income
          </p>
          <p className="text-2xl font-extrabold text-green-500">
            +$
            {totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </AppCard>
        <AppCard className="!p-6 border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Total Expenses
          </p>
          <p className="text-2xl font-extrabold text-red-500">
            -$
            {totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </AppCard>
      </div>

      {/* Filters */}
      <AppCard className="!p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <AppTextField
            fullWidth
            size="small"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} className="text-slate-400" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <AppButton
            variant="outlined"
            onClick={() => setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))}
            className="!h-11 !px-6 !border-slate-200 !text-slate-600 !bg-white hover:!bg-slate-50"
            startIcon={<FilterList size={16} />}
          >
            Sort by Date
            {sortDir === 'desc' ? (
              <ArrowDownward sx={{ fontSize: 16, ml: 1 }} />
            ) : (
              <ArrowUpward sx={{ fontSize: 16, ml: 1 }} />
            )}
          </AppButton>
        </div>
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                activeCategory === cat
                  ? 'bg-[#4F46E5] text-white border-[#4F46E5] shadow-lg shadow-indigo-100'
                  : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </AppCard>

      {/* Transactions Table */}
      <AppCard className="!p-0 !overflow-hidden border border-slate-100 shadow-sm">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-8 py-4 bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>Transaction Detail</span>
          <span>Category</span>
          <span>Date</span>
          <span>Amount</span>
          <span></span>
        </div>
        <div className="divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-slate-300" />
              </div>
              <p className="text-slate-400 font-bold">
                No transactions match your search
              </p>
            </div>
          ) : (
            filtered.map((exp: any) => (
              <div
                key={exp.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-8 py-5 hover:bg-slate-50/80 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-xl shadow-sm border border-white group-hover:bg-white transition-colors">
                    {categoryIcons[exp.category] || '💳'}
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-800">
                      {exp.title}
                    </p>
                    {exp.notes && (
                      <p className="text-xs text-slate-400 font-medium">
                        {exp.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-extrabold uppercase tracking-wider">
                    {exp.category}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-bold">
                  {exp.date}
                </span>
                <span
                  className={`text-sm font-extrabold ${exp.type === 'income' ? 'text-green-500' : 'text-red-500'}`}
                >
                  {exp.type === 'income' ? '+' : '-'}${exp.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => dispatch(deleteExpense(exp.id))}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 cursor-pointer border-none bg-transparent"
                >
                  <Delete sx={{ fontSize: 20 }} />
                </button>
              </div>
            ))
          )}
        </div>
      </AppCard>
    </div>
  );
};

export default Transactions;
