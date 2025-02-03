import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getUUID } from '../../../utils/getUUID';

// This is for getting categories on home page

export const useGetMainCategories = (key) =>
  useQuery({
    queryKey: ['getMainCategories', key],
    queryFn: async () => {
      const deviceId = await getUUID();

      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_URL}data/main-categories-and-articles`,
          {
            headers: {
              'x-device-id': deviceId,
            },
          }
        );
        return response.data.data;
      } catch (e) {
        console.log(e.code);
        console.log(e.message);
        console.log(e.stack);
      }
    },
  });
