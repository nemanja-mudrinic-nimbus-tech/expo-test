import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Typography from '../ui/Typography';
import DropdownIcon from '../../assets/svg/more/DropdownIcon';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {COLORS} from '../../constants/colors';
import SmallerFAQ from './SmallerFAQ';

export default function SingleFAQ({title, questions}) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.root}>
      <Pressable onPress={() => setOpen(!open)}>
        <View style={styles.top}>
          <Typography type="subtitle" style={styles.title}>
            {title}
          </Typography>
          <View style={open ? styles.dropdown : {}}>
            <DropdownIcon />
          </View>
        </View>
      </Pressable>
      {open && (
        <View style={styles.questions}>
          {questions.map(question => {
            return (
              <SmallerFAQ
                title={question.title}
                text={question.body}
                key={question.title}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginBottom: 15,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown: {
    transform: [{rotateX: '180deg'}],
  },
  text: {
    marginTop: 10,
    color: COLORS.secondaryTextColor,
    lineHeight: 22,
    fontSize: 15,
  },
  title: {
    maxWidth: '80%',
  },
  questions: {
    padding: 10,
  },
});
