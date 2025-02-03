import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import React, { useEffect, useCallback, useState } from 'react';
import { COLORS } from '../../constants/colors';
import SingleItem from './SingleItem';
import Typography from '../ui/Typography';
import { useGetItems } from '../../hooks/api/home/useGetItems';
import { hideTabOnScroll } from '../../utils/hideTabOnScroll';
import { useSetRecoilState } from 'recoil';
import { tabNavigationAtom } from '../../atoms/tabNavigationAtom';
import { useIsFocused } from '@react-navigation/native';
import CompanySingleItem from './CompanySingleItem';
import PassoverSingleItem from './passover/PassoverSingleItem';
import CerealItem from './CerealItem';
import { pageAtom } from '../../atoms/pageAtom';
import SingleAlert from './../alerts/SingleAlert';
import { useReadAlerts } from '../../../src/hooks/view/useReadAlerts';
export default function List({ listID, catName, parentID, certification, dataType }) {
  const setTabBarValue = useSetRecoilState(tabNavigationAtom);

  const { data, isLoading, isError, isFetching } = useGetItems(parentID, listID, catName);
  const isFocused = useIsFocused();

  const fnReadAlerts = useReadAlerts();
  const [readAlert, setReadAlerts] = useState({});

  useEffect(() => {
    (async () => {
      const a = await fnReadAlerts();
      setReadAlerts(a);
    })();
  }, []);

  const setPageAtom = useSetRecoilState(pageAtom);

  useEffect(() => {
    setPageAtom((oldPageAtom) => {
      const copy = [...oldPageAtom];
      if (copy.length > 5) {
        copy.pop();
      }
      return [...copy, catName];
    });
  }, []);

  if (isLoading || isFetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={COLORS.main} size="large" />
      </View>
    );
    // TODO: decide what will be the loading state
  }

  if (isError) {
    return <Typography>Failed to fetch, try again later.</Typography>;
    // TODO: decide what will be the error state
  }
  if (
    data.filter((item) => {
      if (item.kashrus_notes || item.kashrus_notes === '') {
        if (item.product_name !== '') {
          return true;
        } else {
          return false;
        }
      }
      return true;
    }).length === 0
  ) {
    return (
      <View>
        <View>
          <Typography style={{ marginBottom: 16, textAlign: 'center' }} type="title">
            {catName}
          </Typography>

          {certification && certification.info && (
            <View style={{ marginBottom: 20 }}>
              <Typography type="subtitle">{certification.status}</Typography>
              <Text selectable style={styles.info}>
                {certification.info}
              </Text>
            </View>
          )}
        </View>
        <Typography>No items found.</Typography>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <FlatList
        initialNumToRender={20}
        onScroll={(e) => hideTabOnScroll(e, setTabBarValue, isFocused)}
        ListHeaderComponent={
          <View>
            <Typography
              type="title"
              style={
                certification ? { marginBottom: 0, textAlign: 'center' } : { textAlign: 'center' }
              }
            >
              {catName}
            </Typography>
            {certification && (
              <View style={{ marginBottom: 20 }}>
                <Typography type="subtitle">{certification.status}</Typography>
                <Text selectable style={styles.info}>
                  {certification.info}
                </Text>
              </View>
            )}
          </View>
        }
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => {
          if (item.item_brocha) {
            return <CerealItem item={item} />;
          }

          if (item?.kashrus_notes || item.kashrus_notes === '') {
            if (item.product_name === '') {
              return null;
            }
            return (
              <PassoverSingleItem
                product_name={item.product_name}
                brand={item.brand}
                category_name={item.category_name}
                is_chometz={item.is_chometz}
                kashrus_notes={item.kashrus_notes}
                description={item.description}
              />
            );
          }
          if (item?.urlLoc || item?.state_code || item?.phone) {
            return (
              <CompanySingleItem
                key={item.id}
                name={item.name}
                id={item.id}
                postal={item.postal}
                state_code={item.state_code}
                address={item.address}
                urlLoc={item.urlLoc}
                phone={item.phone}
                country={item.country}
                city={item.city}
              />
            );
          }

          if (dataType === 'alerts') {
            if (!item.alert_title) {
              return null;
            }
            return (
              <SingleAlert
                key={item.alert_id}
                title={item.alert_title}
                desc={item.alert_description_short}
                date={item.alert_eventdate}
                id={item.alert_id}
                read={!!readAlert[item.alert_id]}
              />
            );
          }
          return (
            <SingleItem
              key={item.id ? item.id : item.ProductID}
              name={item.item_name ? item.item_name : item.ProductName}
              id={item.id ? item.id : item.ProductId}
              brand={item.item_brand ? item.item_brand : item.brandName}
              company={item.item_company}
              footnote={item.item_footNote}
              model={item.ProductModelNumber}
              sabbath={item.productBrandCategorySabbathMode}
              features={item.ProductFeatureDisplay}
              catName={catName}
              icon={item.productCategoryIcon ? item.productCategoryIcon : item.item_imageURL}
              isSabbath={item.ProductType}
              instruction={item.item_instruction}
              att={item.item_attributes}
              thumbnail={item.item_thumbNailURL}
              item_approved={item.item_approved}
              item={item}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 20,
  },
  root: {
    paddingBottom: 115,
  },
  info: {
    color: COLORS.secondaryTextColor,
    fontSize: 13,
  },
});
