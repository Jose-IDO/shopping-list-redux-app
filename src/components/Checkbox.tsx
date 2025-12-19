import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import CheckmarkIcon from './icons/CheckmarkIcon';
import { colors } from '../theme/colors';

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
        {checked && <CheckmarkIcon width={14} height={14} color={colors.textWhite} />}
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
    borderColor: colors.purple,
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  checkboxChecked: {
    backgroundColor: colors.purple,
    borderColor: colors.purple,
  },
  label: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  labelChecked: {
    textDecorationLine: 'line-through',
    color: colors.textLight,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Checkbox;

