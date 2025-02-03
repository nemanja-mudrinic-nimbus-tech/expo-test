import {atom} from 'recoil';
import {PAGES} from '../constants/pages';

/**
 * This state applies only for the main/initial screens
 *
 * - Home
 * - Alerts
 * - More
 * */

export const showSearchContainerAtom = atom({
  key: 'showSearchContainerAtom',
  default: {
    [PAGES.home]: false,
    [PAGES.alerts]: false,
    [PAGES.more]: false,
  },
});
