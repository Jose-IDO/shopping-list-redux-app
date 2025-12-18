import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingItem } from '../types';

const STORAGE_KEY = '@shopping_list_items';

export const saveItemsToStorage = async (items: ShoppingItem[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(items);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    throw new Error('Failed to save items to storage');
  }
};

export const loadItemsFromStorage = async (): Promise<ShoppingItem[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    throw new Error('Failed to load items from storage');
  }
};

