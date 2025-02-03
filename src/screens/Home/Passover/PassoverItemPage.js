import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Wrapper from '../../../components/Wrapper';
import Typography from '../../../components/ui/Typography';
import { COLORS } from '../../../constants/colors';

export default function PassoverItemPage({ route }) {
  const { product_name, brand, category_name, description, kashrus_notes, is_chometz } =
    route.params;
  return (
    <Wrapper back={true}>
      <View>
        {brand && <Typography style={styles.brand}>{brand}</Typography>}
        <Typography
          style={{ marginBottom: 16, textAlign: 'center' }}
          type="title"
          style={styles.title}
        >
          {product_name}
        </Typography>
        <Text style={is_chometz ? styles.chometz : styles.not_chometz}>
          {is_chometz ? 'Chometz' : 'Not Chometz'}
        </Text>
        {category_name && (
          <Typography>
            Category: <Typography type="subtitle">{category_name}</Typography>
          </Typography>
        )}
        {description && (
          <Text selectable>
            Description:
            <Typography style={styles.footnote}>{description}</Typography>
          </Text>
        )}
        {kashrus_notes && (
          <Text>
            Kashrus Notes:
            <Typography style={styles.footnote}> {kashrus_notes}</Typography>
          </Text>
        )}
      </View>
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
    marginBottom: 5,
  },
  footnote: {
    fontWeight: '600',
    fontFamily: 'Noto-SansBold',
  },
  chometz: {
    color: COLORS.error,
    fontWeight: '700',
  },
  not_chometz: {
    color: COLORS.green,
    fontWeight: '700',
  },
});
