import { configureStore } from '@reduxjs/toolkit';
import shoppingListReducer from './slices/shoppingListSlice';

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
  },
});

