import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';

import Typography from '../ui/Typography';
import CollapseContainer from '../collapsable/collapsable';
import { COLORS } from '../../constants/colors';

export default function CerealItem({ item }) {
  const [expanded, setExpanded] = useState(false);
  const onItemPress = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Typography type="categoryTitle">{item.item_name}</Typography>
        <View style={styles.headerInfo}>
          <Text style={{ color: COLORS.gray }}>{item.item_company}</Text>
          <Text style={{ color: COLORS.gray }}>{item.item_dpmStatus}</Text>
        </View>
      </View>
      <CollapseContainer expanded={expanded}>
        <View style={{ padding: 8 }}>
          <Text>{item.item_footNote}</Text>
        </View>
      </CollapseContainer>
      <View style={styles.midSection}>
        <View style={styles.midSectionBox}>
          <Text style={{ fontWeight: '600', fontSize: 12 }}>Brocha</Text>
          <Text style={{ color: COLORS.monochromatic }}>{item.item_brocha}</Text>
        </View>
        <View style={styles.midSectionBox}>
          <Text style={{ textAlign: 'right', fontWeight: '600', fontSize: 12 }}>
            Brocha Achrona
          </Text>
          <Text style={{ textAlign: 'right', color: COLORS.monochromatic }}>
            {item.item_brochaAchrona}
          </Text>
        </View>
      </View>

      {item.item_footNote && (
        <View style={styles.buttonSection}>
          <TouchableWithoutFeedback onPress={onItemPress}>
            {!expanded ? (
              <Text style={{ color: COLORS.labelColor }}>Kosher Information {'>>'} </Text>
            ) : (
              <Text style={{ color: COLORS.labelColor }}> {'<<'} Less Information </Text>
            )}
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 'auto',
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Android shadow
    elevation: 3,
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
    width: '100%',
  },
  midSection: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    display: 'flex',
    flexDirection: 'row',
    borderTopColor: COLORS.blueGray,
    borderTopWidth: 1,

    justifyContent: 'space-between',
  },
  midSectionBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonSection: {
    borderTopColor: COLORS.blueGray,
    borderTopWidth: 1,
    paddingTop: 8,
    width: '100%',
    alignItems: 'center',
  },
});
