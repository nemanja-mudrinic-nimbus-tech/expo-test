import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetRecoilState } from 'recoil';
import { useIsFocused } from '@react-navigation/native';

import SingleAlert from './SingleAlert';
import Typography from '../ui/Typography';
import { COLORS } from '../../constants/colors';
import { hideTabOnScroll } from '../../utils/hideTabOnScroll';
import { tabNavigationAtom } from '../../atoms/tabNavigationAtom';
import { pageAtom } from '../../atoms/pageAtom';
import { hasAlertsAtom } from '../../atoms/hasAlertsAtom';
import { readAlertsKey } from '../../constants/asyncStorageKeys';

export default function AlertList({ data, isError, isLoading, isFetching, refetch, isFetching }) {
  const setTabBarValue = useSetRecoilState(tabNavigationAtom);
  const setHasAlerts = useSetRecoilState(hasAlertsAtom);
  const [readAlerts, setReadAlerts] = useState([]);
  const isFocused = useIsFocused();

  const getReadAlerts = useCallback(async () => {
    const alerts = await AsyncStorage.getItem(readAlertsKey);
    const parsedAlerts = JSON.parse(alerts);
    setReadAlerts(parsedAlerts);
    if (data) {
      const unreadAlerts = data.filter((alert) => !parsedAlerts.includes(alert.alert_id));
      unreadAlerts.length !== 0 ? setHasAlerts(true) : setHasAlerts(false);
    }
  }, [data, setHasAlerts]);

  const setPageAtom = useSetRecoilState(pageAtom);

  useEffect(() => {
    setPageAtom((oldPageAtom) => {
      const copy = [...oldPageAtom];
      if (copy.length > 5) {
        copy.pop();
      }
      return [...copy, 'Alerts'];
    });
  }, []);

  useEffect(() => {
    getReadAlerts();
  }, [isFocused, getReadAlerts]);

  const renderItem = useCallback(
    ({ item }) => {
      if (!item.alert_title) {
        return null;
      }
      return (
        <SingleAlert
          key={item.alert_id}
          title={item.alert_title}
          desc={item.alert_description_short}
          date={item.alert_eventdate}
          id={item.alert_id}
          read={readAlerts.includes(item.alert_id)}
        />
      );
    },
    [readAlerts]
  );
  const memoizedReturnItem = useMemo(() => renderItem, [renderItem]);

  if (isLoading || isFetching || isRefetching) {
    return <ActivityIndicator color={COLORS.main} size="large" />;
  }
  if (isError) {
    return <Typography>Failed to fetch alerts.</Typography>;
  }
  return (
    <View style={styles.root}>
      <FlatList
        ListHeaderComponent={
          <Typography type="title" style={styles.title}>
            Alerts
          </Typography>
        }
        showsVerticalScrollIndicator={false}
        onScroll={(e) => hideTabOnScroll(e, setTabBarValue, isFocused)}
        data={data}
        keyExtractor={(item) => item.alert_id}
        initialNumToRender={20}
        renderItem={memoizedReturnItem}
        removeClippedSubviews={true} // Can be risky but it will improve performance
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={COLORS.main} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  root: {
    paddingBottom: 40,
    marginBottom: 70,
  },
});
