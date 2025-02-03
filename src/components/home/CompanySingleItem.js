import { View, StyleSheet, Pressable, Linking } from 'react-native';
import React from 'react';
import Typography from '../ui/Typography';
import { COLORS } from '../../constants/colors';
import { StackActions, useNavigation } from '@react-navigation/native';
import { PAGES } from '../../constants/pages';
import { storeSearchPhrase } from '../../services/search';
import CollapseContainer from '../collapsable/collapsable';
import CustomButton from '../ui/CustomButton';

export default function CompanySingleItem({
  filterSlug,
  isSearchResult = false,
  searchTerm,
  ...props
}) {
  const { name, address, urlLoc, state_code, city, postal, country, phone } = props;
  const navigation = useNavigation();
  const handleItemPress = () => {
    if (isSearchResult) {
      storeSearchPhrase(searchTerm, name, props);
    }

    navigation.dispatch(
      StackActions.push(PAGES.companyPage, {
        name,
        address,
        urlLoc,
        state_code,
        city,
        postal,
        country,
        phone,
      })
    );
  };

  const openPhone = () => {
    const url = `tel:${phone}`;
    Linking.openURL(url).catch((e) => console.error(e));
  };
  const openLetter = () => {
    Linking.openURL(urlLoc).catch((e) => console.error(e));
  };

  return (
    <View>
      <View style={styles.box}>
        <View style={styles.title}>
          <Typography style={{ alignSelf: 'flex-start' }} type="categoryTitle">
            {name}
          </Typography>
        </View>
        <View style={styles.collapsedBox}>
          <CollapseContainer expanded={expanded}>
            <View style={[styles.buttons, urlLoc && phone ? styles.twoButtons : {}]}>
              {phone && (
                <CustomButton
                  style={urlLoc ? styles.phoneButton : {}}
                  title={phone}
                  onPress={openPhone}
                />
              )}
              {urlLoc && (
                <CustomButton
                  style={styles.letterButton}
                  title="View Letter"
                  onPress={openLetter}
                />
              )}
            </View>
          </CollapseContainer>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.mainLight,
    borderRadius: 10,
    minHeight: 70,
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 17,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
  },
});
