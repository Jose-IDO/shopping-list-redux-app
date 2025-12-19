import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import MinusIcon from './icons/MinusIcon';
import PlusIcon from './icons/PlusIcon';
import { colors } from '../theme/colors';

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  style?: ViewStyle;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ 
  value, 
  onChange, 
  min = 1, 
  max = 999, 
  style 
}) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>Quantity</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={[styles.button, value <= min && styles.buttonDisabled]}
          onPress={handleDecrease}
          disabled={value <= min}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Decrease quantity"
        >
          <MinusIcon width={20} height={20} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
        </View>
        <TouchableOpacity
          style={[styles.button, value >= max && styles.buttonDisabled]}
          onPress={handleIncrease}
          disabled={value >= max}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Increase quantity"
        >
          <PlusIcon width={20} height={20} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundLight,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  valueContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    minHeight: 44,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
});

export default QuantityInput;

