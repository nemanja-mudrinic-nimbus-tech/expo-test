import { ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import Category from './Category';
import Typography from '../ui/Typography';
import { useGetMainCategories } from '../../hooks/api/home/useGetMainCategories';
import { COLORS } from '../../constants/colors';
import { pageAtom } from '../../atoms/pageAtom';

export default function MainCategories() {
  const { data, isLoading, isError, isFetching, isRefetching } =
    useGetMainCategories('home');

  const setPageAtom = useSetRecoilState(pageAtom);

  useEffect(() => {
    setPageAtom((oldPageAtom) => {
      const copy = [...oldPageAtom];
      if (copy.length > 5) {
        copy.pop();
      }
      return [...copy, 'Home'];
    });
  }, []);

  if (isLoading || isFetching || isRefetching) {
    return <ActivityIndicator color={COLORS.main} size="large" />;
  }
  if (isError) {
    return <Typography>Failed to get data, please try again later.</Typography>;
  }

  return (
    <>
        <Typography style={{ marginBottom: 16, textAlign: 'center' }} type="title">
          Home
        </Typography>
        {data
          .filter((cat) => cat.parent_id === null)
          .map((category) => {
            return (
              <Category
                key={category.category_id}
                name={category.category_name}
                id={category.category_id}
                icon={category.icon}
                dataType={category.data_type}
                item={category}
              />
            );
          })}
    </>
  );
}
