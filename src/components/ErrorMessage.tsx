import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import CloseIcon from './icons/CloseIcon';
import { colors } from '../theme/colors';

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
          <CloseIcon width={18} height={18} color={colors.error} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
    padding: 12,
    borderRadius: 4,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {
    color: colors.error,
    fontSize: 14,
    flex: 1,
    fontWeight: '500',
  },
  dismissButton: {
    marginLeft: 12,
    padding: 4,
  },
});

export default ErrorMessage;

