import { View, StyleSheet, Alert, useWindowDimensions } from 'react-native';
import React, { useEffect, useCallback } from 'react';
import Wrapper from '../../components/Wrapper';
import Typography from '../../components/ui/Typography';
import RenderHTML from 'react-native-render-html';
import { format } from 'date-fns';
import { COLORS } from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { readAlertsKey } from '../../constants/asyncStorageKeys';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { alertsLengthAtom } from '../../atoms/alertsLengthAtom';
import { hasAlertsAtom } from '../../atoms/hasAlertsAtom';

export default function AlertPage({ route }) {
  const { title, desc, date, id, read } = route.params;
  const formatedDate = format(new Date(date), 'MM/dd/yyyy');
  const alertsLength = useRecoilValue(alertsLengthAtom);
  const setHasAlerts = useSetRecoilState(hasAlertsAtom);
  const contentWidth = useWindowDimensions().width - 40;
  const htmlSrc = {
    html: `<p style='color: #555555; font-size: 15px; padding: 0; margin: 0; user-select: text;'>${desc}</p>`,
  };
  const htmlTitle = {
    html: `<h1>${title}</h1>`,
  };
  const updateReadAlerts = useCallback(async () => {
    try {
      const readAlerts = await AsyncStorage.getItem(readAlertsKey);
      const parsedAlerts = JSON.parse(readAlerts);
      if (!parsedAlerts.includes(id)) {
        parsedAlerts.unshift(id);
      }
      const newReadAlerts = JSON.stringify(parsedAlerts);
      await AsyncStorage.setItem(readAlertsKey, newReadAlerts);
      if (!(alertsLength > parsedAlerts.length)) {
        setHasAlerts(false);
      }
    } catch (e) {
      Alert.alert(
        'Error',
        'Failed to update alerts, check your internet connection and try again later.'
      );
    }
  }, [id, alertsLength, setHasAlerts]);
  useEffect(() => {
    if (!read) {
      updateReadAlerts();
    }
  }, [read, updateReadAlerts]);
  return (
    <Wrapper back={true}>
      <RenderHTML
        defaultTextProps={{ selectable: true }}
        source={htmlTitle}
        contentWidth={contentWidth}
      />
      {date && <Typography>{formatedDate}</Typography>}
      <View style={styles.hr} />
      <RenderHTML
        ignoredDomTags={['img']}
        defaultTextProps={{ selectable: true }}
        source={htmlSrc}
        contentWidth={contentWidth}
      />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  title: {
    marginBottom: 20,
  },
});
