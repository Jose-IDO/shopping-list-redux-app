import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShoppingListState, ShoppingItem } from '../../types';

const initialState: ShoppingListState = {
  items: [],
  loading: false,
  error: null,
};

interface AddItemPayload {
  name: string;
  quantity?: number;
}

interface EditItemPayload {
  id: string;
  name?: string;
  quantity?: number;
}

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ShoppingItem[]>) => {
      state.items = action.payload;
      state.error = null;
    },
    addItem: (state, action: PayloadAction<AddItemPayload>) => {
      const newItem: ShoppingItem = {
        id: Date.now().toString(),
        name: action.payload.name,
        quantity: action.payload.quantity || 1,
        purchased: false,
        createdAt: new Date().toISOString(),
      };
      state.items.push(newItem);
      state.error = null;
    },
    editItem: (state, action: PayloadAction<EditItemPayload>) => {
      const { id, name, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        if (name !== undefined) item.name = name;
        if (quantity !== undefined) item.quantity = quantity;
      }
      state.error = null;
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.error = null;
    },
    togglePurchased: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.purchased = !item.purchased;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
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

