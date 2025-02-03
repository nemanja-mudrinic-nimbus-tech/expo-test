import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import React, { useState } from 'react';
import { View } from 'react-native';

const CollapseContainer = ({ children, expanded }) => {
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapseStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height) : withTiming(0);
    return {
      height: animatedHeight.value,
    };
  }, [expanded]);

  return (
    <Animated.View style={[collapseStyle, { overflow: 'scroll' }]}>
      <View style={{ position: 'absolute', width: '100%' }} onLayout={onLayout}>
        {children}
      </View>
    </Animated.View>
  );
};

export default CollapseContainer;
