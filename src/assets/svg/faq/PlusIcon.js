import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const PlusIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#000"
    viewBox="0 0 24 24"
    width={18}
    height={18}
    {...props}>
    <Path d="M12 5v14M5 12h14" />
  </Svg>
);

export default PlusIcon;
