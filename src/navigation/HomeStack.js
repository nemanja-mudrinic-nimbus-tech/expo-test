import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PAGES } from '../constants/pages';

// Screens
import Home from '../screens/Home';
import ItemList from '../screens/Home/ItemList';
import Articles from '../screens/Home/Articles';
import Categories from '../screens/Home/Categories';
import SubCategories from '../screens/Home/SubCategories';
import ArticlePage from '../screens/Home/ArticlePage';
import ApplianceItemPage from '../screens/Home/ApplianceItemPage';
import Passover from '../screens/Home/Passover/Passover';
import PassoverPaidSection from '../components/home/passover/PassoverPaidSection';
import PassoverPaidSectionList from '../screens/Home/Passover/PassoverPaidSectionList';
import InsectItemPage from '../screens/Home/InsectItemPage';
import ItemPage from '../screens/Home/ItemPage';
import CompanyItemPage from '../screens/Home/CompanyItemPage';
import PassoverItemPage from '../screens/Home/Passover/PassoverItemPage';
import PdfViewerScreen from '../components/ui/PDFViewer';
import { Keyboard } from 'react-native';

const Stack = createStackNavigator();

export default function HomeStack({ navigation }) {
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      // Do something when the tab is focused
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Home' }],
      // });
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      Keyboard.dismiss();
      // Reset the stack when the tab is blurred
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  return (
    <Stack.Navigator
      id="HomeStack"
      initialRouteName={PAGES.home}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Screen used only in HomeStack */}
      <Stack.Group>
        <Stack.Screen name={PAGES.home} component={Home} />
        <Stack.Screen name={PAGES.passoverPaidSection} component={PassoverPaidSection} />
        <Stack.Screen name={PAGES.passoverPaidSectionList} component={PassoverPaidSectionList} />
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
