import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface ErrorMessageProps {
  message: string | null;
  onDismiss?: () => void;
  style?: ViewStyle;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss, style }) => {
  if (!message) return null;

  return (
    <View
      style={[styles.container, style]}
      accessible={true}
      accessibilityRole="alert"
      accessibilityLabel={`Error: ${message}`}
    >
      <Text style={styles.message}>{message}</Text>
      {onDismiss && (
        <TouchableOpacity
          onPress={onDismiss}
          style={styles.dismissButton}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Dismiss error"
        >
          <Text style={styles.dismissText}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFEBEE',
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
    padding: 12,
    borderRadius: 4,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {
    color: '#C62828',
    fontSize: 14,
    flex: 1,
  },
  dismissButton: {
    marginLeft: 12,
    padding: 4,
  },
  dismissText: {
    color: '#C62828',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ErrorMessage;

