import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Wrapper from '../../components/Wrapper';
import Typography from '../../components/ui/Typography';
import Category from '../../components/home/Category';
import { mainCategoriesAtom } from '../../atoms/mainCategoriesAtom';
import SingleArticle from '../../components/home/SingleArticle';
import { pageAtom } from '../../atoms/pageAtom';

export default function Categories({ route }) {
  const { id, title, isAlertsSection } = route.params;
  const [categoriesData, setCategoriesData] = useState([]);
  const [articles, setArticles] = useState([]);
  const [dynamic, setDynamic] = useState(false);
  const data = useRecoilValue(mainCategoriesAtom);
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

  const getCategoryData = useCallback(() => {
    if (isAlertsSection) {
      return;
    }

    if (data) {
      const parentCat = data.find((cat) => cat.category_id === id);

      // * Step 1 => get children
      let catData = data.filter((cat) => cat.parent_id === id);

      setCategoriesData(catData);
      // * Step 2 => check for wp keyword if there is any call for data and put them with articles
      if (parentCat?.wp_keyword) {
        axios
          .get(
            `${process.env.EXPO_PUBLIC_BASE_URL}data/wp-articles?category_id=${parentCat.category_id}`
          )
          .then((res) => {
            setArticles((prev) => {
              [
                ...prev,
                ...res.data.data?.map((x) => ({
                  article_id: x.id,
                  article_name: x.title,
                  url: x.link,
                  html_tag: parentCat.html_tag,
                })),
              ];
            });
          });
      }
      // * Step 3 => look for articles, if there is item_query or children put articles in dynamic articles else list them as children
      if (parentCat.articles) {
        setArticles((prev) => [...prev, ...parentCat.articles]);
      }
      if (
        (parentCat.item_query || catData.length > 0) &&
        (parentCat.articles || parentCat.wp_keyword)
      ) {
        setDynamic(true);
      } else {
        setDynamic(false);
      }
    }
  }, [data, id]);

  useEffect(() => {
    getCategoryData();
  }, [getCategoryData]);
  const renderEmptyState = () => {
    return <Typography>Failed to get categories.</Typography>;
    // TODO: decide what will be the error state
  };

  return (
    <Wrapper back={true}>
      <Typography style={{ marginBottom: 16, textAlign: 'center' }} type="title">
        {title}
      </Typography>
      {categoriesData.length === 0 &&
        articles?.length === 0 &&
        !isAlertsSection &&
        renderEmptyState()}
      {/*{dynamic && <DynamicArticles articles={articles} />}*/}
      {categoriesData.map((category) => {
        return (
          <Category
            key={category.category_id}
            name={category.category_name}
            id={category.category_id}
            subCategory={true}
            icon={category.icon}
            wp_keyword={category.wp_keyword}
            list_query={category.list_query}
            db_keyword={category.db_keyword}
            articles={category?.articles}
            dataType={category.data_type}
            item={category}
          />
        );
      })}
      {!dynamic &&
        articles?.map((article) => {
          return (
            <SingleArticle
              key={article.article_id}
              name={article.article_name}
              id={article.article_id}
              url={article.url}
              item={article}
            />
          );
        })}
      {isAlertsSection && <></>}
    </Wrapper>
  );
}
