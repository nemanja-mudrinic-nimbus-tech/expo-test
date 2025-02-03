import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getUUID } from '../../../utils/getUUID';

export const useGetItems = (parentID, listID, title) => {
  const queryParam = encodeURIComponent(listID);
  return useQuery({
    queryKey: ['getItems', parentID, queryParam, title],
    queryFn: async () => {
      const deviceId = await getUUID();
      let response;
      if (queryParam) {
        response = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_URL}data/list-items?category_id=${parentID}&param=${queryParam}`,
          {
            headers: {
              'x-device-id': deviceId,
            },
          }
        );
      } else {
        response = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_URL}data/list-items?category_id=${parentID}`,
          {
            headers: {
              'x-device-id': deviceId,
            },
          }
        );
      }

      return response.data.data;
    },
  });
};
