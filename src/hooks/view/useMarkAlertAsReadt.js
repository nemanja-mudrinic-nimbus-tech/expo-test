import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useMarkAlertAsRead() {
  const markAsRead = async (alertId) => {
    try {
      const storedIds = await AsyncStorage.getItem('alerts');
      let value = {};
      if (storedIds) {
        value = JSON.parse(storedIds);
      }

      if (value[alertId]) {
        return;
      }
      value[alertId] = true;
      await AsyncStorage.setItem('alerts', JSON.stringify(value));
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  return markAsRead;
}
