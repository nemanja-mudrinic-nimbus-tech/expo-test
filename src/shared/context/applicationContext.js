import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useGetIsPassoverTime } from '../../hooks/api/more/useGetIsPassoverTime';

export const ApplicationContext = createContext({});

export const useApplicationContext = () => useContext(ApplicationContext);

export const ApplicationContextProvider = ({ children }) => {
  const { data: isPassoverTime } = useGetIsPassoverTime();
  const [expandHeader, setExpandHeader] = useState(false);
  const [isSearchSettingsSave, setIsSearchSettingsSave] = useState();
  const [onlyPassover, setOnlyPassover] = useState(undefined);

  const [showModalBeforeResults, setShowModalBeforeResults] = useState(undefined)
  const [showModal, setModal] = useState(undefined);

  useEffect(() => {
    if (isPassoverTime) {
      getSavedSettings();
    } else {

    }
  }, [isPassoverTime]);

  const isDayInPast = (dateAsString) => {
    if (!dateAsString) {
      return true
    }

    const todayInFormat = formatDateToYYYYMMDD(new Date());
    const dateFromStorageInFormat = formatDateToYYYYMMDD(new Date(dateAsString));

    // Compare the formatted strings to determine if the date is in the past
    return dateFromStorageInFormat < todayInFormat;
  }

  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // JS months are 0-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const passoverModalIsClosed = async () => {
    const dayWhenItsClosed = formatDateToYYYYMMDD(new Date());
    setShowModalBeforeResults(false)
    setModal(false)
    await AsyncStorage.setItem('searchPassoverData', JSON.stringify({
      date: dayWhenItsClosed,
      used: true
    }))
  }

  const getSavedSettings = async () => {
    const stringLastDateWhenSavedSettings = await AsyncStorage.getItem('lastDateWhenSavedSettings')
    if (!stringLastDateWhenSavedSettings || isDayInPast((stringLastDateWhenSavedSettings || ''))) {
      await AsyncStorage.setItem('isSavedSettings', JSON.stringify(false))
      await AsyncStorage.setItem('isPassoverOnly', JSON.stringify(true))
    }

    const savedSettings = await AsyncStorage.getItem('isSavedSettings', (err, value) => {
      if (err) {
        console.log(err);
      } else {
        JSON.parse(value);
      }
    });

    setIsSearchSettingsSave(savedSettings === 'true');

    if (savedSettings === 'true') {
      const pass = await AsyncStorage.getItem('isPassoverOnly');

      setOnlyPassover(JSON.parse(pass));
    } else {
      setOnlyPassover(true);
    }

    await AsyncStorage.setItem('lastDateWhenSavedSettings', formatDateToYYYYMMDD(new Date()))

    const searchPassoverData = await AsyncStorage.getItem('searchPassoverData')
    if (!searchPassoverData) {
      setShowModalBeforeResults(true)
      return;
    }

    const searchPassover = JSON.parse(searchPassoverData);

    const { date: savedDate, used } = searchPassover;

    const todayDate = formatDateToYYYYMMDD(new Date())

    if (savedDate === todayDate) {
      if (!used) {
        setShowModalBeforeResults(true);
      } else {
        setShowModalBeforeResults(false);
      }
    } else {
      if (savedDate < todayDate) {
        setShowModalBeforeResults(true);
      }
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        expandHeader,
        setExpandHeader,
        setOnlyPassover,
        onlyPassover,
        isSearchSettingsSave,
        setIsSearchSettingsSave,
        showModalBeforeResults,
        passoverModalIsClosed,
        showModal,
        setModal,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
