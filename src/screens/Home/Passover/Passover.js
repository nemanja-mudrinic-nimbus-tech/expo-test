import React, { useCallback, useEffect, useState } from 'react';
import Wrapper from '../../../components/Wrapper';
import PassoverInfo from '../../../components/home/passover/PassoverInfo';
import Typography from '../../../components/ui/Typography';
import PassoverPaidSection from '../../../components/home/passover/PassoverPaidSection';
import { userUUIDKey } from '../../../constants/asyncStorageKeys';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, ActivityIndicator, View } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { paidUserAtom } from '../../../atoms/paidUserAtom';
import { useGetCategory } from '../../../hooks/api/home/useGetCategory';
import { pageAtom } from '../../../atoms/pageAtom';

export default function Passover({ route }) {
  const [isLoadingLocal, setIsLoadingLocal] = useState(true);
  const [paidUser, setPaidUser] = useRecoilState(paidUserAtom);
  const { title, id } = route.params;
  const setPageAtom = useSetRecoilState(pageAtom);

  const { data, isLoading } = useGetCategory(id);

  useEffect(() => {
    setPageAtom((oldPageAtom) => {
      const copy = [...oldPageAtom];
      if (copy.length > 5) {
        copy.pop();
      }
      return [...copy, title];
    });
  }, []);

  const checkIfUserPaid = useCallback(async () => {
    // Check if user has uuid => no uuid = not paid user / has uuid = send it to BE
    const userUUID = await AsyncStorage.getItem(userUUIDKey);
    if (userUUID) {
      const body = { device_id: userUUID };
      axios
        .post(`${process.env.EXPO_PUBLIC_BASE_URL}payment/check-payment`, body)
        .then((res) => {
          setPaidUser(true);
          setIsLoadingLocal(false);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 498) {
              Alert.alert(
                'Subscription expired',
                'Your yearly Passover subscription has expired. Thank you for using our service. To continue using our service, please renew your subscription.'
              );
            }
            setPaidUser(false);
            setIsLoadingLocal(false);
          }
        });
    } else {
      setPaidUser(false);
      setIsLoadingLocal(false);
    }
  }, [setPaidUser]);

  useEffect(() => {
    checkIfUserPaid();
  }, [checkIfUserPaid]);

  if (isLoading || isLoadingLocal) {
    return (
      <Wrapper back={true}>
        <View>
          <Typography style={{ marginBottom: 16, textAlign: 'center' }} type="title">
            {title}
          </Typography>
          <ActivityIndicator color={COLORS.main} size="large" />
        </View>
      </Wrapper>
    );
  }

  return (
    <Wrapper back={true}>
      <Typography type="title">{title}</Typography>
      {paidUser ? <PassoverPaidSection data={data} parentId={id} /> : <PassoverInfo />}
    </Wrapper>
  );
}
