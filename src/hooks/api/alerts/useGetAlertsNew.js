import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetAlertsNew = () =>
  useQuery({
    queryKey: ['getAlerts'],
    queryFn: async () => {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}data/alerts`);
      return response.data.data;
    },
  });
