import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ShoppingItem } from '../types';
import { colors } from '../theme/colors';

interface StatisticsCardProps {
  items: ShoppingItem[];
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ items }) => {
  const totalItems = items.length;
  const purchasedItems = items.filter(item => item.purchased).length;
  const remainingItems = totalItems - purchasedItems;
  const completionPercentage = totalItems > 0 
    ? Math.round((purchasedItems / totalItems) * 100) 
    : 0;

  return (
    <View 
      style={styles.container}
      accessible={true}
      accessibilityRole="summary"
      accessibilityLabel={`Shopping list statistics: ${totalItems} total items, ${purchasedItems} purchased, ${remainingItems} remaining`}
    >
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{totalItems}</Text>
        <Text style={styles.statLabel}>Total Items</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.statItem}>
        <Text style={[styles.statValue, styles.purchasedValue]}>{purchasedItems}</Text>
        <Text style={styles.statLabel}>Purchased</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.statItem}>
        <Text style={[styles.statValue, styles.remainingValue]}>{remainingItems}</Text>
        <Text style={styles.statLabel}>Remaining</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.statItem}>
        <Text style={[styles.statValue, styles.percentageValue]}>{completionPercentage}%</Text>
        <Text style={styles.statLabel}>Complete</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  purchasedValue: {
    color: colors.success,
  },
  remainingValue: {
    color: colors.warning,
  },
  percentageValue: {
    color: colors.blue,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: 8,
  },
});

export default StatisticsCard;

