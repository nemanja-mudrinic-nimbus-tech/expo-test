import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import Wrapper from '../../components/Wrapper';
import Typography from '../../components/ui/Typography';
import ContactForm from '../../components/more/ContactForm';
import FormModal from '../../components/more/FormModal';
import { pageAtom } from '../../atoms/pageAtom';

export default function Contact() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    <Wrapper back={true}>
      <View style={{ marginBottom: 30 }}>
        <Typography style={{ marginBottom: 16, textAlign: 'center' }} type="title">
          Contact us
        </Typography>
        <ContactForm setModalVisible={setModalVisible} setIsLoading={setIsLoading} />
        <FormModal
          modalVisible={modalVisible}
          onSuccess={() => {
            setModalVisible(false)
          }}
          contact={true}
          isLoading={isLoading}
        />
      </View>
    </Wrapper>
  );
}
