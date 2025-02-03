import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SearchSVG = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}>
    <Path
      fill="#fff"
      d="m17.805 16.862-4.84-4.84a7.298 7.298 0 0 0 1.701-4.689C14.666 3.29 11.377 0 7.333 0S0 3.29 0 7.333c0 4.044 3.29 7.333 7.333 7.333 1.783 0 3.417-.64 4.69-1.7l4.839 4.839a.665.665 0 0 0 .943 0 .667.667 0 0 0 0-.943zM1.332 7.333c0-3.308 2.692-6 6-6 3.309 0 6 2.692 6 6 0 3.309-2.691 6-6 6-3.308 0-6-2.691-6-6z"
    />
  </Svg>
);

export default SearchSVG;
