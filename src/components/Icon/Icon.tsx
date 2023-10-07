import React from 'react';

interface IIconProps {
  src: string;
  alt?: string;
}

function Icon({ src, alt }: IIconProps) {
  return <img src={src} alt={alt} />;
}

export default Icon;
