import { View, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import React from 'react';
import Typography from '../ui/Typography';
import { COLORS } from '../../constants/colors';
import { StackActions, useNavigation } from '@react-navigation/native';
import { PAGES } from '../../constants/pages';
import { storeSearchPhrase } from '../../services/search';
import RenderHTML from 'react-native-render-html';

export default function SubCategory({ filterSlug, isSearchResult = false, searchTerm, ...props }) {
  const { id, name, parentID, certification, htmlTag, dataType } = props;

  const navigation = useNavigation();
  const handleSubCategoryPress = () => {
    if (isSearchResult) {
      storeSearchPhrase(searchTerm, name, props);
    }

    navigation.dispatch(
      StackActions.push(PAGES.itemList, {
        parentID: parentID,
        listID: id,
        title: name,
        certification,
        dataType,
      })
    );
  };

  const contentWidth = useWindowDimensions().width - 34;

  return (
    <View>
      <Pressable onPress={handleSubCategoryPress}>
        <View style={styles.root}>
          <View style={styles.info}>
            <Typography type="categoryTitle" style={{ flex: 1 }}>
              {name}
            </Typography>
            {htmlTag && (
              <RenderHTML
                contentWidth={contentWidth}
                source={{ html: htmlTag }}
                defaultTextProps={{ selectable: true, style: {color: COLORS.main}}}
              />
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: COLORS.mainLight,
    borderRadius: 10,
    minHeight: 70,
    marginBottom: 20,

    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Android shadow
    elevation: 3,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textBox: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: COLORS.labelColor,
  },
});
