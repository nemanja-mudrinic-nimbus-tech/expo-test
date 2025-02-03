import { View, Pressable, TextInput, StyleSheet, Keyboard } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import SearchSVG from '../../assets/svg/nav-bar/SearchSVG';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { debounce } from 'lodash';
import { getUUID } from '../../utils/getUUID';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { mainCategoriesAtom } from '../../atoms/mainCategoriesAtom';
import { tabNavigationAtom } from '../../atoms/tabNavigationAtom';
import { useNavigation, useNavigationState, useRoute } from '@react-navigation/native';
import { stackScreenStateAtom } from '../../atoms/stackScreenStateAtom';
import { forceRerenderOnSecondTabClickAtom } from '../../atoms/forceRerenderOnSecondTabClickAtom';
import { showSearchContainerAtom } from '../../atoms/showSearchContainerAtom';
import { useApplicationContext } from '../../shared/context/applicationContext';

export default function Search({
  setShowSearchContainer,
  setFilters,
  setSearchResults,
  setIsLoading,
  setError,
  setEmptyState,
  setCategoryFilters,
  setTypeFilters,
  setActiveFilters,
  setSearchTerm,
  setMainFilter,
  setSmartFilter,
  isPassoverTime,
}) {
  const input = useRef(null);
  const [inputText, setInputText] = useState('');
  const setTabBarValue = useSetRecoilState(tabNavigationAtom);
  const [stackScreenState, setStackScreenState] = useRecoilState(stackScreenStateAtom);
  const forceRerenderOnSecondTabClick = useRecoilValue(forceRerenderOnSecondTabClickAtom);
  const forceRerenderOnSecondTabClickRef = useRef(forceRerenderOnSecondTabClick);
  const route = useRoute();
  const navState = useNavigationState((state) => state);
  const navigation = useNavigation();
  const navID = navigation.getId();
  const timer = useRef(null);
  const mainCat = useRecoilValue(mainCategoriesAtom);

  const lastTextRef = useRef(null);

  const [showSearchContainerMain, setShowSearchContainerMain] =
    useRecoilState(showSearchContainerAtom);

  const { setExpandHeader, onlyPassover, showModalBeforeResults, setModal } = useApplicationContext();

  useEffect(() => {
    if (!showSearchContainerMain) {
      setInputText('');
      handleResetSerach();
    }
  }, [showSearchContainerMain]);

  const searchReq = async (text) => {
    setIsLoading(true);
    if (text.trim().length < 3 && text.trim().length >= 0) {
      timer.current = setTimeout(() => {
        setSearchResults({ results: [] });
        setEmptyState('Your search term is too short.');
        setIsLoading(false);
      }, 1200);
      return;
    }
    clearTimeout(timer.current);

    const uuid = await getUUID();

    const formData = {
      keyword: text.trim(),
      device_id: uuid,
      position: [],
      mainFilter: isPassoverTime ? 'Passover' : 'All',
      smartFilter: [],
    };

    try {
      setSearchTerm(text.trim());

      lastTextRef.current = text.trim();

      const res = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}v1/search`, formData);

      if (showModalBeforeResults) {
        setModal(true)
      }

      setMainFilter(isPassoverTime && onlyPassover ? 'Passover' : 'All');
      if (lastTextRef.current && lastTextRef.current !== text.trim()) {
        setMainFilter(isPassoverTime ? 'Passover' : 'All');
        setSmartFilter([]);
      }

      if (res.data.results?.length === 0) {
        setEmptyState(
          'Sorry, no results were found for your search. Please try a different keyword or phrase.'
        );
        setSearchResults({
          results: [],
          mainFilters: res.data.mainFilters,
          smartFilters: res.data.smartFilters,
        });
        setIsLoading(false);
        Keyboard.dismiss();
        return;
      } else {
        setEmptyState(null);
        setSearchResults(res.data);
        setExpandHeader(false);
        Keyboard.dismiss();
      }

      setIsLoading(false);
      setError(null);
      setExpandHeader(false);
    } catch (e) {
      setIsLoading(false);
      setEmptyState(null);
      setError(
        'Sorry, we encountered an error while processing your search. Please try again later.'
      );
      console.error(e);
    }
  };

  const handleResetSerach = useCallback(() => {
    setShowSearchContainer(false);
    handleSearchState(false);
    setFilters([]);
    setSearchResults({ results: [] });
    setError(null);
    setEmptyState(null);
    setTypeFilters([]);
    setCategoryFilters([]);
    setActiveFilters([]);
    setMainFilter(isPassoverTime && onlyPassover ? 'Passover' : 'All');
    setSmartFilter([]);
  }, [
    setShowSearchContainer,
    handleSearchState,
    setFilters,
    setSearchResults,
    setError,
    setEmptyState,
    setTypeFilters,
    setCategoryFilters,
    setActiveFilters,
    setMainFilter,
    setSmartFilter,
    isPassoverTime,
    onlyPassover,
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handler = useCallback(debounce(searchReq, 1200), [mainCat, onlyPassover, isPassoverTime, showModalBeforeResults]);

  useEffect(() => {
    if (forceRerenderOnSecondTabClickRef.current !== forceRerenderOnSecondTabClick) {
      forceRerenderOnSecondTabClickRef.current = forceRerenderOnSecondTabClick;

      if (
        (route.name === stackScreenState.beforeTabButtonPressScreenName &&
          stackScreenState.isSearchActive[route.name]) ||
        stackScreenState.beforeTabButtonPressStackName === navID
      ) {
        setInputText('');
        handleResetSerach();
      }
    }
  }, [route.name, forceRerenderOnSecondTabClick, stackScreenState, handleResetSerach, navID]);

  const handleSearchState = useCallback(
    (state) => {
      const currentScreenName = navState.routes[navState.index].name;

      if (typeof stackScreenState.isSearchActive[currentScreenName] !== 'undefined') {
        setStackScreenState((prevState) => ({
          ...prevState,
          isSearchActive: {
            ...prevState.isSearchActive,
            [currentScreenName]: state,
          },
        }));
      }
    },
    [navState.index, stackScreenState.isSearchActive, navState.routes, setStackScreenState]
  );

  const handleFocusChange = () => {
    if (input.current.isFocused()) {
      setExpandHeader(true);
    } else {
      setExpandHeader(false);
    }
  };

  return (
    <View style={styles.root}>
      <Pressable
        onPress={() => {
          input.current.focus();
        }}
      >
        <View style={styles.inputContainer}>
          <SearchSVG />
          <TextInput
            selectionColor={'white'}
            placeholder="Search"
            placeholderTextColor="#fff"
            style={styles.textInput}
            autoCorrect={false}
            value={inputText}
            ref={input}
            onFocus={handleFocusChange}
            onBlur={() => setExpandHeader(false)}
            onChangeText={(text) => {
              setIsLoading(true)
              setTabBarValue(true);
              setInputText(text);
              if (!text.trim().length) {
                setShowSearchContainer(false);
                handleResetSerach();
              } else {
                setEmptyState(null);
                handler(text);
                setShowSearchContainer(true);
                handleSearchState(true);
              }
            }}
          />
          {inputText && (
            <Pressable
              style={styles.closeButton}
              onPress={() => {
                setInputText('');
                handleResetSerach();
              }}
            >
              <AntDesign name="close" size={20} color="white" />
            </Pressable>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    height: 42,
  },
  textInput: {
    marginLeft: 4,
    color: '#fff',
    flex: 1,
  },
  closeButton: {
    width: 35,
    alignItems: 'center',
  },
});
