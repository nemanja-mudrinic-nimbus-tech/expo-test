import { StyleSheet, View, Platform, Alert, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Network from 'expo-network';
import { getUUID } from './src/utils/getUUID';
import { ApplicationContextProvider } from './src/shared/context/applicationContext';

import { NativeModules } from 'react-native';

// Intercept native function calls
Object.keys(NativeModules).forEach((moduleName) => {
  Object.keys(NativeModules[moduleName]).forEach((methodName) => {
    const originalMethod = NativeModules[moduleName][methodName];

    NativeModules[moduleName][methodName] = (...args) => {
      console.log(`🛠️ Native Call -> Module: ${moduleName}, Method: ${methodName}, Args:`, args);
      captureError(`🛠️ Native Call -> Module: ${moduleName}, Method: ${methodName}, Args:`, {
        args,
      });
      return originalMethod.apply(NativeModules[moduleName], args);
    };
  });
});

// Navigation
import {
  NavigationContainer,
  DefaultTheme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';

// Fonts
import { useFonts } from 'expo-font';

// Constants
import { COLORS } from './src/constants/colors';

// Components
import CustomStatusBar from './src/components/nav/CustomStatusBar';
import axios from 'axios';
import * as Sentry from 'sentry-expo';
import { stackScreenStateAtom } from './src/atoms/stackScreenStateAtom';
import { userUUIDKey } from './src/constants/asyncStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorBoundary from './src/ErrorBoundary';
import { captureError } from './src/utils/CaptureError';
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F8F8F8',
  },
};

import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';

// Catch JS Errors
setJSExceptionHandler((error, isFatal) => {
  console.log('🚨 JS ERROR:', error);
  captureError(error, { isFatal, error });
}, true);

// Catch Native Crashes
setNativeExceptionHandler(
  (errorString) => {
    console.log('🚨 NATIVE CRASH:', errorString);
    captureError('NATIVE CHRASH', { errorString });
  },
  true,
  true
);

if (process.env.EXPO_PUBLIC_NODE_ENV === 'prod') {
  // Sentry.init({
  //   dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  //   enableInExpoDevelopment: true,
  //   debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  //   // attachStacktrace: true, // Ensures full stack trace is sent
  //   // enableNative: true, // Ensures native errors are captured
  //   tracesSampleRate: 1.0, // Captures all transactions (adjust for production)
  // });
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity,
    },
  },
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function AppBody() {
  const [deviceId, setDeviceId] = useState();

  async function fetchData() {
    try {
      const currentDeviceId = await getUUID();
      axios
        .post(`${process.env.EXPO_PUBLIC_BASE_URL}data/init-token`, {
          deviceId: currentDeviceId,
        })
        .then((response) => {
          const data = response.data;
          return AsyncStorage.setItem(userUUIDKey, data.deviceId)
            .then(() => {
              return data.deviceId;
            })
            .then((dev) => {
              setDeviceId(dev);
            });
        });
    } catch (error) {
      console.error(123, error);
    }
  }

  useEffect(() => {
    Network.getNetworkStateAsync().then((state) => {
      if (!state.isConnected) {
        Alert.alert('No internet connection', 'Please check your network settings and try again.');
      }
    });
    fetchData();
  }, []);

  useEffect(() => {
    if (deviceId) {
      register();
    }
  }, [deviceId]);

  async function register() {
    try {
      await registerForPushNotificationsAsync(deviceId);
    } catch (error) {
      console.error(error);
    }
  }

  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();
  const setStackScreenState = useSetRecoilState(stackScreenStateAtom);

  return (
    <View style={styles.container}>
      {/* <Text>Nemanja</Text>

      <Text>Nemanja</Text>
      <Text>Nemanja</Text>
      <Text>Nemanja</Text>
      <Text>Nemanja</Text>
      <Text>Nemanja</Text>
      <Text>Nemanja</Text> */}
      <CustomStatusBar backgroundColor={COLORS.main} barStyle="light-content" />
      <NavigationContainer
        ref={navigationRef}
        theme={MyTheme}
        onReady={() => {
          routeNameRef.current = navigationRef.getCurrentRoute()?.name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.getCurrentRoute()?.name;

          const trackScreenView = (currName) => {
            setStackScreenState((prevState) => ({
              ...prevState,
              isSearchActive: { ...prevState.isSearchActive },
              beforeTabButtonPressScreenName: currName,
            }));
          };

          if (previousRouteName !== currentRouteName) {
            // Save the current route name for later comparison
            routeNameRef.current = currentRouteName;

            trackScreenView(currentRouteName);
          }
        }}
      >
        <MainStack />
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Noto-Sans': require('./src/assets/fonts/NotoSans-Regular.ttf'),
    'Noto-SansBold': require('./src/assets/fonts/NotoSans-Bold.ttf'),
  });
  // const [expoToken, setExpoToken] = useState();

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ErrorBoundary>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <ApplicationContextProvider>
              <AppBody />
            </ApplicationContextProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

async function registerForPushNotificationsAsync(deviceId) {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    // if (finalStatus !== 'granted') {
    //   Alert.alert(
    //     'Access not granted',
    //     'Notifications not enabled go to Settings > Notifications in order to change your preferences.'
    //   );
    //   return;
    // }
    try {
      token = await Notifications.getExpoPushTokenAsync({
        projectId: `${process.env.EXPO_PUBLIC_PROJECT_ID}` || '',
        experienceId: `@${process.env.EXPO_PUBLIC_OWNER}/${process.env.EXPO_PUBLIC_SLUG}}`,
      });

      if (token) {
        await axios
          .post(
            `${process.env.EXPO_PUBLIC_BASE_URL}data/expo-token`,
            {
              deviceId,
              expoToken: token?.data,
            },
            {}
          )
          .catch((err) => {
            if (err?.response?.status !== 409) {
              console.error(err);
              Alert.alert('Error', 'Something went wrong with uploading your notification token.');
            } else {
              return null;
            }
          });
      }
    } catch (e) {
      console.log(e);
      throw new Error('Error generating push token, please try again later.');
    }
  }

  if (!token && Device.isDevice) {
    throw new Error('Error generating push token, please try again later.');
  }
  return token?.data;
}
