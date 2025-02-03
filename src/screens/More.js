import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';

// Components
import Typography from '../components/ui/Typography';
import NavHeader from '../components/nav/NavHeader';
import MoreItem from '../components/more/MoreItem';
// Assets
import AskRabbiIcon from '../assets/svg/more/AskRabbiIcon';

// Constants
import { COLORS } from '../constants/colors';
import { PAGES } from '../constants/pages';

export default function More() {
  const navigation = useNavigation();

  const link = process.env.EXPO_PUBLIC_PRIVACY_POLICE;

  return (
    <View style={styles.root}>
      <NavHeader />
      <View style={styles.content}>
        <Typography type="title" style={styles.title}>
          Contact Us
        </Typography>
        <View>
          <MoreItem
            title="Ask a Rabbi"
            svg={<AskRabbiIcon />}
            onPress={() => navigation.navigate(PAGES.askRabbi)}
          />
        </View>
        <View style={styles.versionBox}>
          <Text
            onPress={() => navigation.navigate(PAGES.about)}
            selectable
            style={{ color: COLORS.secondaryTextColor }}
          >
            Version 4.2.9
          </Text>

          <View style={styles.privacyBox}>
            <Text>Read our </Text>
            <Text
              selectable
              onPress={() =>
                navigation.dispatch(
                  StackActions.push(PAGES.articlePage, {
                    url: link,
                  })
                )
              }
              style={{ color: COLORS.labelColor, textDecorationLine: 'underline' }}
            >
              Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 20,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  version: {
    color: COLORS.secondaryTextColor,
    fontSize: 15,
    marginTop: 'auto',
  },
  versionBox: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  privacyBox: {
    display: 'flex',
    flexDirection: 'row',
  },
});
