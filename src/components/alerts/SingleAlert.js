import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Text,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import RenderHTML from 'react-native-render-html';

import AlertSVG from '../../assets/svg/alerts/AlertSVG';
import Typography from '../ui/Typography';
import { COLORS } from '../../constants/colors';
import { shortenString } from '../../utils/shortenString';
import CollapseContainer from '../collapsable/collapsable';
import { useMarkAlertAsRead } from '../../../src/hooks/view/useMarkAlertAsReadt';

export default function SingleAlert({ title, date, desc, id, read }) {
  const contentWidth = useWindowDimensions().width - 40;
  const [finalDate, setFinalDate] = useState();

  const markAlertAsRead = useMarkAlertAsRead();

  useEffect(() => {
    if (date) {
      const [year, month, day] = date?.split('T')[0]?.split('-');
      setFinalDate(`${month}/${day}/${year}`);
    }
  }, [date]);

  const finalTitle = shortenString(title?.trim(), 100);
  const finalDesc = shortenString(desc?.trim(), 100);

  const [expanded, setExpanded] = useState(false);

  const [localRead, setLocalRead] = useState(read);

  const onItemPress = () => {
    setExpanded(!expanded);
    if (!localRead && !expanded) {
      setLocalRead(true);
      markAlertAsRead(id);
    }
  };

  useEffect(() => {
    return () => {
      if (expanded) {
        setExpanded(false);
      }
    };
  }, []);

  useEffect(() => {
    if (read) {
      setLocalRead(read);
    }
  }, [read]);

  const htmlTitle = {
    html: `<h3 style='font-size: 15px; margin-bottom: 5px; margin-top: 0; ${
      !localRead && 'margin-left: 5px; width:100%;'
    }'>${finalTitle}</h3>`,
  };

  const htmlShortDesc = {
    html: `
    <div style='
      white-space: nowrap; 
      overflow: hidden;
      text-overflow: ellipsis; 
      color: #555555;
      font-size: 14px;
      margin: 0;
      padding:0px 8px;
      width: 100%;
    '>${desc}</div>
  `,
  };

  const htmlFullDesc = {
    html: `<p style='color: #555555; font-size: 14px; padding: 0; margin: 0; user-select: text;'>${desc}</p>`,
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          {!localRead && <AlertSVG />}
          <RenderHTML contentWidth={contentWidth} source={htmlTitle} />
        </View>

        {date && (
          <View>
            <Typography style={styles.date}>{finalDate}</Typography>
          </View>
        )}
      </View>

      {!expanded && (
        <View style={styles.descBox}>
          <RenderHTML ignoredDomTags={['img']} contentWidth={contentWidth} source={htmlShortDesc} />
        </View>
      )}

      <CollapseContainer expanded={expanded}>
        <View style={{ padding: 8 }}>
          <RenderHTML ignoredDomTags={['img']} contentWidth={contentWidth} source={htmlFullDesc} />
        </View>
      </CollapseContainer>
      {finalDesc && (
        <View style={styles.buttonSection}>
          <TouchableWithoutFeedback onPress={onItemPress}>
            {!expanded ? (
              <Text
                style={{ color: COLORS.labelColor }}
                selectable
                onPress={() => !localRead && onItemPress()}
              >
                See More {'>>'}{' '}
              </Text>
            ) : (
              <Text style={{ color: COLORS.labelColor }}> {'<<'} See Less </Text>
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
  headerTitle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    width: '75%',
  },

  shortDesc: {
    color: COLORS.secondaryTextColor,
  },

  buttonSection: {
    borderTopColor: COLORS.blueGray,
    borderTopWidth: 1,
    paddingTop: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },

  descBox: {
    marginTop: 5,
    width: '100%',
    maxHeight: 36,
    overflow: 'hidden',
    numberOfLines: 2,
    ellipsizeMode: 'tail',
  },

  date: {
    fontSize: 13,
    color: COLORS.secondaryTextColorLight,
  },
});
