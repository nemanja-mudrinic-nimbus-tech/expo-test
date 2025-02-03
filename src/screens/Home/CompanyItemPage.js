import { View, Linking, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import Wrapper from '../../components/Wrapper';
import Typography from '../../components/ui/Typography';
import CustomButton from '../../components/ui/CustomButton';
import { pageAtom } from '../../atoms/pageAtom';
import CollapseContainer from '../../components/collapsable/collapsable';
import { COLORS } from '../../constants/colors';

export default function CompanyItemPage({ route }) {
  const { name, address, urlLoc, state_code, city, postal, country, phone } = route.params;

  const setPageAtom = useSetRecoilState(pageAtom);

  useEffect(() => {
    setPageAtom((oldPageAtom) => {
      const copy = [...oldPageAtom];
      if (copy.length > 5) {
        copy.pop();
      }
      return [...copy, name];
    });
  }, []);

  const [expanded, setExpanded] = useState(false);

  const onItemPress = () => {
    setExpanded(!expanded);
  };

  const openPhone = () => {
    const url = `tel:${phone}`;
    Linking.openURL(url).catch((e) => console.error(e));
  };
  const openLetter = () => {
    Linking.openURL(urlLoc).catch((e) => console.error(e));
  };

  return (
    <Wrapper back={true}>
      <View>
        <View>
          <Typography type="title" style={styles.title}>
            {name}
          </Typography>
          <Typography type="subtitle">{address}</Typography>
          <Typography type="subtitle">{`${city}, ${country}`}</Typography>
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
        <View style={styles.kosherSection}>
          <>
            {phone || urlLoc ? (
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
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 10,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  twoButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneButton: {
    flex: 1,
    marginRight: 10,
  },
  letterButton: {
    flex: 1,
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
});
