import { View, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import NavHeader from '../../components/nav/NavHeader';
import { COLORS } from '../../constants/colors';
import * as Network from 'expo-network';
import NoInternet from '../../components/ui/NoInternet';
import { captureError, captureMessage } from '../../utils/CaptureError';

export default function ArticlePage({ route }) {
  const { url } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Network.getNetworkStateAsync()
      .then((state) => {
        if (state.isConnected) {
          setConnection(true);
        } else {
          setConnection(false);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        captureError(e, { articlePage: true});
        setIsLoading(false);
      });
  }, []);

  const runFirst = `
  let header = document.getElementById('topwrapper');
  let footer = document.getElementById('footerwrapper');
  let footer2 = document.getElementById('copy');
  
  header.style.display = "none"
  footer.style.display = "none"
  copy.style.display = "none"
  true;
  `;

  const handleOpenURL = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.flex}>
      <NavHeader back={true} />
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator color={COLORS.main} size="large" />
        </View>
      )}
      {connection ? (
        <WebView
          allowsInlineMediaPlayback={true}
          style={[styles.flex, isLoading && styles.hide]}
          source={{ uri: url }}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={(error) => {
            if (Object.keys(error).length > 0) {
              captureMessage(`Article WebView Error: ${JSON.stringify(error, null, 2)}`);
            }
          }}
          injectedJavaScript={runFirst}
          androidHardwareAccelerationDisabled={true}
          androidLayerType={'hardware'}
          onMessage={(event) => {}}
        />
      ) : (
        <NoInternet setIsConnected={setConnection} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hide: {
    display: 'none',
  },
});
