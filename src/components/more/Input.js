import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/colors';

export default function Input({
  label,
  type = 'default',
  style,
  multiline = false,
  setState,
  error = false,
  value,
}) {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        autoCapitalize="none"
        keyboardType={type}
        multiline={multiline}
        onChangeText={text => setState?.(text)}
        value={value}
      />
      {error && (
        <Text style={styles.error}>
          {type === 'email-address'
            ? 'Please enter a valid email'
            : 'This field is required'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.secondaryTextColor,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontSize: 13,
    color: COLORS.secondaryTextColor,
    marginBottom: 2,
  },
  root: {
    marginBottom: 24,
  },
  error: {
    color: 'red',
    marginTop: 2,
  },
});
