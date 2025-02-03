import {StyleSheet, View, Pressable, Platform} from 'react-native';

import { COLORS } from '../../constants/colors';
import Typography from '../ui/Typography';

const SmartFilterBox = ({ text, smartFilters, setSmartFilter }) => {
  const isFilterSelected = smartFilters.includes(text);
  const toggleFilter = () => {
    if (isFilterSelected) {
      setSmartFilter(smartFilters.filter((f) => f !== text)); //remove text
    } else {
      setSmartFilter([...smartFilters, text]);
    }
  };

  return (
    <Pressable
      onPress={() => {
        toggleFilter();
      }}
    >
      <View style={isFilterSelected ? styles.selectBoxContainer : styles.boxContainer}>
        <Typography type={isFilterSelected ? 'filterBoxSelect' : 'filterBox'}>{text}</Typography>
      </View>
    </Pressable>
  );
};

export default SmartFilterBox;

const styles = StyleSheet.create({
  boxContainer: {
    height: 'auto',
    alignSelf: 'flex-start',
    borderRadius: 6,
    borderColor: COLORS.main,
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 2 : 0.25,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4
  },
  selectBoxContainer: {
    height: 'auto',
    alignSelf: 'flex-start',
    borderRadius: 6,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: COLORS.main,
    paddingTop: Platform.OS === 'ios' ? 2 : 1,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4
  },
});
