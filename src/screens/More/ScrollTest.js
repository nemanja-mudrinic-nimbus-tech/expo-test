import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';

// Utils
import {hideTabOnScroll} from '../../utils/hideTabOnScroll';

// Recoil
import {useSetRecoilState} from 'recoil';
import {tabNavigationAtom} from '../../atoms/tabNavigationAtom';
import {COLORS} from '../../constants/colors';
import {useIsFocused} from '@react-navigation/native';

export default function ScrollTest() {
  const setTabBarValue = useSetRecoilState(tabNavigationAtom);
  const isFocused = useIsFocused();
  return (
    <ScrollView
      scrollEventThrottle={500}
      bounces={false}
      onScroll={e => hideTabOnScroll(e, setTabBarValue, isFocused)}>
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 80,
    width: 200,
    backgroundColor: COLORS.main,
    margin: 40,
  },
});
