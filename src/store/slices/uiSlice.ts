import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  addExpenseOpen: boolean;
  darkMode: boolean;
  currentPage: string;
}

const initialState: UiState = {
  sidebarOpen: true,
  addExpenseOpen: false,
  darkMode: false,
  currentPage: 'dashboard',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openAddExpense(state) {
      state.addExpenseOpen = true;
    },
    closeAddExpense(state) {
      state.addExpenseOpen = false;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  openAddExpense,
  closeAddExpense,
  toggleDarkMode,
  setCurrentPage,
} = uiSlice.actions;
export default uiSlice.reducer;
