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
      <View style={Platform.OS === 'web' ? webStyles.root : styles.root}>
        <ShoppingListScreen />
        <StatusBar style="light" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

const webStyles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100vh',
    overflow: 'auto',
    flex: 1,
  },
});

