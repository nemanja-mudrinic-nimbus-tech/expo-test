import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const MinusIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    stroke="#000"
    viewBox="0 0 24 24"
    width={18}
    height={18}
    {...props}>
    <Path d="M5 12h14" />
  </Svg>
);

export default MinusIcon;
