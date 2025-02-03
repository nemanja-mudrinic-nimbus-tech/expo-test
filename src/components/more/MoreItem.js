import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import Typography from '../ui/Typography';
import ArrowIcon from '../../assets/svg/more/ArrowIcon';

export default function MoreItem({ svg, title, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.root}>
        <View style={styles.svg}>{svg}</View>
        <Typography type="subtitle" style={styles.title}>
          {title}
        </Typography>
        <ArrowIcon />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    flex: 1,
    marginLeft: 10,
  },
  svg: {
    width: 22,
  },
});
