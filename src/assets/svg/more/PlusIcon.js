import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}>
    <Path
      fill="#555"
      d="M16.15 7.65h-6.8V.85a.85.85 0 0 0-1.7 0v6.8H.85a.85.85 0 0 0 0 1.7h6.8v6.8a.85.85 0 0 0 1.7 0v-6.8h6.8a.85.85 0 0 0 0-1.7z"
    />
  </Svg>
);

export default SvgComponent;
