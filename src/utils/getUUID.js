import AsyncStorage from '@react-native-async-storage/async-storage';
import { userUUIDKey } from '../constants/asyncStorageKeys';

export const getUUID = async () => {
  try {
    const uuidValue = await AsyncStorage.getItem(userUUIDKey);
    if (uuidValue) {
      return uuidValue;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};
