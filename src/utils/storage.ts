import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingItem } from '../types';

const STORAGE_KEY = '@shopping_list_items';
const MAX_RETRIES = 3;
const RETRY_DELAY = 500;

const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const validateItems = (items: unknown): items is ShoppingItem[] => {
  if (!Array.isArray(items)) {
    return false;
  }
  return items.every(item => 
    typeof item === 'object' &&
    item !== null &&
    typeof (item as ShoppingItem).id === 'string' &&
    typeof (item as ShoppingItem).name === 'string' &&
    typeof (item as ShoppingItem).quantity === 'number' &&
    typeof (item as ShoppingItem).purchased === 'boolean'
  );
};

export const saveItemsToStorage = async (items: ShoppingItem[], retryCount = 0): Promise<void> => {
  try {
    if (!Array.isArray(items)) {
      throw new Error('Items must be an array');
    }
    
    const jsonValue = JSON.stringify(items);
    
    if (jsonValue.length > 10485760) {
      throw new Error('Data size exceeds storage limit');
    }
    
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      await delay(RETRY_DELAY * (retryCount + 1));
      return saveItemsToStorage(items, retryCount + 1);
    }
    
    const errorMessage = error instanceof Error 
      ? `Failed to save items: ${error.message}` 
      : 'Failed to save items to storage. Please try again.';
    throw new Error(errorMessage);
  }
};

export const loadItemsFromStorage = async (retryCount = 0): Promise<ShoppingItem[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    
    if (jsonValue === null) {
      return [];
    }
    
    const parsed = JSON.parse(jsonValue);
    
    if (!validateItems(parsed)) {
      throw new Error('Invalid data format in storage');
    }
    
    return parsed;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      await delay(RETRY_DELAY * (retryCount + 1));
      return loadItemsFromStorage(retryCount + 1);
    }
    
    if (error instanceof Error && error.message.includes('Invalid data format')) {
      try {
        await AsyncStorage.removeItem(STORAGE_KEY);
      } catch {
      }
      return [];
    }
    
    const errorMessage = error instanceof Error 
      ? `Failed to load items: ${error.message}` 
      : 'Failed to load items from storage. Please try again.';
    throw new Error(errorMessage);
  }
};

