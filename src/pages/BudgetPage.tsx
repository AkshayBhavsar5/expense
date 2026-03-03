import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppHooks';
import { addBudget, deleteBudget } from '../store/slices/budgetSlice';
import { Add, Delete, Edit } from '@mui/icons-material';
import { LinearProgress } from '@mui/material';

const BudgetPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const budgets = useAppSelector((s) => s.budgets);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    category: '',
    limit: '',
    color: '#1325ec',
  });

  const colors = [
    '#1325ec',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6',
    '#ec4899',
    '#3b82f6',
  ];

  const totalBudget = budgets.reduce((a, b) => a + b.limit, 0);
  const totalSpent = budgets.reduce((a, b) => a + b.spent, 0);
  const overallProgress = (totalSpent / totalBudget) * 100;

  const handleAddBudget = () => {
    if (!form.category || !form.limit) return;
    dispatch(
      addBudget({
        id: Date.now().toString(),
        category: form.category,
        limit: parseFloat(form.limit),
        spent: 0,
        color: form.color,
      }),
    );
    setForm({ category: '', limit: '', color: '#1325ec' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Budget Management</h2>
          <p className="text-sm text-gray-400">
            Set and track your spending limits
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md hover:opacity-90 transition-opacity"
          style={{ background: 'linear-gradient(135deg, #1325ec, #6b7aff)' }}
        >
          <Add sx={{ fontSize: 18 }} /> New Budget
        </button>
      </div>

      {/* Overall Budget Card */}
      <div
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #1325ec 0%, #6b7aff 100%)',
        }}
      >
        <p className="text-white/60 text-sm mb-2">Overall Budget</p>
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-3xl font-bold text-white">
              ${totalSpent.toFixed(2)}
            </p>
            <p className="text-white/60 text-sm">
              spent of ${totalBudget.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white text-2xl font-bold">
              {overallProgress.toFixed(0)}%
            </p>
            <p className="text-white/60 text-sm">used</p>
          </div>
        </div>
        <div className="w-full h-2 rounded-full bg-white/20">
          <div
            className="h-2 rounded-full bg-white transition-all duration-700"
            style={{ width: `${Math.min(overallProgress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-white/60 text-xs">
          <span>${(totalBudget - totalSpent).toFixed(2)} remaining</span>
          <span>${totalBudget.toFixed(2)} total</span>
        </div>
      </div>

      {/* Add Budget Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-blue-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Add New Budget</h3>
          <div className="grid grid-cols-3 gap-4">
            <input
              placeholder="Category name"
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 transition-colors"
            />
            <input
              type="number"
              placeholder="Monthly limit ($)"
              value={form.limit}
              onChange={(e) =>
                setForm((f) => ({ ...f, limit: e.target.value }))
              }
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 transition-colors"
            />
            <div className="flex items-center gap-3">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setForm((f) => ({ ...f, color: c }))}
                  className={`w-6 h-6 rounded-full transition-transform ${form.color === c ? 'scale-125 ring-2 ring-offset-1 ring-gray-400' : ''}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddBudget}
              className="px-5 py-2 rounded-xl text-sm text-white font-semibold"
              style={{
                background: 'linear-gradient(135deg, #1325ec, #6b7aff)',
              }}
            >
              Add Budget
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-5 py-2 rounded-xl text-sm text-gray-500 border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Budget Cards Grid */}
      <div className="grid grid-cols-2 gap-5">
        {budgets.map((budget) => {
          const pct = (budget.spent / budget.limit) * 100;
          const over = pct > 100;
          const warn = pct > 80;
          return (
            <div
              key={budget.id}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${budget.color}20` }}
                  >
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ background: budget.color, display: 'block' }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {budget.category}
                    </p>
                    <p className="text-xs text-gray-400">Monthly Budget</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      over
                        ? 'text-red-600 bg-red-50'
                        : warn
                          ? 'text-amber-600 bg-amber-50'
                          : 'text-green-600 bg-green-50'
                    }`}
                  >
                    {over ? '⚠ Over' : warn ? '⚡ Warning' : '✓ On Track'}
                  </span>
                  <button
                    onClick={() => dispatch(deleteBudget(budget.id))}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Delete sx={{ fontSize: 16 }} />
                  </button>
                </div>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-gray-900">
                  ${budget.spent.toFixed(2)}
                </span>
                <span className="text-gray-400">
                  of ${budget.limit.toFixed(2)}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min(pct, 100)}%`,
                    background: over
                      ? '#ef4444'
                      : warn
                        ? '#f59e0b'
                        : budget.color,
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>{pct.toFixed(0)}% used</span>
                <span>${(budget.limit - budget.spent).toFixed(2)} left</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetPage;
