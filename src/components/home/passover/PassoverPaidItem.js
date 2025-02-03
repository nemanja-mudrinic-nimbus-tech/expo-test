import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Typography from '../../../components/ui/Typography';
import { COLORS } from '../../../constants/colors';

export default function PassoverPaidItem({
  name,
  chometz,
  highlight,
  filterSlug,
  isSearchResult = false,
}) {
  return (
    <View style={styles.box}>
      <View style={[styles.title]}>
        <Typography style={{ alignSelf: 'flex-start' }} type="categoryTitle">
          {name}
        </Typography>
      </View>
      <View
        style={[
          styles.kosherSection,
          highlight ? { backgroundColor: highlight } : { backgroundColor: '#FFF' },
        ]}
      >
        <Text style={chometz !== 'Not Chometz' ? styles.notApprovedText : styles.approvedText}>
          {chometz}
        </Text>
      </View>
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
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  approvedText: {
    color: COLORS.green,
  },
  notApprovedText: {
    color: COLORS.error,
  },
});
