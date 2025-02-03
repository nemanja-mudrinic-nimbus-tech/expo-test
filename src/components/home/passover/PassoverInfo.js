import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function PassoverInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unfortunately, This App Doesn't Support In-App Purchases</Text>
      <Text style={styles.text}>
        We're sorry, but in-app purchases are not available in this version of the app. However,
        we're working hard to bring this feature to you soon, so stay tuned for updates!
        {'\n\n\n'}
        Thank you for understanding!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
  },
});
