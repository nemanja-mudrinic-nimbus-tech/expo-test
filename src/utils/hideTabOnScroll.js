let scroll = 0;
export const hideTabOnScroll = (e, setTabBarValue, isFocused) => {
  let contentOffsetY = e.nativeEvent.contentOffset.y;
  const diff = contentOffsetY - scroll;
  if (diff < 0 || contentOffsetY <= 0) {
    setTabBarValue(true);
  } else {
    setTabBarValue(false);
  }
  if (!isFocused) {
    setTabBarValue(true);
  }
  scroll = contentOffsetY;
};
