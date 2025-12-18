import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

const Container = ({ children, style, safeArea = true }) => {
  const content = <View style={[styles.container, style]}>{children}</View>;

  if (safeArea) {
    return <SafeAreaView style={styles.safeArea}>{content}</SafeAreaView>;
  }

  return content;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
});

export default Container;

