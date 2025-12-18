import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import Checkbox from './Checkbox';
import { ShoppingItem } from '../types';

interface ItemCardProps {
  item: ShoppingItem;
  onTogglePurchased: (id: string) => void;
  onEdit: (item: ShoppingItem) => void;
  onDelete: (id: string) => void;
  disabled?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ 
  item, 
  onTogglePurchased, 
  onEdit, 
  onDelete, 
  disabled = false 
}) => {
  return (
    <View
      style={[styles.card, item.purchased && styles.cardPurchased]}
      accessible={true}
      accessibilityRole="listitem"
      accessibilityLabel={`${item.name}, quantity ${item.quantity}, ${item.purchased ? 'purchased' : 'not purchased'}`}
    >
      <View style={styles.content}>
        <Checkbox
          checked={item.purchased}
          onPress={() => onTogglePurchased(item.id)}
          disabled={disabled}
          accessibilityLabel={`Mark ${item.name} as ${item.purchased ? 'not purchased' : 'purchased'}`}
        />
        <View style={styles.itemInfo}>
          <Text style={[styles.itemName, item.purchased && styles.itemNamePurchased]}>
            {item.name}
          </Text>
          <Text style={[styles.itemQuantity, item.purchased && styles.itemQuantityPurchased]}>
            Qty: {item.quantity}
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Button
          title="Edit"
          onPress={() => onEdit(item)}
          variant="secondary"
          style={styles.actionButton}
          disabled={disabled}
        />
        <Button
          title="Delete"
          onPress={() => onDelete(item.id)}
          variant="danger"
          style={styles.actionButton}
          disabled={disabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardPurchased: {
    opacity: 0.7,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemNamePurchased: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  itemQuantityPurchased: {
    color: '#999',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
});

export default ItemCard;

