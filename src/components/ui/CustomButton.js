import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/colors';

export default function CustomButton({
  title,
  style,
  onPress,
  disabled = false,
}) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.7}>
      <View
        style={[styles.root, style ? style : {}, disabled && styles.disabled]}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.main,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
  },
  disabled: {
    backgroundColor: 'gray',
  },
});
