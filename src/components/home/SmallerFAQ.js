import {View, Pressable, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Typography from '../ui/Typography';
import {COLORS} from '../../constants/colors';
import PlusIcon from '../../assets/svg/faq/PlusIcon';
import MinusIcon from '../../assets/svg/faq/MinusIcon';

export default function SmallerFAQ({title, text}) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.root}>
      <Pressable onPress={() => setOpen(!open)}>
        <View style={styles.top}>
          <Typography type="subtitle" style={styles.title}>
            {title}
          </Typography>
          <View>{!open ? <PlusIcon /> : <MinusIcon />}</View>
        </View>
      </Pressable>
      {open && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingBottom: 15,
    marginBottom: 10,
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
    marginTop: 5,
    color: COLORS.secondaryTextColor,
    lineHeight: 22,
    fontSize: 15,
  },
  title: {
    maxWidth: '80%',
  },
});
