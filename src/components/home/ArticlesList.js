import {View} from 'react-native';
import React from 'react';
import SingleArticle from '../../components/home/SingleArticle';
import Typography from '../ui/Typography';

export default function ArticlesList({articles}) {
  if (articles.length === 0) {
    return (
      <View>
        <Typography type="subtitle">
          Sorry, we couldn't find any articles that match this search criteria.
        </Typography>
      </View>
    );
  }
  return (
    <View>
      {articles?.map(article => {
        return (
          <SingleArticle
            key={article.article_id}
            id={article.article_id}
            name={article.article_name}
            url={article.url}
            item={article}
            type={article.type ?? article.article_type}
          />
        );
      })}
    </View>
  );
}
