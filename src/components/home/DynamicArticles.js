import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { PAGES } from '../../constants/pages';
import BackSVG from '../../assets/svg/nav-bar/BackSVG';
import { COLORS } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

export default function DynamicArticles({ articles }) {
  const navigation = useNavigation();
  return (
    <View>
      <Pressable
        onPress={() => {
          navigation.navigate(PAGES.articlesList, {
            articles: articles,
          });
        }}
      >
        <View style={styles.articles}>
          <Text style={styles.articleText}>Additional information</Text>
          <View style={styles.arrowIcon}>
            <BackSVG />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  articles: {
    backgroundColor: COLORS.orange,
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
  },
  articleText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 15,
    flex: 1,
  },
  arrowIcon: {
    transform: [{ rotate: '180deg' }],
  },
});
