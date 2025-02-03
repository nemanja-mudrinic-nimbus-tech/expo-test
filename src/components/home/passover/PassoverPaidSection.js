import { View, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';

import { PAGES } from '../../../constants/pages';
import Typography from '../../ui/Typography';
import { COLORS } from '../../../constants/colors';

export default function PassoverPaidSection({ data, parentId }) {
  const navigation = useNavigation();

  const navigateToCategory = (category) => {
    navigation.navigate(PAGES.passoverPaidSectionList, {
      category,
      parentId,
    });
  };

  const contentWidth = useWindowDimensions().width - 34;

  return (
    <View>
      {data?.map((category, index) => {
        return (
          <Pressable
            onPress={() => {
              navigateToCategory(category);
            }}
            key={index}
          >
            <View style={styles.box}>
              <Typography type="categoryTitle" style={styles.title}>
                {category.cat_name}
              </Typography>
              {category.html_tag && (
                <RenderHTML
                  contentWidth={contentWidth}
                  source={{ html: category.html_tag }}
                  defaultTextProps={{ selectable: true }}
                />
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.mainLight,
    borderRadius: 10,
    minHeight: 70,
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 17,
    flexDirection: 'row',

    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Android shadow
    elevation: 3,
  },
  title: {
    flex: 1,
  },
});
