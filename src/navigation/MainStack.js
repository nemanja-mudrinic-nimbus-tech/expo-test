import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useCallback } from 'react';
import { useGetAlerts } from '../hooks/api/alerts/useGetAlerts';
import { useSetRecoilState } from 'recoil';
import { useGetMainCategories } from '../hooks/api/home/useGetMainCategories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { readAlertsKey } from '../constants/asyncStorageKeys';
// Atoms
import { hasAlertsAtom } from '../atoms/hasAlertsAtom';
import { alertsLengthAtom } from '../atoms/alertsLengthAtom';
import { mainCategoriesAtom } from '../atoms/mainCategoriesAtom';
import { useQueryClient } from '@tanstack/react-query';
// Screens
import TabNavigation from './TabNavigation';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { getUUID } from '../utils/getUUID';
import { useAlertCount } from '../../src/hooks/api/alerts/useAlertCount';

// Here you can put screens that you dont want it to have bottom tab navigation.

const Stack = createStackNavigator();
export default function MainStack() {
  const { data } = useGetAlerts();
  const { data: mainData, isLoading, isFetching } = useGetMainCategories('mainStack');
  useAlertCount();

  // Alerts State
  const setHasAlerts = useSetRecoilState(hasAlertsAtom);
  const setAlertsLength = useSetRecoilState(alertsLengthAtom);
  // Categories State
  const setMainCategories = useSetRecoilState(mainCategoriesAtom);

  // Get main categories and put them in global state
  const getMainCategories = useCallback(() => {
    setMainCategories(mainData);
  }, [mainData, setMainCategories]);

  // Getting alerts and storing them
  const storeData = useCallback(async () => {
    await getUUID();
    const readAlerts = await AsyncStorage.getItem(readAlertsKey);
    if (data) {
      setAlertsLength(data.length);
    }
    if (!readAlerts && data) {
      try {
        const jsonValue = JSON.stringify(data.map((alert) => alert.alert_id));
        await AsyncStorage.setItem(readAlertsKey, jsonValue);
      } catch (e) {
        console.error(e);
      }
    }
    if (readAlerts && data) {
      const parsedAlerts = JSON.parse(readAlerts);
      const unreadAlerts = data.filter((alert) => !parsedAlerts.includes(alert.alert_id));
      if (unreadAlerts.length !== 0) {
        setHasAlerts(true);
      } else {
        setHasAlerts(false);
      }
    }
  }, [data, setHasAlerts, setAlertsLength]);

  useEffect(() => {
    storeData();
    getMainCategories();
  }, [storeData, getMainCategories]);

  if (isLoading || isFetching) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.main} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      id="MainStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
    </Stack.Navigator>
  );
}
