import React from 'react';
import { StyleSheet, View } from 'react-native';

import NavHeader from '../../components/nav/NavHeader';
import AlertScreen from '../AlertScreen';

export default function Alerts() {
  return (
    <View>
      <NavHeader back={true} />
      <View style={styles.root}>
        <AlertScreen />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
});
