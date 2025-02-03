import { View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { useGetCategory } from '../../hooks/api/home/useGetCategory';
import { COLORS } from '../../constants/colors';
import Typography from '../../components/ui/Typography';
import Wrapper from '../../components/Wrapper';
import SubCategory from '../../components/home/SubCategory';
import { pageAtom } from '../../atoms/pageAtom';

export default function SubCategories({ route }) {
  const { id, title, keyword } = route.params;
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
            if (keyword === 'liquor_type') {
              return (
                <SubCategory
                  htmlTag={sub?.html_tag}
                  key={sub.item_id}
                  name={sub.liquor_type}
                  id={sub[keyword]}
                  parentID={id}
                  icon={sub.BrandIcon}
                  certification={{
                    status: sub.item_certificationstatus,
                    info: sub.item_excludinginfo,
                  }}
                />
              );
            }
            return (
              <SubCategory
                htmlTag={sub?.html_tag}
                key={`${sub[keyword]}-${sub.item_id}`}
                name={sub.name ? sub.name : sub.BrandName}
                id={`${sub[keyword]}`}
                parentID={id}
                icon={sub.BrandIcon}
              />
            );
          })
        : renderState()}
    </Wrapper>
  );
}
