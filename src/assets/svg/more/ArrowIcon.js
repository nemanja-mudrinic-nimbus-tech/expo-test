import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowIcon = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={18} height={15}>
    <Path
      fill="#222"
      d="M11.017.207a.75.75 0 1 0-1.034 1.086l5.753 5.457H.75a.75.75 0 0 0 0 1.5h14.962l-5.729 5.457a.75.75 0 1 0 1.034 1.086l6.544-6.233a1.499 1.499 0 0 0-.013-2.134l-6.53-6.22z"
      {...props}
    />
  </Svg>
);

export default ArrowIcon;
