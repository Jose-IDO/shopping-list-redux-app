import { configureStore } from '@reduxjs/toolkit';
import shoppingListReducer from './slices/shoppingListSlice';

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;




