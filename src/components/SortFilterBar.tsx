import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Button from './Button';
import { colors } from '../theme/colors';

export type SortOption = 'name' | 'date' | 'purchased';
export type FilterOption = 'all' | 'purchased' | 'unpurchased';

interface SortFilterBarProps {
  sortOption: SortOption;
  filterOption: FilterOption;
  onSortChange: (option: SortOption) => void;
  onFilterChange: (option: FilterOption) => void;
}

const SortFilterBar: React.FC<SortFilterBarProps> = ({
  sortOption,
  filterOption,
  onSortChange,
  onFilterChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Sort by:</Text>
        <View style={styles.options}>
          <TouchableOpacity
            style={[styles.option, sortOption === 'name' && styles.optionActive]}
            onPress={() => onSortChange('name')}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Sort by name"
            accessibilityState={{ selected: sortOption === 'name' }}
          >
            <Text style={[styles.optionText, sortOption === 'name' && styles.optionTextActive]}>
              Name
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, sortOption === 'date' && styles.optionActive]}
            onPress={() => onSortChange('date')}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Sort by date"
            accessibilityState={{ selected: sortOption === 'date' }}
          >
            <Text style={[styles.optionText, sortOption === 'date' && styles.optionTextActive]}>
              Date
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, sortOption === 'purchased' && styles.optionActive]}
            onPress={() => onSortChange('purchased')}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Sort by purchased status"
            accessibilityState={{ selected: sortOption === 'purchased' }}
          >
            <Text style={[styles.optionText, sortOption === 'purchased' && styles.optionTextActive]}>
              Status
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Filter:</Text>
        <View style={styles.options}>
          <TouchableOpacity
            style={[styles.option, filterOption === 'all' && styles.optionActive]}
            onPress={() => onFilterChange('all')}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Show all items"
            accessibilityState={{ selected: filterOption === 'all' }}
          >
            <Text style={[styles.optionText, filterOption === 'all' && styles.optionTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, filterOption === 'unpurchased' && styles.optionActive]}
            onPress={() => onFilterChange('unpurchased')}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Show unpurchased items"
            accessibilityState={{ selected: filterOption === 'unpurchased' }}
          >
            <Text style={[styles.optionText, filterOption === 'unpurchased' && styles.optionTextActive]}>
              To Buy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, filterOption === 'purchased' && styles.optionActive]}
            onPress={() => onFilterChange('purchased')}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Show purchased items"
            accessibilityState={{ selected: filterOption === 'purchased' }}
          >
            <Text style={[styles.optionText, filterOption === 'purchased' && styles.optionTextActive]}>
              Bought
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  options: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionActive: {
    backgroundColor: colors.purple,
    borderColor: colors.purple,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textTertiary,
  },
  optionTextActive: {
    color: colors.textWhite,
  },
});

export default SortFilterBar;

