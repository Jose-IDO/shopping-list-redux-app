import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
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
import Container from '../components/Container';
import Button from '../components/Button';
import Input from '../components/Input';
import ItemCard from '../components/ItemCard';
import ErrorMessage from '../components/ErrorMessage';
import Toast from '../components/Toast';
import QuantityInput from '../components/QuantityInput';

const ShoppingListScreen = () => {
  const dispatch = useDispatch();
  const { items, error, loading } = useSelector(state => state.shoppingList);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [nameError, setNameError] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      saveItems();
    }
  }, [items]);

  const loadItems = async () => {
    try {
      dispatch(setLoading(true));
      const savedItems = await loadItemsFromStorage();
      dispatch(setItems(savedItems));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError('Failed to load shopping list'));
      dispatch(setLoading(false));
      showToast('Failed to load shopping list', 'error');
    }
  };

  const saveItems = async () => {
    try {
      await saveItemsToStorage(items);
    } catch (error) {
      dispatch(setError('Failed to save shopping list'));
      showToast('Failed to save shopping list', 'error');
    }
  };

  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const resetForm = () => {
    setItemName('');
    setQuantity(1);
    setNameError('');
    setEditingItem(null);
    setEditMode(false);
  };

  const openAddModal = () => {
    resetForm();
    setModalVisible(true);
  };

  const openEditModal = (item) => {
    setItemName(item.name);
    setQuantity(item.quantity);
    setEditingItem(item);
    setEditMode(true);
    setModalVisible(true);
    setNameError('');
  };

  const closeModal = () => {
    setModalVisible(false);
    resetForm();
  };

  const validateForm = () => {
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

  const handleSave = () => {
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

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
    showToast('Item deleted successfully');
  };

  const handleTogglePurchased = (id) => {
    dispatch(togglePurchased(id));
  };

  const renderItem = ({ item }) => (
    <ItemCard
      item={item}
      onTogglePurchased={handleTogglePurchased}
      onEdit={openEditModal}
      onDelete={handleDelete}
    />
  );

  const renderEmptyList = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading your shopping list...</Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your shopping list is empty</Text>
        <Text style={styles.emptySubtext}>Tap the button below to add items</Text>
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
          <Text style={styles.subtitle} accessible={true}>
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </Text>
        </View>

        {error && (
          <ErrorMessage
            message={error}
            onDismiss={() => dispatch(clearError())}
          />
        )}

        <FlatList
          data={items}
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
          <View style={styles.modalOverlay}>
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
          </View>
        </Modal>

        <Toast
          message={toastMessage}
          type={toastType}
          visible={toastVisible}
          onHide={() => setToastVisible(false)}
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
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

