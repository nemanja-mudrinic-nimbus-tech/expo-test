import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import * as Network from 'expo-network';
import {COLORS} from '../../constants/colors';

export default function NoInternet({setIsConnected}) {
  return (
    <View style={styles.root}>
      <Text selectable style={styles.text}>
        No Internet connection. Make sure Wi-Fi or cellural data is turned on,
        then try again.
      </Text>
      <Pressable
        style={styles.button}
        onPress={async () => {
          const result = await Network.getNetworkStateAsync();
          setIsConnected(result.isConnected);
        }}>
        <Text style={styles.buttonText}>Retry</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: COLORS.main,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
