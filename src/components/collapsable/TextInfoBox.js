import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';

const TextInfoBox = ({ title, text, isKosher = false, isApprovedType = '' }) => {
  return (
    <View style={isKosher ? styles.kosherTextBox : styles.textBox}>
      <Text>{text}</Text>
    </View>
  );
};

export default TextInfoBox;

const styles = StyleSheet.create({
  textBox: { display: 'flex', flexDirection: 'column', marginBottom: 8 },
  kosherTextBox: { display: 'flex', flexDirection: 'row', marginBottom: 8 },
  singleLine: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
});
