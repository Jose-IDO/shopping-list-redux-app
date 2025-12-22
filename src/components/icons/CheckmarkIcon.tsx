import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CheckmarkIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const CheckmarkIcon: React.FC<CheckmarkIconProps> = ({ 
  width = 16, 
  height = 16, 
  color = '#FFFFFF' 
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
        fill={color}
      />
    </Svg>
  );
};

export default CheckmarkIcon;




