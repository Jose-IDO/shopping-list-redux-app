import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
  disabled?: boolean;
  accessibilityLabel?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  checked, 
  onPress, 
  label, 
  disabled = false, 
  accessibilityLabel 
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={accessibilityLabel || label}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <View style={styles.checkmark} />}
      </View>
      {label && <Text style={[styles.label, checked && styles.labelChecked]}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    width: 6,
    height: 10,
    borderColor: '#FFF',
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    transform: [{ rotate: '45deg' }],
    marginTop: -2,
  },
  label: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  labelChecked: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Checkbox;

