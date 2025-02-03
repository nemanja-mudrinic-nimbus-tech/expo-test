import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import PlusIcon from '../../assets/svg/more/PlusIcon';
import {COLORS} from '../../constants/colors';

export default function UploadPhotoButton({onPress}) {
  return (
    <View style={styles.root}>
      <Text style={styles.label}>Upload a photo</Text>
      <Pressable onPress={onPress} style={{width: 152}}>
        <View style={styles.button}>
          <PlusIcon />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderStyle: 'dashed',
    width: 152,
    height: 125,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  label: {
    color: COLORS.secondaryTextColor,
    fontSize: 13,
    marginBottom: 2,
  },
  root: {
    marginBottom: 33,
  },
});
