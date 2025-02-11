import {
  View,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  Platform,
  Image,
  Linking,
} from 'react-native';
import React from 'react';

// Constants
import { COLORS } from '../../constants/colors';
import { PAGES } from '../../constants/pages';

import { shortenString } from '../../utils/shortenString';
import { StackActions, useNavigation } from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import { storeSearchPhrase } from '../../services/search';
import { captureError } from '../../utils/CaptureError';

export default function SingleArticle({ filterSlug, isSearchResult, searchTerm, item, ...props }) {
  const { name, url, type } = props;
  const contentWidth = useWindowDimensions().width - 34;
  const navigation = useNavigation();
  const finalName = shortenString(name, 55);
  const htmlTitle = {
    html: `<span style='font-size: 18px; display: flex; font-weight: 700;'>${finalName}</span>`,
  };
  const getCorrectLabel = () => {
    switch (type) {
      case 'post':
        return 'Article';
      case 'video':
        return 'Video';
      case 'pdf':
        return 'PDF';
      default:
        return 'Article';
    }
  };

  const handleItemPress = () => {
    if (isSearchResult) {
      storeSearchPhrase(searchTerm, name, props);
    }

    try {
      if (Platform.OS === 'android' && type === 'pdf' && url.includes('.pdf')) {
        navigation.dispatch(
          StackActions.push(PAGES.pdfViewer, {
            pdfUrl: url,
          })
        );
        return;
      }
      item.open_in_browser
        ? Linking.openURL(url)
        : navigation.dispatch(
            StackActions.push(PAGES.articlePage, {
              url,
            })
          );
    } catch (error) {
      captureError(error, { article: true});
    }
  };

  const icon = item.article_icon || item.icon;
  return (
    <View style={item.html_tag && { marginBottom: 20 }}>
      <Pressable onPress={handleItemPress}>
        <View style={styles.flex}>
          <View style={styles.title}>
            <RenderHTML contentWidth={contentWidth} source={htmlTitle} defaultTextProps={{style:{ fontWeight: 'bold', fontSize: 18}}}  />
          </View>

          {item.html_tag ? (
            <RenderHTML
              contentWidth={contentWidth}
              source={{ html: item.html_tag }}
              defaultTextProps={{ selectable: true , style: {fontWeight: '700', color: COLORS.labelColor }}}
            />
          ) : item.wp_icon ? (
            <Image source={{ uri: item.wp_icon }} style={{ width: 40, height: 40 }} />
          ) : icon ? (
            <Image source={{ uri: icon }} style={{ width: 40, height: 40 }} />
          ) : (
            <></>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    minHeight: 102,
    marginBottom: 0,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  box: {
    borderRadius: 10,
    minHeight: 70,
    marginBottom: 20,
    backgroundColor: '#FFF',
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Android shadow
    elevation: 3,
  },
  label: {
    backgroundColor: COLORS.orange,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 5,
  },
  title: {
    flex: 1,
  },
  labelText: {
    color: '#E8F3F1',
    textTransform: 'capitalize',
    fontSize: 13,
  },
});
