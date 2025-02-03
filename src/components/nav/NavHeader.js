import { View, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Search from './Search';
import { COLORS } from '../../constants/colors';
import BackSVG from '../../assets/svg/nav-bar/BackSVG';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { tabNavigationAtom } from '../../atoms/tabNavigationAtom';
import { showSearchContainerAtom } from '../../atoms/showSearchContainerAtom';
import { stackScreenStateAtom } from '../../atoms/stackScreenStateAtom';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchResultContainer from './SearchResultContainer';
import { PAGES } from '../../constants/pages';
import { pageAtom } from '../../atoms/pageAtom';
import ToggleInfo from '../more/ToggleInfo';
import CollapseContainer from '../collapsable/collapsable';
import { useApplicationContext } from '../../shared/context/applicationContext';
import { useGetIsPassoverTime } from '../../hooks/api/more/useGetIsPassoverTime';

export default function NavHeader({ back }) {
  const navigation = useNavigation();
  const navID = navigation.getId();
  const route = useRoute();
  const routeName = route.name;
  const mainScreens = useMemo(() => [PAGES.home, PAGES.alerts, PAGES.more], []);
  const isOnMainScreen = mainScreens.includes(routeName);
  const [showSearchContainerMain, setShowSearchContainerMain] =
    useRecoilState(showSearchContainerAtom);
  const setStackScreenState = useSetRecoilState(stackScreenStateAtom);
  const [showSearchContainer, setShowSearchContainer] = useState(false);

  useFocusEffect(() => {
    setStackScreenState((prevState) => ({
      ...prevState,
      beforeTabButtonPressStackName: navID,
    }));
  });

  useEffect(() => {
    if (isOnMainScreen) {
      setShowSearchContainerMain((prevState) => ({
        ...prevState,
        [routeName]: showSearchContainer,
      }));
    }
  }, [
    isOnMainScreen,
    routeName,
    setShowSearchContainerMain,
    showSearchContainer,
    setShowSearchContainer,
  ]);

  // Search Results
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ results: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emptyState, setEmptyState] = useState(null);
  // Search Filters
  const [filters, setFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [typeFilters, setTypeFilters] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  // HEIGHT
  const tabBarHeight = useBottomTabBarHeight();
  const setTabBarValue = useSetRecoilState(tabNavigationAtom);
  const windowHeight = Dimensions.get('window').height;
  const insets = useSafeAreaInsets();
  const STATUSBAR_HEIGHT = insets.top;
  const viewHeight = {
    height: windowHeight - tabBarHeight - (Platform.OS === 'ios' ? STATUSBAR_HEIGHT : 0),
  };

  const {
    expandHeader,
    setOnlyPassover,
    onlyPassover,
    setIsSearchSettingsSave,
    isSearchSettingsSave,
  } = useApplicationContext();

  const { data: isPassoverTime } = useGetIsPassoverTime();

  const [mainFilter, setMainFilter] = useState(isPassoverTime ? 'Passover' : 'All');
  const [smartFilter, setSmartFilter] = useState([]);
  const setPageAtom = useSetRecoilState(pageAtom);

  const removeFirstPageElement = () => {
    setPageAtom((oldPageAtom) => {
      const oldCopy = [...oldPageAtom];
      if (oldCopy.length) {
        oldCopy.pop();
        return [...oldCopy];
      }
      return oldCopy;
    });
  };
  const getSearchContainerVisibility = () =>
    isOnMainScreen ? showSearchContainerMain[routeName] : showSearchContainer;

  const togglePassoverSwitch = async () => {
    setOnlyPassover(!onlyPassover);
    setIsSearchSettingsSave(false);
    await AsyncStorage.setItem('isSavedSettings', JSON.stringify(false));
  };

  const toggleSaveSwitch = async () => {
    setIsSearchSettingsSave(!isSearchSettingsSave);
    if (!isSearchSettingsSave) {
      await AsyncStorage.setItem('isPassoverOnly', JSON.stringify(onlyPassover));
    }
    await AsyncStorage.setItem('isSavedSettings', JSON.stringify(!isSearchSettingsSave));
  };

  useEffect(() => {
    if (onlyPassover) {
      setMainFilter('Passover');
    }
  }, [onlyPassover]);

  return (
    <View style={[styles.root, getSearchContainerVisibility() && viewHeight]}>
      <View style={[styles.header, getSearchContainerVisibility(), back && { paddingLeft: 10 }]}>
        <View style={styles.topHeader}>
          {back ? (
            <Pressable
              style={styles.backButton}
              onPress={() => {
                navigation.goBack();
                setTabBarValue(true);
                removeFirstPageElement();
              }}
            >
              <BackSVG />
            </Pressable>
          ) : (
            <Image style={styles.image} source={require('../../assets/images/star_k_button.png')} />
          )}
          <View style={styles.input}>
            <Search
              setShowSearchContainer={setShowSearchContainer}
              setFilters={setFilters}
              setSearchResults={setSearchResults}
              setIsLoading={setIsLoading}
              setError={setError}
              setEmptyState={setEmptyState}
              setCategoryFilters={setCategoryFilters}
              setTypeFilters={setTypeFilters}
              setActiveFilters={setActiveFilters}
              setSearchTerm={setSearchTerm}
              mainFilter={mainFilter}
              smartFilters={smartFilter}
              setSmartFilter={setSmartFilter}
              setMainFilter={setMainFilter}
              isPassoverTime={isPassoverTime}
            />
          </View>
        </View>
      </View>

      {isPassoverTime && onlyPassover !== undefined && (
        <View>
          <CollapseContainer expanded={expandHeader}>
            <View style={styles.expandHeader}>
              <ToggleInfo
                text={'Passover Only'}
                toggleSwitch={togglePassoverSwitch}
                isEnabled={onlyPassover}
              />
              <ToggleInfo
                text={'Save Setting'}
                toggleSwitch={toggleSaveSwitch}
                isEnabled={isSearchSettingsSave}
              />
            </View>
          </CollapseContainer>
        </View>
      )}

      {getSearchContainerVisibility() && (
        <SearchResultContainer
          isLoading={isLoading}
          searchResults={searchResults}
          error={error}
          emptyState={emptyState}
          activeFilters={activeFilters}
          filters={filters}
          setEmptyState={setEmptyState}
          searchTerm={searchTerm}
          mainFilter={mainFilter}
          setMainFilter={setMainFilter}
          setSmartFilter={setSmartFilter}
          currentSmartFilter={smartFilter}
          setIsLoading={setIsLoading}
          isPassoverTime={isPassoverTime}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'top',
  },
  header: {
    backgroundColor: COLORS.main,
    paddingLeft: 16,
    paddingRight: 16,
    height: 67,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
  },
  image: {
    resizeMode: 'contain',
    height: 40,
    width: 40,
  },
  backButton: {
    width: 50,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  expandHeader: {
    height: 40,
    backgroundColor: COLORS.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 26,
    paddingBottom: 8,
    width: '100%',
  },
});
