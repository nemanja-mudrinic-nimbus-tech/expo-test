import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, Easing, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';

// Screens
import HomeStack from './HomeStack';
import AlertsStack from './AlertsStack';
import MoreStack from './MoreStack';

// Constants
import { PAGES } from '../constants/pages';
import { COLORS } from '../constants/colors';

// SVGs
import HomeActiveSvg from '../assets/svg/navigation/HomeActiveSvg';
import HomeNoActiveSvg from '../assets/svg/navigation/HomeNoActiveSvg';
import ContactUsNoActive from '../assets/svg/navigation/ContactUsNoActive';
import ContactUsActiveSvg from '../assets/svg/navigation/ContactUsActiveSvg';

import AlertActiveWithIndicator from '../assets/svg/navigation/AlertActiveWithIndicator';
import AlertsActiveSvg from '../assets/svg/navigation/AlertsActiveSvg';
import AlertsNoActiveIndicatorSvg from '../assets/svg/navigation/AlertsNoActiveIndicatorSvg';
import AlertsNoActiveSvg from '../assets/svg/navigation/AlertsNoActiveSvg';

// Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { tabNavigationAtom } from '../atoms/tabNavigationAtom';
import { hasAlertsAtom } from '../atoms/hasAlertsAtom';
import * as Notifications from 'expo-notifications';
import { useNavigation, useRoute } from '@react-navigation/native';
import { stackScreenStateAtom } from '../atoms/stackScreenStateAtom';
import { showSearchContainerAtom } from '../atoms/showSearchContainerAtom';
import { forceRerenderOnSecondTabClickAtom } from '../atoms/forceRerenderOnSecondTabClickAtom';
import { pageAtom } from '../atoms/pageAtom';
import { useReadAlerts } from '../hooks/view/useReadAlerts';

const Tab = createBottomTabNavigator();

function MyTabButton({ onPress, ...props }) {
  const stackScreenState = useRecoilValue(stackScreenStateAtom);
  const setShowSearchContainerMain = useSetRecoilState(showSearchContainerAtom);
  const setForceRerenderOnSecondTabClick = useSetRecoilState(forceRerenderOnSecondTabClickAtom);

  const route = useRoute();
  const screenMapping = useMemo(
    () => ({
      [PAGES.home]: PAGES.homeStack,
      [PAGES.alerts]: PAGES.alertsStack,
      [PAGES.more]: PAGES.moreStack,
    }),
    []
  );
  const reverseScreenMapping = useMemo(
    () => ({
      [PAGES.homeStack]: PAGES.home,
      [PAGES.alertsStack]: PAGES.alerts,
      [PAGES.moreStack]: PAGES.more,
    }),
    []
  );

  const handlePress = useCallback(() => {
    if (
      stackScreenState.isSearchActive[stackScreenState.beforeTabButtonPressScreenName] &&
      screenMapping[stackScreenState.beforeTabButtonPressScreenName] === route.name
    ) {
      // This works only when you are showing the search container on the initial screen.
      // Else when removing the screens from the stack, the unmount component removes the search containers from every other screen.
      setForceRerenderOnSecondTabClick(new Date().valueOf());
    } else if (route.name === stackScreenState.beforeTabButtonPressStackName) {
      setShowSearchContainerMain((prevState) => ({
        ...prevState,
        [reverseScreenMapping[route.name]]: false,
      }));
      setForceRerenderOnSecondTabClick(new Date().valueOf());
    }

    onPress();
  }, [
    onPress,
    stackScreenState,
    screenMapping,
    route.name,
    setForceRerenderOnSecondTabClick,
    reverseScreenMapping,
    setShowSearchContainerMain,
  ]);

  return (
    <View style={styles.tabBarButton}>
      <TouchableOpacity {...props} onPress={handlePress} />
    </View>
  );
}

export default function TabNavigation() {
  const viewRef = useRef(new Animated.Value(78)).current;
  const [tabBarValue, setTabBarValue] = useRecoilState(tabNavigationAtom);

  const navigation = useNavigation();
  const responseListener = useRef(null);
  const route = useRoute();
  const setPageAtom = useSetRecoilState(pageAtom);

  const queryClent = useQueryClient();
  const { active_events_count: alertsLengthAtom } =
    queryClent.getQueryData(['getAlertsCount']) || {};

  const fnReadAlerts = useReadAlerts();
  const [readAlert, setReadAlerts] = useState({});

  useEffect(() => {
    fnReadAlerts().then((a) => {
      setReadAlerts(a);
    });
  }, []);

  useEffect(() => {
    setTabBarValue(true);
  }, [route, setTabBarValue]);

  useEffect(() => {
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      if (response.actionIdentifier === 'expo.modules.notifications.actions.DEFAULT') {
        // Here you should put what you want to do after user clicked on the notification
        navigation.navigate(PAGES.alertsStack);
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [navigation]);

  const tabIcon = (routeName, focused) => {
    switch (routeName) {
      case PAGES.homeStack:
        return focused ? <HomeActiveSvg /> : <HomeNoActiveSvg />;

      case PAGES.alertsStack:
        return focused ? (
          Object.keys(readAlert)?.length < alertsLengthAtom ? (
            <AlertActiveWithIndicator />
          ) : (
            <AlertsActiveSvg />
          )
        ) : Object.keys(readAlert)?.length < alertsLengthAtom ? (
          <AlertsNoActiveIndicatorSvg />
        ) : (
          <AlertsNoActiveSvg />
        );

      case PAGES.moreStack:
        return focused ? <ContactUsActiveSvg /> : <ContactUsNoActive />;
      default:
        return null;
    }
  };

  const setHeightValue = useCallback(() => {
    if (tabBarValue) {
      Animated.timing(viewRef, {
        toValue: 78,
        duration: 400,
        easing: Easing.in(Easing.ease),
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(viewRef, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  }, [tabBarValue, viewRef]);

  useEffect(() => {
    setHeightValue();
  }, [tabBarValue, setHeightValue]);

  const tabBarComponent = (props) => {
    return (
      <Animated.View style={{ height: viewRef }}>
        <BottomTabBar {...props} />
      </Animated.View>
    );
  };

  const [showSearchContainerMain, setShowSearchContainerMain] =
    useRecoilState(showSearchContainerAtom);

  return (
    <Tab.Navigator
      id="TabNavigation"
      tabBar={(props) => tabBarComponent(props)}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => tabIcon(route.name, focused),
        tabBarActiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#2F718F',
          height: 78,
          paddingBottom: 20,
          paddingTop: 15,
        },
        tabBarInactiveTintColor: '#fff',
        tabBarButton: MyTabButton,
      })}
    >
      <Tab.Screen
        name={PAGES.homeStack}
        component={HomeStack}
        options={{ title: 'Home' }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            setPageAtom(() => {
              return ['Home'];
            });
            setShowSearchContainerMain(false);
          },
        })}
      />
      <Tab.Screen
        name={PAGES.alertsStack}
        component={AlertsStack}
        options={{ title: 'Alerts' }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent the default action (this is important!)
            setShowSearchContainerMain(false);
          },
        })}
      />
      <Tab.Screen
        name={PAGES.moreStack}
        component={MoreStack}
        options={{ title: 'Contact Us' }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent the default action (this is important!)
            setShowSearchContainerMain(false);
          },
        })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  alert: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: 1,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  tabBarButton: {
    display: 'flex',
    flex: 1,
  },
});
