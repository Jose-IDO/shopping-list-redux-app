import React from 'react';
import { View, StyleSheet, SafeAreaView, ViewStyle, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '../theme/colors';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  safeArea?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, style, safeArea = true }) => {
  const gradientColors = gradients.primaryToPurple;
  const content = (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.gradient, style]}
    >
      <View style={styles.container}>{children}</View>
    </LinearGradient>
  );

  if (safeArea && Platform.OS !== 'web') {
    return <SafeAreaView style={styles.safeArea}>{content}</SafeAreaView>;
  }

  return <View style={styles.safeArea}>{content}</View>;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    minHeight: '100vh',
  },
  gradient: {
    flex: 1,
    minHeight: '100vh',
  },
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Container;
