import { View, StyleSheet, Pressable, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import Typography from '../ui/Typography';
import KosherSVG from '../../assets/svg/main/KosherSVG';
import { StackActions, useNavigation } from '@react-navigation/native';
import { PAGES } from '../../constants/pages';
import { storeSearchPhrase } from '../../services/search';
import SingleArticle from './SingleArticle';
import RenderHTML from 'react-native-render-html';

export default function Category({
  isSearchResult = false,
  filterSlug,
  searchTerm,
  item,
  isAlertsSection = false,
  ...props
}) {
  const { name, id, subCategory, icon, wp_keyword, list_query, db_keyword, articles, dataType } =
    props;
  const navigation = useNavigation();
  const contentWidth = useWindowDimensions().width - 34;

  const handleCategoryPress = () => {
    if (isSearchResult) {
      storeSearchPhrase(searchTerm, name, props);
    }

    if (dataType === 'passover_paid_module') {
      navigation.dispatch(
        StackActions.push(PAGES.passover, {
          title: name,
          id,
        })
      );
      return;
    }

    if (dataType === 'article_group') {
      navigation.dispatch(
        StackActions.push(PAGES.articlesList, {
          id: id,
          title: name,
          wp_keyword: wp_keyword,
          articles: articles ? articles : [],
          dataType: true,
        })
      );
      return;
    }

    // * If it has wp_keyword list out wordpress items
    if (wp_keyword) {
      navigation.dispatch(
        StackActions.push(PAGES.articlesList, {
          id: id,
          title: name,
          wp_keyword: wp_keyword,
          articles: articles ? articles : [],
          parent: item,
        })
      );
      return;
    }
    // * If it has list_query list out subcategories
    if (subCategory && list_query) {
      navigation.dispatch(
        StackActions.push(PAGES.subCategories, {
          id: id,
          title: name,
          keyword: db_keyword,
        })
      );
      return;
    }
    // * If it doesn't have list_query list out items

    if (subCategory && !list_query) {
      navigation.dispatch(
        StackActions.push(PAGES.itemList, {
          parentID: id,
          title: name,
        })
      );
      return;
    }
    navigation.dispatch(
      StackActions.push(PAGES.categories, {
        id: id,
        title: name,
        isAlertsSection,
      })
    );
  };

  if (dataType === 'article') {
    return (
      <View style={{ marginBottom: 16 }}>
        <SingleArticle
          key={item.article_id}
          id={item.article_id}
          name={name || item.article_name}
          url={item.url}
          type={item?.type ?? item?.article_type}
          item={item}
        />
      </View>
    );
  }

  return (
    <View>
      <Pressable onPress={handleCategoryPress}>
        <View style={styles.root}>
          <View style={styles.info}>
            <Typography type="categoryTitle">{name}</Typography>
          </View>
          {item?.type === 'article' && item?.html_tag ? (
            <RenderHTML
              contentWidth={contentWidth}
              source={{ html: item.html_tag }}
              defaultTextProps={{ selectable: true }}
            />
          ) : !icon ? (
            <KosherSVG />
          ) : (
            <Image source={{ uri: icon }} style={{ width: 40, height: 40 }} /> // TODO choose better dimensions
            // <SvgUri
            //   width={40}
            //   height={40}
            //   uri="http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg"
            // />
          )}
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
    backgroundColor: '#FFF',
    borderRadius: 10,
    minHeight: 102,
    marginBottom: 20,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  info: {
    width: '75%',
  },
});
