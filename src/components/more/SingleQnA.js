import {
  View,
  Pressable,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {AntDesign} from '@expo/vector-icons';
import {COLORS} from '../../constants/colors';
import RenderHTML from 'react-native-render-html';

export default function SingleQnA({question, answer}) {
  const contentWidth = useWindowDimensions().width;
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <View style={styles.root}>
      <Pressable
        onPress={() => setShowAnswer(!showAnswer)}
        style={[
          styles.question,
          showAnswer && {backgroundColor: COLORS.mainLight},
        ]}>
        <View style={{position: 'absolute', left: 0, top: 10}}>
          {showAnswer ? (
            <AntDesign name="minus" size={22} color={COLORS.main} />
          ) : (
            <AntDesign name="plus" size={22} color={COLORS.main} />
          )}
        </View>
        <View style={styles.text}>
          <RenderHTML
            source={{
              html: `<pre>&nbsp;&nbsp;&nbsp;&nbsp;${question}</pre>`,
            }}
            contentWidth={contentWidth}
            defaultTextProps={{selectable: true}}
          />
        </View>
      </Pressable>
      {showAnswer && (
        <RenderHTML
          contentWidth={220}
          source={{html: `<pre>${answer}<pre>`}}
          defaultTextProps={{selectable: true}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 15,
  },
  question: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  text: {
    textAlign: 'justify',
    lineHeight: 20,
  },
});
