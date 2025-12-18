import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
      state.error = null;
    },
    addItem: (state, action) => {
      const newItem = {
        id: Date.now().toString(),
        name: action.payload.name,
        quantity: action.payload.quantity || 1,
        purchased: false,
        createdAt: new Date().toISOString(),
      };
      state.items.push(newItem);
      state.error = null;
    },
    editItem: (state, action) => {
      const { id, name, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        if (name !== undefined) item.name = name;
        if (quantity !== undefined) item.quantity = quantity;
      }
      state.error = null;
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.error = null;
    },
    togglePurchased: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.purchased = !item.purchased;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setItems,
  addItem,
  editItem,
  deleteItem,
  togglePurchased,
  setLoading,
  setError,
  clearError,
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;

