import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
  notes?: string;
  receipt?: string;
}

interface ExpenseState {
  items: Expense[];
  loading: boolean;
  scannerOpen: boolean;
  scannedData: Partial<Expense> | null;
}

const sampleExpenses: Expense[] = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: 128.5,
    category: 'Food & Dining',
    date: '2026-03-01',
    type: 'expense',
  },
  {
    id: '2',
    title: 'Netflix Subscription',
    amount: 15.99,
    category: 'Entertainment',
    date: '2026-03-01',
    type: 'expense',
  },
  {
    id: '3',
    title: 'Monthly Salary',
    amount: 5800.0,
    category: 'Income',
    date: '2026-03-01',
    type: 'income',
  },
  {
    id: '4',
    title: 'Electric Bill',
    amount: 94.2,
    category: 'Utilities',
    date: '2026-03-02',
    type: 'expense',
  },
  {
    id: '5',
    title: 'Uber Ride',
    amount: 18.4,
    category: 'Transport',
    date: '2026-03-02',
    type: 'expense',
  },
  {
    id: '6',
    title: 'Coffee Shop',
    amount: 12.6,
    category: 'Food & Dining',
    date: '2026-03-02',
    type: 'expense',
  },
  {
    id: '7',
    title: 'Gym Membership',
    amount: 45.0,
    category: 'Health',
    date: '2026-03-01',
    type: 'expense',
  },
  {
    id: '8',
    title: 'Freelance Payment',
    amount: 1200.0,
    category: 'Income',
    date: '2026-02-28',
    type: 'income',
  },
  {
    id: '9',
    title: 'Amazon Purchase',
    amount: 67.3,
    category: 'Shopping',
    date: '2026-02-28',
    type: 'expense',
  },
  {
    id: '10',
    title: 'Restaurant Dinner',
    amount: 85.0,
    category: 'Food & Dining',
    date: '2026-02-27',
    type: 'expense',
  },
  {
    id: '11',
    title: 'Internet Bill',
    amount: 59.99,
    category: 'Utilities',
    date: '2026-02-27',
    type: 'expense',
  },
  {
    id: '12',
    title: 'Book Purchase',
    amount: 22.5,
    category: 'Education',
    date: '2026-02-26',
    type: 'expense',
  },
];

const initialState: ExpenseState = {
  items: sampleExpenses,
  loading: false,
  scannerOpen: false,
  scannedData: null,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense(state, action: PayloadAction<Expense>) {
      state.items.unshift(action.payload);
    },
    deleteExpense(state, action: PayloadAction<string>) {
      state.items = state.items.filter((e) => e.id !== action.payload);
    },
    updateExpense(state, action: PayloadAction<Expense>) {
      const idx = state.items.findIndex((e) => e.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    openScanner(state) {
      state.scannerOpen = true;
    },
    closeScanner(state) {
      state.scannerOpen = false;
      state.scannedData = null;
    },
    setScannedData(state, action: PayloadAction<Partial<Expense>>) {
      state.scannedData = action.payload;
    },
  },
});

export const {
  addExpense,
  deleteExpense,
  updateExpense,
  openScanner,
  closeScanner,
  setScannedData,
} = expenseSlice.actions;
export default expenseSlice.reducer;
