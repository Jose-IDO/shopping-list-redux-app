import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MinusIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const MinusIcon: React.FC<MinusIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = '#000000' 
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 13H5V11H19V13Z"
        fill={color}
      />
    </Svg>
  );
};

export default MinusIcon;

