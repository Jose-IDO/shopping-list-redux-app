import React from 'react';
import { TextInput, View, Text, StyleSheet, ViewStyle, TextInputProps } from 'react-native';
import { colors } from '../theme/colors';

interface InputProps extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  style,
  editable = true,
  accessibilityLabel,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          !editable && styles.inputDisabled,
          style,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={editable}
        accessible={true}
        accessibilityLabel={accessibilityLabel || label || placeholder}
        accessibilityRole="textbox"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: colors.background,
    minHeight: 44,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.error,
  },
  inputDisabled: {
    backgroundColor: colors.backgroundLight,
    color: colors.textLight,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default Input;

