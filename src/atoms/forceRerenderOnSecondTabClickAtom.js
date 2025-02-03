import {atom} from 'recoil';

export const forceRerenderOnSecondTabClickAtom = atom({
  key: 'forceRerenderOnSecondTabClickAtom',
  default: new Date().valueOf(),
});
