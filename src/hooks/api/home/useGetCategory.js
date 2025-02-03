import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getUUID } from '../../../utils/getUUID';

export const useGetCategory = (id) =>
  useQuery({
    queryKey: ['getCategory', id],
    queryFn: async () => {
      const deviceId = await getUUID();

      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}data/category-lists?category_id=${id}`,
        {
          headers: {
            'x-device-id': deviceId,
          },
        }
      );
      return response.data.data;
    },
  });
