import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppHooks';
import { addExpense } from '../../store/slices/expenseSlice';
import { closeAddExpense } from '../../store/slices/uiSlice';
import { Close, Add } from '@mui/icons-material';
import { Dialog } from '@mui/material';

const CATEGORIES = [
  'Food & Dining',
  'Transport',
  'Entertainment',
  'Utilities',
  'Shopping',
  'Health',
  'Education',
  'Income',
  'Other',
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
  Other: '💳',
};

const AddExpenseModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.ui.addExpenseOpen);
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: 'Food & Dining',
    date: new Date().toISOString().split('T')[0],
    type: 'expense' as 'expense' | 'income',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.amount) return;
    dispatch(
      addExpense({
        id: Date.now().toString(),
        title: form.title,
        amount: parseFloat(form.amount),
        category: form.category,
        date: form.date,
        type: form.type,
        notes: form.notes,
      }),
    );
    dispatch(closeAddExpense());
    setForm({
      title: '',
      amount: '',
      category: 'Food & Dining',
      date: new Date().toISOString().split('T')[0],
      type: 'expense',
      notes: '',
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(closeAddExpense())}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
          fontFamily: 'Manrope',
        },
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add Transaction</h2>
            <p className="text-xs text-gray-400">
              Record a new income or expense
            </p>
          </div>
          <button
            onClick={() => dispatch(closeAddExpense())}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <Close sx={{ fontSize: 18, color: '#6b7280' }} />
          </button>
        </div>

        {/* Type Toggle */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-5">
          {(['expense', 'income'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setForm((f) => ({ ...f, type: t }))}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                form.type === t
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400'
              }`}
            >
              {t === 'expense' ? '💸 Expense' : '💰 Income'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
          <div className="relative text-center bg-gray-50 rounded-2xl p-6">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-300">
              $
            </span>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) =>
                setForm((f) => ({ ...f, amount: e.target.value }))
              }
              className="w-full text-center text-4xl font-bold text-gray-900 bg-transparent outline-none placeholder:text-gray-200"
              required
            />
          </div>

          {/* Title */}
          <input
            type="text"
            placeholder="Transaction title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all text-gray-800 placeholder:text-gray-400"
            required
          />

          {/* Date */}
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all text-gray-700"
          />

          {/* Category Picker */}
          <div>
            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
              Category
            </p>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, category: cat }))}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                    form.category === cat
                      ? 'border-blue-400 bg-blue-50 text-blue-700'
                      : 'border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <span>{categoryIcons[cat]}</span>
                  <span className="truncate">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <textarea
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            rows={2}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all text-gray-800 placeholder:text-gray-400 resize-none"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-md"
            style={{ background: 'linear-gradient(135deg, #1325ec, #6b7aff)' }}
          >
            <Add sx={{ fontSize: 18 }} /> Add{' '}
            {form.type === 'expense' ? 'Expense' : 'Income'}
          </button>
        </form>
      </div>
    </Dialog>
  );
};

export default AddExpenseModal;
