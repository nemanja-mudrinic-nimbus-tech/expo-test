import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetQnA = () =>
  useQuery({
    queryKey: ['getQnA'],
    queryFn: async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}data/previous-qa`);
        return response.data.data;
      } catch (e) {
        console.log(e.code);
        console.log(e.message);
        console.log(e.stack);
      }
    },
    staleTime: 120000,
    cacheTime: 120000,
  });
