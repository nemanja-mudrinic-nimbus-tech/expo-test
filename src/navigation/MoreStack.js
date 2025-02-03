import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PAGES } from '../constants/pages';
import { Keyboard } from 'react-native';

// Screens
import More from '../screens/More';
import AskRabbi from '../screens/More/AskRabbi';
import Contact from '../screens/More/Contact';
import ItemPage from '../screens/Home/ItemPage';
import InsectItemPage from '../screens/Home/InsectItemPage';
import ApplianceItemPage from '../screens/Home/ApplianceItemPage';
import Passover from '../screens/Home/Passover/Passover';
import Articles from '../screens/Home/Articles';
import Categories from '../screens/Home/Categories';
import SubCategories from '../screens/Home/SubCategories';
import ItemList from '../screens/Home/ItemList';
import CompanyItemPage from '../screens/Home/CompanyItemPage';
import PdfViewerScreen from '../components/ui/PDFViewer';
import ArticlePage from '../screens/Home/ArticlePage';
import PassoverItemPage from '../screens/Home/Passover/PassoverItemPage';
import About from '../screens/More/About';

const Stack = createStackNavigator();

export default function MoreStack({ navigation }) {
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      // Do something when the tab is focused
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      Keyboard.dismiss();
      navigation.reset({
        index: 0,
        routes: [{ name: 'More' }],
      });
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);
  return (
    <Stack.Navigator
      id="MoreStack"
      initialRouteName={PAGES.more}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Screen used only in MoreStack */}
      <Stack.Group>
        <Stack.Screen name={PAGES.more} component={More} />
        <Stack.Screen name={PAGES.askRabbi} component={AskRabbi} />
        <Stack.Screen name={PAGES.contact} component={Contact} />
        <Stack.Screen name={PAGES.about} component={About} />
      </Stack.Group>

      {/* We need these screen because the search should have an access for all of them */}
      <Stack.Group>
        <Stack.Screen name={PAGES.singleItem} component={ItemPage} />
        <Stack.Screen name={PAGES.insectItemPage} component={InsectItemPage} />
        <Stack.Screen name={PAGES.articlesList} component={Articles} />
        <Stack.Screen name={PAGES.articlePage} component={ArticlePage} />
        <Stack.Screen name={PAGES.categories} component={Categories} />
        <Stack.Screen name={PAGES.subCategories} component={SubCategories} />
        <Stack.Screen name={PAGES.itemList} component={ItemList} />
        <Stack.Screen name={PAGES.applianceItemPage} component={ApplianceItemPage} />
        <Stack.Screen name={PAGES.companyPage} component={CompanyItemPage} />
        <Stack.Screen name={PAGES.pdfViewer} component={PdfViewerScreen} />
        <Stack.Screen name={PAGES.passover} component={Passover} />

        <Stack.Screen name={PAGES.passoverItemPage} component={PassoverItemPage} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
