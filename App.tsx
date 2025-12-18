import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import ShoppingListScreen from './src/screens/ShoppingListScreen';
import { StatusBar } from 'expo-status-bar';

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <ShoppingListScreen />
      <StatusBar style="auto" />
    </Provider>
  );
}

