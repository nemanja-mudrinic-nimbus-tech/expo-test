import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { useIsFocused } from '@react-navigation/native';

import NavHeader from '../../../components/nav/NavHeader';
import { hideTabOnScroll } from '../../../utils/hideTabOnScroll';
import { tabNavigationAtom } from '../../../atoms/tabNavigationAtom';
import { useGetItems } from '../../../hooks/api/home/useGetItems';
import Typography from '../../../components/ui/Typography';
import PassoverPaidItem from '../../../components/home/passover/PassoverPaidItem';
import { COLORS } from '../../../constants/colors';
import { pageAtom } from '../../../atoms/pageAtom';

export default function PassoverPaidSectionList({ route }) {
  const { category, parentId } = route.params;
  const { data, isLoading } = useGetItems(parentId, category.cat_name, category.cat_name);
  const setTabBarValue = useSetRecoilState(tabNavigationAtom);
  const setPageAtom = useSetRecoilState(pageAtom);

  const isFocused = useIsFocused();

  useEffect(() => {
    setPageAtom((oldPageAtom) => {
      const copy = [...oldPageAtom];
      if (copy.length > 5) {
        copy.pop();
      }
      return [...copy, category.cat_name];
    });
  }, []);

  return (
    <View>
      <NavHeader back={true} dissapearTab={true} />
      {isLoading ? (
        <View style={{ marginTop: '50%' }}>
          <ActivityIndicator size="large" color={COLORS.main} />
        </View>
      ) : (
        <View style={styles.root}>
          <FlatList
            showsVerticalScrollIndicator={false}
            onScroll={(e) => hideTabOnScroll(e, setTabBarValue, isFocused)}
            ListHeaderComponent={<Typography type="title">{category.cat_name}</Typography>}
            data={data}
            keyExtractor={(item, index) => `${item.product_name}-${index}`}
            initialNumToRender={20}
            renderItem={({ item }) => {
              if (!item.product_name) {
                return null;
              }
              return (
                <PassoverPaidItem
                  name={item.product_name}
                  chometz={item.chometz}
                  highlight={item.highlight_color}
                />
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 28,
    paddingVertical: 20,
    marginBottom: 120,
  },
});
