import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import ArrowIcon from '../../assets/svg/more/ArrowIcon';
import {COLORS} from '../../constants/colors';

export default function Submit({onPress}) {
  return (
    <View>
      <Pressable onPress={onPress} style={styles.root}>
        <View style={styles.button}>
          <Text style={styles.text}>Submit</Text>
          <ArrowIcon fill="#fff" />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.main,
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 15,
    marginRight: 10,
  },
});
