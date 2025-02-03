import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

import Typography from '../../components/ui/Typography';
import Wrapper from '../../components/Wrapper';
import ArticlesList from '../../components/home/ArticlesList';
import { COLORS } from '../../constants/colors';
import { pageAtom } from '../../atoms/pageAtom';

export default function Articles({ route }) {
  const { articles, title, wp_keyword, id, dataType, parent } = route.params;
  const [allArticles, setAllArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (wp_keyword) {
      setIsLoading(true);
      axios
        .get(`${process.env.EXPO_PUBLIC_BASE_URL}data/wp-articles?category_id=${id}`)
        .then((res) => {
          setIsLoading(false);
          setAllArticles([
            ...articles,
            ...res.data.data?.map((x) => ({
              article_id: x.id,
              article_name: x.title,
              url: x.link,
              type: x?.type,
              html_tag: parent?.html_tag || x?.html_tag,
              article_icon: x?.article_icon,
              wp_keyword: wp_keyword,
              wp_icon: x.wp_icon,
            })),
          ]);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else if (dataType) {
      setIsLoading(true);
      axios
        .get(`${process.env.EXPO_PUBLIC_BASE_URL}data/list-items?category_id=${id}`)
        .then((res) => {
          setIsLoading(false);
          setAllArticles([
            ...articles,
            ...res.data.data?.map((x) => ({
              article_id: x.article_id,
              article_name: x.article_name,
              url: x.url,
              type: x?.article_type,
              html_tag: x?.html_tag,
              article_icon: x?.article_icon,
              wp_keyword: wp_keyword,
            })),
          ]);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      setAllArticles(articles);
    }
  }, [wp_keyword, id, articles]);

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
      <Typography type="title" style={styles.title}>
        {title ? title : 'Additional information'}
      </Typography>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color={COLORS.main} />
        </View>
      ) : (
        <ArticlesList articles={allArticles} />
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
});
