import React from 'react';
import { View, StyleSheet, SafeAreaView, ViewStyle, Platform } from 'react-native';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  safeArea?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, style, safeArea = true }) => {
  const content = <View style={[styles.container, style]}>{children}</View>;

  if (safeArea && Platform.OS !== 'web') {
    return <SafeAreaView style={styles.safeArea}>{content}</SafeAreaView>;
  }

  return <View style={[styles.safeArea, style]}>{content}</View>;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    minHeight: '100vh',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
});

export default Container;
