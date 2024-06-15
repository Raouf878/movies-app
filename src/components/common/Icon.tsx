import React from 'react';
import { CSSProperties } from 'react';

// Import your SVGs as React components
import { ReactComponent as Comedy } from '../../assets/categorysvg/mask-comedy-svgrepo-com.svg';
import { ReactComponent as Thriller } from '../../assets/categorysvg/scare-svgrepo-com (1).svg';
import { ReactComponent as Animation } from '../../assets/categorysvg/anime-away-face-svgrepo-com.svg';
import { ReactComponent as Drame } from '../../assets/categorysvg/crying-emoji-svgrepo-com (1).svg';
import { ReactComponent as filter } from '../../assets/categorysvg/filter-svgrepo-com.svg';




// Define your icon properties
export interface IconProps {
  name:string;
  style?: CSSProperties;
  width?: string | number;
  styleName?: 'flip' | 'rotateDown' | 'rotateUp';
  height?: string | number;
}

const Icon = ({ name, style, width, height }: IconProps) => {
  const commonProps = {
    style: {...style },
    
    width,
    height,
  };


  const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    Comedy:Comedy,
    Thriller:Thriller,
    Animation:Animation,
    Drame:Drame,
    filter:filter,
  };

  const IconComponent = icons[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...commonProps} />;
};



export default Icon;
