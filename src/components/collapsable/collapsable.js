import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

const CollapseContainer = ({ children, expanded }) => {
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event) => {
    const layoutHeight = event.nativeEvent.layout.height;
    if (layoutHeight > 0 && height !== layoutHeight) {
      setHeight(layoutHeight);
    }
  };

  useEffect(() => {
    if (height !== null) {
      animatedHeight.value = expanded ? withTiming(height) : withTiming(0);
    }
  }, [expanded, height, animatedHeight]);

  const collapseStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
  }));

  return (
    <Animated.View style={[collapseStyle, { overflow: 'hidden' }]}>
      <View style={{ position: 'absolute', width: '100%' }} onLayout={onLayout}>
        {children}
      </View>
    </Animated.View>
  );
};

export default CollapseContainer;
