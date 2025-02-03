import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const AlertSVG = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} fill="none" {...props}>
    <Path
      fill="#CC0000"
      d="M7.5 10.214a1.198 1.198 0 1 1 0 2.397 1.198 1.198 0 0 1 0-2.397zm-.505-7.826h1.011c.475 0 .857.441.857.989l-.3 4.855c0 .547-.384.988-1.063.988-.68 0-1.061-.44-1.061-.988l-.3-4.855c0-.548.381-.989.856-.989zM7.5 0a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15z"
    />
  </Svg>
);

export default AlertSVG;
