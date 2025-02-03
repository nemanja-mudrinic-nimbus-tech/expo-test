import { Alert } from 'react-native';

export const alertNotification = (title, text) => {
  Alert.alert(title, text, [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
};
