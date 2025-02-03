import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const DropdownIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={9}
    fill="none"
    {...props}>
    <Path
      fill="#000"
      d="M8.017 7.998a.763.763 0 0 1-1.069 0L.221 1.288A.753.753 0 1 1 1.288.22L7.483 6.4 13.677.22a.753.753 0 1 1 1.068 1.066l-6.728 6.71z"
    />
  </Svg>
);

export default DropdownIcon;
