import {View, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React from 'react';

export default function CustomStatusBar({backgroundColor, ...props}) {
  const insets = useSafeAreaInsets();
  const STATUSBAR_HEIGHT = insets.top;
  return (
    <View style={[{height: STATUSBAR_HEIGHT}, {backgroundColor}]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
