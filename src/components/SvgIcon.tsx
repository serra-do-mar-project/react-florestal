import { Children } from "react";

interface Props {
  xmlns: string;
  fill?: string;
  height?: string;
  width?: string;
  children?: React.ReactNode;
}

export function SvgIcon({height, width, fill, xmlns, children}: Props){
  return(
    <svg
      fill = {fill ? fill : 'currentColor'}
      height = {height ? height : '1em'}
      width = {width || '1em'}
      xmlns= {xmlns}
    >
      
      {children}

    </svg>

  );
}