import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAlertCount = () =>
  useQuery({
    queryKey: ['getAlertsCount'],
    queryFn: async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}alerts/count`, {});
        return response.data.data[0];
      } catch (e) {
        console.log(e.code);
        console.log(e.message);
        console.log(e.stack);
      }
    },
  });
