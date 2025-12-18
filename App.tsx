import './src/utils/urlPolyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import ShoppingListScreen from './src/screens/ShoppingListScreen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <View style={Platform.OS === 'web' ? webStyles.root : undefined}>
        <ShoppingListScreen />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const webStyles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100vh',
    overflow: 'auto',
  },
});

