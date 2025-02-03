import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants/colors';

export default function Typography({ type, children, style }) {
  return (
    <Text selectable style={[styles.common, type && styles[type], style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  common: {
    fontFamily: 'Noto-Sans',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: COLORS.mainTextColor,
    fontFamily: 'Noto-SansBold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.mainTextColor,
    fontFamily: 'Noto-SansBold',
  },
  categoryTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: COLORS.mainTextColor,
    fontFamily: 'Noto-SansBold',
  },
  filterBox: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    color: COLORS.main,
  },
  filterBoxSelect: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#fff',
  },
});
