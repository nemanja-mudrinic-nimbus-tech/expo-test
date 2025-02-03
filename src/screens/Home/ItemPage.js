import { StyleSheet, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { COLORS } from '../../constants/colors';
import Wrapper from '../../components/Wrapper';
import Typography from '../../components/ui/Typography';
import { pageAtom } from '../../atoms/pageAtom';

export default function ItemPage({ route }) {
  const { id, title, brand, company, footnote, att, item_approved } = route.params;
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
      {brand && <Typography style={styles.brand}>{brand}</Typography>}
      <Typography type="title" style={styles.title}>
        {title ? title : brand}
      </Typography>
      {item_approved && (
        <Text style={item_approved === '1' ? styles.approved : styles.not_approved}>
          {item_approved === '1' ? '' : 'Not approved'}
        </Text>
      )}
      {company && (
        <Typography>
          Company: <Typography type="subtitle">{company}</Typography>
        </Typography>
      )}
      {att && (
        <Text selectable>
          Type:
          <Typography style={styles.footnote}> {att?.replace(/"/g, '')}</Typography>
        </Text>
      )}
      {footnote && (
        <Text>
          Additional information:
          <Typography style={styles.footnote}> {footnote}</Typography>
        </Text>
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  brand: {
    color: COLORS.labelColor,
    fontSize: 20,
    fontFamily: 'Noto-SansBold',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  footnote: {
    fontWeight: '600',
    fontFamily: 'Noto-SansBold',
  },
  approved: {
    color: COLORS.green,
    fontWeight: '700',
  },
  not_approved: {
    color: COLORS.error,
    fontWeight: '700',
  },
});
