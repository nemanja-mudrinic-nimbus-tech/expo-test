import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import NavHeader from './nav/NavHeader';
import { hideTabOnScroll } from '../utils/hideTabOnScroll';
import { useSetRecoilState } from 'recoil';
import { tabNavigationAtom } from '../atoms/tabNavigationAtom';
import { useIsFocused } from '@react-navigation/native';

// This is a main wrapper for our screens that uses the same header and padding

export default function Wrapper({ children, dissapearTab, back = false }) {
  const setTabBarValue = useSetRecoilState(tabNavigationAtom);
  const isFocused = useIsFocused();
  return (
    <View style={{ flex: 1 }}>
      <NavHeader back={back} />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={500}
        onScroll={(e) => dissapearTab && hideTabOnScroll(e, setTabBarValue, isFocused)}
      >
        <View style={styles.root}>{children}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
    marginBottom: 40,
  },
});
