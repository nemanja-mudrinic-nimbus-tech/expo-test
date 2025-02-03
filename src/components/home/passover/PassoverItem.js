import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import Typography from '../../ui/Typography';
import { COLORS } from '../../../constants/colors';

export default function PassoverItem({
  name,
  chometz,
  highlight,
  filterSlug,
  isSearchResult = false,
}) {
  return (
    <View>
      <View style={[styles.box, highlight === 1 && { backgroundColor: COLORS.orange }]}>
        <View>
          <Typography type="categoryTitle" style={styles.title}>
            {name}
          </Typography>
        </View>
        <Text
          selectable
          style={[
            styles.chometz,
            chometz === 'Not Chomet'
              ? { color: COLORS.green }
              : { color: COLORS.secondaryTextColor },
          ]}
        >
          {chometz.toUpperCase()} AAAA
        </Text>
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
    paddingHorizontal: 17,
    paddingVertical: 5,
  },
  title: {
    flex: 1,
  },
  chometz: {
    marginLeft: 5,
    alignSelf: 'flex-end',
  },
});
