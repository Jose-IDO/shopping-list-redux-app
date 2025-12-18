import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface PlusIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = '#000000' 
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
        fill={color}
      />
    </Svg>
  );
};

export default PlusIcon;

