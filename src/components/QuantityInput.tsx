import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

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
          <Text style={styles.buttonText}>−</Text>
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
          <Text style={styles.buttonText}>+</Text>
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
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
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
    color: '#333',
  },
});

export default QuantityInput;

