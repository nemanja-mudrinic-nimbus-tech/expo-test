import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getUUID } from '../../../utils/getUUID';

export const useGetNewArticles = (id) =>
  useQuery({
    queryKey: ['getNewArticles', id],
    queryFn: async () => {
      const deviceId = await getUUID();
      const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}get-category/${id}`, {
        headers: {
          'x-device-id': deviceId,
        },
      });
      return response.data.data;
    },
  });
