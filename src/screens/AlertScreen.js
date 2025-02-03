import React, { useEffect, useMemo } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import NavHeader from '../components/nav/NavHeader';
import Category from '../components/home/Category';
import { useGetAlerts } from '../../src/hooks/api/alerts/useGetAlerts';
import Typography from '../../src/components/ui/Typography';
import { COLORS } from '../constants/colors';
import { useGetCategory } from '../../src/hooks/api/home/useGetCategory';
import { useSetRecoilState } from 'recoil';
import { pageAtom } from '../../src/atoms/pageAtom';
import Wrapper from '../../src/components/Wrapper';
import SubCategory from '../../src/components/home/SubCategory';
export default function AlertScreen({ route }) {
  const { data } = useGetAlerts();

  if (!data || data?.length <= 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Typography type="title">No Alerts Available</Typography>
      </View>
    );
  }

  const parentItem = useMemo(() => {
    if (!data?.length) {
      return undefined;
    }

    return data[0];
  }, [data]);

  return (
    <InnerPage
      id={parentItem.category_id}
      title={parentItem.category_name}
      keyword={parentItem.db_keyword}
    />
  );
}

const InnerPage = ({ id, title, keyword }) => {
  const { data, isLoading, isFetching, isError } = useGetCategory(id);

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

  const renderState = () => {
    if (isLoading || isFetching) {
      return (
        <View>
          <ActivityIndicator color={COLORS.main} size="large" />
        </View>
      );
      // TODO: decide what will be the loading state
    }
    if (isError) {
      return <Typography>Failed to fetch categories.</Typography>;
      // TODO: decide what will be the error state
    }
  };

  return (
    <Wrapper back={true}>
      <Typography style={{ marginBottom: 16, textAlign: 'center' }} type="title">
        {title}
      </Typography>
      {data
        ? data.map((sub) => {
            return (
              <SubCategory
                htmlTag={sub?.html_tag}
                key={`${sub[keyword]}-${sub.item_id}`}
                name={sub.name ? sub.name : sub.BrandName}
                id={`${sub[keyword]}`}
                parentID={id}
                icon={sub.BrandIcon}
                dataType={sub.data_type}
              />
            );
          })
        : renderState()}
    </Wrapper>
  );
};
