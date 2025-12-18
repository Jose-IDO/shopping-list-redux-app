import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, KeyboardAvoidingView, Platform, ActivityIndicator, ListRenderItem, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  addItem,
  editItem,
  deleteItem,
  togglePurchased,
  setItems,
  setError,
  clearError,
  setLoading,
} from '../store/slices/shoppingListSlice';
import { loadItemsFromStorage, saveItemsToStorage } from '../utils/storage';
import { RootState } from '../store/store';
import { ShoppingItem } from '../types';
import Container from '../components/Container';
import Button from '../components/Button';
import Input from '../components/Input';
import ItemCard from '../components/ItemCard';
import ErrorMessage from '../components/ErrorMessage';
import Toast from '../components/Toast';
import QuantityInput from '../components/QuantityInput';
import ConfirmDialog from '../components/ConfirmDialog';
import SortFilterBar, { SortOption, FilterOption } from '../components/SortFilterBar';
import SearchBar from '../components/SearchBar';
import StatisticsCard from '../components/StatisticsCard';

const ShoppingListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { items, error, loading } = useSelector((state: RootState) => state.shoppingList);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [itemName, setItemName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [nameError, setNameError] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');
  const [confirmDialogVisible, setConfirmDialogVisible] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('date');
  const [filterOption, setFilterOption] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      saveItems();
    }
  }, [items]);

  const loadItems = async (): Promise<void> => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const savedItems = await loadItemsFromStorage();
      dispatch(setItems(savedItems));
      dispatch(setLoading(false));
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to load shopping list';
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
      showToast('Unable to load your shopping list. Starting with an empty list.', 'error');
      dispatch(setItems([]));
    }
  };

  const saveItems = async (): Promise<void> => {
    try {
      await saveItemsToStorage(items);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to save shopping list';
      dispatch(setError(errorMessage));
      showToast('Unable to save changes. Your data may not persist.', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success'): void => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const resetForm = (): void => {
    setItemName('');
    setQuantity(1);
    setNameError('');
    setEditingItem(null);
    setEditMode(false);
  };

  const openAddModal = (): void => {
    resetForm();
    setModalVisible(true);
  };

  const openEditModal = (item: ShoppingItem): void => {
    setItemName(item.name);
    setQuantity(item.quantity);
    setEditingItem(item);
    setEditMode(true);
    setModalVisible(true);
    setNameError('');
  };

  const closeModal = (): void => {
    setModalVisible(false);
    resetForm();
  };

  const validateForm = (): boolean => {
    if (!itemName.trim()) {
      setNameError('Item name is required');
      return false;
    }
    if (itemName.trim().length < 2) {
      setNameError('Item name must be at least 2 characters');
      return false;
    }
    if (itemName.trim().length > 100) {
      setNameError('Item name must be less than 100 characters');
      return false;
    }
    setNameError('');
    return true;
  };

  const handleSave = (): void => {
    if (!validateForm()) {
      return;
    }

    if (editMode && editingItem) {
      dispatch(editItem({
        id: editingItem.id,
        name: itemName.trim(),
        quantity: quantity,
      }));
      showToast('Item updated successfully');
    } else {
      dispatch(addItem({
        name: itemName.trim(),
        quantity: quantity,
      }));
      showToast('Item added successfully');
    }

    closeModal();
  };

  const handleDelete = (id: string): void => {
    const item = items.find(item => item.id === id);
    setItemToDelete({ id, name: item?.name || 'this item' });
    setConfirmDialogVisible(true);
  };

  const confirmDelete = (): void => {
    if (itemToDelete) {
      dispatch(deleteItem(itemToDelete.id));
      showToast('Item deleted successfully');
      setItemToDelete(null);
    }
    setConfirmDialogVisible(false);
  };

  const cancelDelete = (): void => {
    setConfirmDialogVisible(false);
    setItemToDelete(null);
  };

  const handleTogglePurchased = (id: string): void => {
    dispatch(togglePurchased(id));
  };

  const sortItems = (itemsToSort: ShoppingItem[], sortBy: SortOption): ShoppingItem[] => {
    const sorted = [...itemsToSort];
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'date':
        return sorted.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'purchased':
        return sorted.sort((a, b) => {
          if (a.purchased === b.purchased) return 0;
          return a.purchased ? 1 : -1;
        });
      default:
        return sorted;
    }
  };

  const filterItems = (itemsToFilter: ShoppingItem[], filterBy: FilterOption): ShoppingItem[] => {
    switch (filterBy) {
      case 'purchased':
        return itemsToFilter.filter(item => item.purchased);
      case 'unpurchased':
        return itemsToFilter.filter(item => !item.purchased);
      case 'all':
      default:
        return itemsToFilter;
    }
  };

  const searchItems = (itemsToSearch: ShoppingItem[], query: string): ShoppingItem[] => {
    if (!query.trim()) {
      return itemsToSearch;
    }
    const lowerQuery = query.toLowerCase().trim();
    return itemsToSearch.filter(item =>
      item.name.toLowerCase().includes(lowerQuery)
    );
  };

  const getDisplayedItems = (): ShoppingItem[] => {
    let result = items;
    result = searchItems(result, searchQuery);
    result = filterItems(result, filterOption);
    result = sortItems(result, sortOption);
    return result;
  };

  const renderItem: ListRenderItem<ShoppingItem> = ({ item }) => (
    <ItemCard
      item={item}
      onTogglePurchased={handleTogglePurchased}
      onEdit={openEditModal}
      onDelete={handleDelete}
    />
  );

  const renderEmptyList = (): React.ReactElement => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading your shopping list...</Text>
        </View>
      );
    }

    const hasSearchOrFilter = searchQuery.trim().length > 0 || filterOption !== 'all';
    
    if (hasSearchOrFilter) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items found</Text>
          <Text style={styles.emptySubtext}>
            {searchQuery.trim().length > 0 
              ? `No items match "${searchQuery}"`
              : 'Try adjusting your filters'}
          </Text>
          <Button
            title="Clear Filters"
            onPress={() => {
              setSearchQuery('');
              setFilterOption('all');
            }}
            variant="secondary"
            style={styles.emptyActionButton}
          />
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyText}>Your shopping list is empty</Text>
        <Text style={styles.emptySubtext}>
          Start adding items to your list by tapping the button below
        </Text>
        <Text style={styles.emptyHint}>
          You can add items with names and quantities, then mark them as purchased when you're done shopping
        </Text>
      </View>
    );
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <Text style={styles.title} accessible={true} accessibilityRole="header">
            Shopping List
          </Text>
          <View style={styles.headerInfo}>
            <Text style={styles.subtitle} accessible={true} accessibilityLabel={`Total items: ${items.length}`}>
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </Text>
            {items.length > 0 && (
              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText} accessible={true} accessibilityLabel={`${items.filter(item => !item.purchased).length} items remaining`}>
                  {items.filter(item => !item.purchased).length} remaining
                </Text>
              </View>
            )}
          </View>
        </View>

        {error && (
          <ErrorMessage
            message={error}
            onDismiss={() => dispatch(clearError())}
          />
        )}

        {items.length > 0 && (
          <>
            <StatisticsCard items={items} />
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />
          </>
        )}

        {items.length > 0 && (
          <SortFilterBar
            sortOption={sortOption}
            filterOption={filterOption}
            onSortChange={setSortOption}
            onFilterChange={setFilterOption}
          />
        )}

        <FlatList
          data={getDisplayedItems()}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={styles.listContent}
          accessible={true}
          accessibilityLabel="Shopping list items"
        />

        <Button
          title="Add Item"
          onPress={openAddModal}
          variant="primary"
          style={styles.addButton}
        />

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
          accessible={true}
          accessibilityViewIsModal={true}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={styles.modalContent}>
              <Text style={styles.modalTitle} accessible={true} accessibilityRole="header">
                {editMode ? 'Edit Item' : 'Add Item'}
              </Text>

              <Input
                label="Item Name"
                value={itemName}
                onChangeText={(text) => {
                  setItemName(text);
                  if (nameError) setNameError('');
                }}
                placeholder="Enter item name"
                error={nameError}
                autoCapitalize="words"
                accessibilityLabel="Item name input"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />

              <QuantityInput
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={999}
              />

              <View style={styles.modalActions}>
                <Button
                  title="Cancel"
                  onPress={closeModal}
                  variant="secondary"
                  style={styles.modalButton}
                />
                <Button
                  title={editMode ? 'Update' : 'Add'}
                  onPress={handleSave}
                  variant="primary"
                  style={styles.modalButton}
                />
              </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Toast
          message={toastMessage}
          type={toastType}
          visible={toastVisible}
          onHide={() => setToastVisible(false)}
        />

        <ConfirmDialog
          visible={confirmDialogVisible}
          title="Delete Item"
          message={`Are you sure you want to delete "${itemToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          variant="danger"
        />
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  countBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 8,
  },
  countBadgeText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '600',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyHint: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 32,
    lineHeight: 20,
  },
  emptyActionButton: {
    marginTop: 16,
    minWidth: 150,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  addButton: {
    marginTop: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
});

export default ShoppingListScreen;

