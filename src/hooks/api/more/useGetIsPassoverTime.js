import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetIsPassoverTime = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getIsPassoverTime'],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_URL}data/get-passover-time`
        );

        return response.data;
      } catch (e) {
        console.error('Error during fetch:', e);
        throw e;
      }
    },
    refetchInterval: 1000 * 60 * 3,
    refetchIntervalInBackground: true,
  });
  return { data, isLoading, isError };
};
