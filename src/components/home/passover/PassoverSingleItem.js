import { View, Pressable, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import Typography from '../../ui/Typography';
import { COLORS } from '../../../constants/colors';
import { PAGES } from '../../../constants/pages';
import { StackActions, useNavigation } from '@react-navigation/native';
import { shortenString } from '../../../utils/shortenString';
import { storeSearchPhrase } from '../../../services/search';
import CollapseContainer from '../../collapsable/collapsable';
import TextInfoBox from '../../collapsable/TextInfoBox';

// THIS IS FREE PASSOVER ITEM THAT WE SHOW
export default function PassoverSingleItem({
  filterSlug,
  isSearchResult = false,
  searchTerm,
  ...props
}) {
  const { category_name, brand, product_name, description, kashrus_notes, is_chometz, name } =
    props;
  const navigation = useNavigation();
  const finalName = shortenString(product_name, 45);
  const finalBrand = shortenString(brand, 30);

  const [expanded, setExpanded] = useState(false);
  const [isApproved, setIsApproved] = useState('');

  const onItemPress = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (is_chometz == '1') {
      setIsApproved('Chometz');
    } else setIsApproved('Not Chometz');
  }, [is_chometz]);

  const handleItemPress = () => {
    if (isSearchResult) {
      storeSearchPhrase(searchTerm, name, props);
    }

    return;
  };

  return (
    <View>
      <Pressable onPress={handleItemPress}>
        <View style={styles.box}>
          {brand ? (
            <View style={styles.brandTitle}>
              <Typography type="categoryTitle">{finalName}</Typography>
              <Text>{finalBrand}</Text>
            </View>
          ) : (
            <View style={styles.title}>
              <Typography style={{ alignSelf: 'flex-start' }} type="categoryTitle">
                {name ? finalName : brand}
              </Typography>
            </View>
          )}
          <View style={styles.collapsedBox}>
            <CollapseContainer expanded={expanded}>
              {description && <TextInfoBox title="Description" text={description} />}
              {kashrus_notes && <TextInfoBox title="Kashrus Notes" text={kashrus_notes} />}
              {product_name?.length > 45 && <TextInfoBox title="Description" text={product_name} />}
              {brand?.length > 30 && <TextInfoBox title="Kashrus Notes" text={brand} />}
            </CollapseContainer>
          </View>

          <View style={styles.kosherSection}>
            <Text style={!is_chometz ? styles.approvedText : styles.notApprovedText}>
              {isApproved}
            </Text>
            <>
              {kashrus_notes || description || product_name?.length > 45 || brand?.length > 30 ? (
                <TouchableWithoutFeedback onPress={onItemPress}>
                  {!expanded ? (
                    <Text style={{ color: '#2F718F' }}>Important Info {'>>'} </Text>
                  ) : (
                    <Text style={{ color: '#2F718F' }}>Close {'<<'} </Text>
                  )}
                </TouchableWithoutFeedback>
              ) : (
                <></>
              )}
            </>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    minHeight: 70,
    marginBottom: 20,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    border: '1px solid',
    // Android shadow
    elevation: 3,
  },
  title: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 70,
    paddingHorizontal: 16,
  },
  approved: {
    color: COLORS.green,
    fontWeight: '700',
    marginLeft: 5,
  },
  not_approved: {
    color: COLORS.error,
    fontWeight: '700',
    marginLeft: 5,
  },
  brandTitle: {
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  kosherSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 50,
    borderTopColor: COLORS.lightGray,
    borderTopWidth: 1,
  },
  collapsedBox: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  approvedText: {
    color: COLORS.green,
  },
  notApprovedText: {
    color: COLORS.error,
  },
});
