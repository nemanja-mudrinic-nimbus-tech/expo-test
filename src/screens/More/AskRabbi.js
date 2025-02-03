import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import Wrapper from '../../components/Wrapper';
import Typography from '../../components/ui/Typography';
import { COLORS } from '../../constants/colors';
import AskRabbiSmaller from '../../assets/svg/more/AskRabbiSmaller';
import AskRabbiForm from '../../components/more/AskRabbiForm';
import FormModal from '../../components/more/FormModal';
import QnA from '../../components/more/QnA';
import { pageAtom } from '../../atoms/pageAtom';
import { useNavigation } from '@react-navigation/native';

export default function AskRabbi() {
  const [askRabbi, setAskRabbi] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const setPageAtom = useSetRecoilState(pageAtom);

  useEffect(() => {
    setPageAtom((oldPageAtom) => {
      const copy = [...oldPageAtom];
      if (copy.length > 5) {
        copy.pop();
      }
      return [...copy, 'Contact-us'];
    });
  }, []);

  return (
    <Wrapper back={true} dissapearTab={askRabbi ? false : true}>
      <View style={{ marginBottom: 30 }}>
        <View style={[styles.header, { marginBottom: 20 }]}>
          <Pressable onPress={() => setAskRabbi(true)}>
            <View style={styles.header}>
              <AskRabbiSmaller fill={askRabbi ? COLORS.orange : '#222'} />
              <Text style={[styles.headerText, askRabbi && { color: COLORS.orange }]}>
                Ask a Rabbi
              </Text>
            </View>
          </Pressable>
        </View>
        <Typography style={{ marginBottom: 16, textAlign: 'center' }} type="title">
          {askRabbi ? 'Ask a Rabbi' : 'Previous Q&A'}
        </Typography>
        {askRabbi ? (
          <AskRabbiForm setModalVisible={setModalVisible} setIsLoading={setIsLoading} />
        ) : (
          <QnA />
        )}
        <FormModal
          modalVisible={modalVisible}
          isLoading={isLoading}
          onSuccess={() => {
            setModalVisible(false)
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'More' }],
              });
            })
          }}
        />
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 5,
    marginRight: 30,
  },
});
