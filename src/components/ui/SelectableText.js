import {View, Text, Platform, TextInput} from 'react-native';
import React from 'react';

export default function SelectableText({value, style}) {
  return (
    <View>
      {Platform.OS === 'ios' ? (
        <TextInput
          style={style}
          value={value}
          editable={false}
          multiline
          scrollEnabled={false}
        />
      ) : (
        <Text style={style} selectable>
          {value}
        </Text>
      )}
    </View>
  );
}
