stackScreenStateAtom;
import {atom} from 'recoil';
import {PAGES} from '../constants/pages';

/**
 * When we enter a search term on one of the first screens of any navigation stack (e.g. Home, AlertScreen, More), and when we click the active tab once again, we expect to close the search results. However, that is not the case, because the `<Search />` component is not a screen but a modal, and we need to force close it. In every other inner (nested) screen, this works as expected, because when we click the active tab one more time, we navigate the user to the first (initial) screen, and the state of those previously active (nested) screens got reset. The catch is that the `<Search />` component is inside the `<NavHeader />` and every screen has its own header, which makes a separate state for every component independently. Because of this, we need to track on which screen are we and if the search of any first screen is active.
 *
 * @param {string} beforeTabButtonPressScreenName: Returns the current screen name of the application. This state is updated when the `<NavigationContainer />` component's `onStateChange` event is called. When the tab button is pressed, it is invoked before we manage to update its state. Because of that, in the <TabNavigaiton /> this value is actually the "previous active screen".
 * @param {string} beforeTabButtonPressStackName: Returns the current stack name of the application.
 * @param {object} isSearchActive: The object stores the search container's visibility state, only of the first screen in any stack navigation inside the `<TabNavigaiton />` bottom bar.
 */
export const stackScreenStateAtom = atom({
  key: 'stackScreenStateAtom',
  default: {
    beforeTabButtonPressScreenName: PAGES.home,
    beforeTabButtonPressStackName: PAGES.homeStack,
    // We are interested only in the first screens inside each stack
    isSearchActive: {
      [PAGES.home]: false,
      [PAGES.alerts]: false,
      [PAGES.more]: false,
    },
  },
});
