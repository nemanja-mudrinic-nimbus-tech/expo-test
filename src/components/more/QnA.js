import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {useGetQnA} from '../../hooks/api/more/useGetQnA';
import Typography from '../ui/Typography';
import {COLORS} from '../../constants/colors';
import SingleQnA from './SingleQnA';

export default function QnA() {
  const {data, isLoading, isError, isFetching} = useGetQnA();
  if (isLoading || isFetching) {
    return <ActivityIndicator color={COLORS.main} size="large" />;
  }
  if (isError) {
    return <Typography>Failed to fetch alerts.</Typography>;
  }
  return (
    <View>
      {data.map(item => (
        <SingleQnA
          key={item.id}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </View>
  );
}
