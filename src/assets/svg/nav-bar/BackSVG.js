import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const BackSVG = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={16}
    fill="none"
    {...props}>
    <Path
      fill="#fff"
      d="M6.983 15.293a.75.75 0 1 0 1.034-1.086L2.264 8.75H17.25a.75.75 0 0 0 0-1.5H2.288l5.73-5.457A.75.75 0 1 0 6.982.707L.44 6.94a1.498 1.498 0 0 0 .013 2.134l6.53 6.22z"
    />
  </Svg>
);

export default BackSVG;
