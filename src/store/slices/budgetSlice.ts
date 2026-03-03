import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  color: string;
}

const initialState: Budget[] = [
  {
    id: '1',
    category: 'Food & Dining',
    limit: 600,
    spent: 226.1,
    color: '#f59e0b',
  },
  { id: '2', category: 'Transport', limit: 200, spent: 18.4, color: '#3b82f6' },
  {
    id: '3',
    category: 'Entertainment',
    limit: 100,
    spent: 15.99,
    color: '#8b5cf6',
  },
  {
    id: '4',
    category: 'Utilities',
    limit: 250,
    spent: 154.19,
    color: '#10b981',
  },
  { id: '5', category: 'Shopping', limit: 400, spent: 67.3, color: '#ec4899' },
  { id: '6', category: 'Health', limit: 150, spent: 45.0, color: '#ef4444' },
];

const budgetSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    addBudget(state, action: PayloadAction<Budget>) {
      state.push(action.payload);
    },
    updateBudget(state, action: PayloadAction<Budget>) {
      const idx = state.findIndex((b) => b.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },
    deleteBudget(state, action: PayloadAction<string>) {
      return state.filter((b) => b.id !== action.payload);
    },
  },
});

export const { addBudget, updateBudget, deleteBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
