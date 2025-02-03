import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetSingleItem = (id) =>
  useQuery({
    queryKey: ['getSingleItem', id],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}get-single-kosher-item/${id}`
      );
      return response.data.data;
    },
  });
