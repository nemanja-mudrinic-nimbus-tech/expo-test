import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export function useReadAlerts() {
  const getAlerts = async () => {
    const storedIds = await AsyncStorage.getItem('alerts');
    if (storedIds) {
      return JSON.parse(storedIds);
    }
    return {};
  };

  return getAlerts;
}
