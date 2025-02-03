import { View, Text, StyleSheet } from 'react-native';
import { Switch } from 'react-native-switch';
import React from 'react';

export default function ToggleInfo({ text, toggleSwitch, isEnabled }) {
  return (
    <View style={styles.infoBox}>
      <Text style={{ color: 'white' }}>{text}</Text>
      <View>
        <Switch
          barHeight={21}
          onValueChange={toggleSwitch}
          value={isEnabled}
          circleSize={20}
          backgroundActive={'#1890FF'}
          backgroundInactive={'#767577'}
          activeText={''}
          inActiveText={''}
          circleBorderWidth={1}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
});
