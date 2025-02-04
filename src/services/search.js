import axios from 'axios';
import { captureError } from '../utils/CaptureError';

import { getUUID } from '../utils/getUUID';

/**
 * Store the user's search phrase and the cliked result for future analytics
 *
 * Requires these parameters sent in the request body:
 * @param {string} searchTerm the string keyword that the user was searching for (ex. "coca col")
 * @param {string} clickedResults a title / name of the item the user has clicked on from the list of results based on the search term
 * @param {object} rawData a json string of the whole item the user has clicked on - items can vary a lot, and this raw json will contain all the needed data to find this item later on
 */
export async function storeSearchPhrase(searchTerm, clickedResults, rawData) {
  const body = {
    search_string: searchTerm,
    clicked_result: clickedResults,
    raw_data: JSON.stringify(rawData),
  };

  try {
    const currentDeviceId = await getUUID();
    await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}data/store-search-phrase`, {
      ...body,
      currentDeviceId,
    });
  } catch (error) {
    if (error) {
      captureError(error, { serach: searchTerm});
    }
  }
}
