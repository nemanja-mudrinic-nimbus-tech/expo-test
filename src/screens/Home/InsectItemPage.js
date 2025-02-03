import { View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import Wrapper from '../../components/Wrapper';
import Typography from '../../components/ui/Typography';
import RenderHTML from 'react-native-render-html';
import { COLORS } from '../../constants/colors';
import { pageAtom } from '../../atoms/pageAtom';

export default function InsectItemPage({ route }) {
  const { title, icon, html } = route.params;
  const contentWidth = useWindowDimensions().width;
  const setPageAtom = useSetRecoilState(pageAtom);

  useEffect(() => {
    setPageAtom((oldPageAtom) => {
      const copy = [...oldPageAtom];
      if (copy.length > 5) {
        copy.pop();
      }
      return [...copy, title];
    });
  }, []);

  return (
    <Wrapper back={true}>
      <View style={styles.header}>
        <Image
          source={{
            uri: icon,
          }}
          style={styles.image}
        />
        <Typography style={styles.title}>{title}</Typography>
      </View>
      <RenderHTML
        contentWidth={contentWidth}
        source={{ html: html }}
        defaultTextProps={{ selectable: true }}
      />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.mainTextColor,
    fontFamily: 'Noto-SansBold',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
});
