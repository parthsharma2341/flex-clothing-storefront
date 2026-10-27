/// <reference types="vite/client" />

declare module '*.html?raw' {
  const content: string;
  export default content;
}

declare module '*.html' {
  const content: string;
  export default content;
}

declare module '@designcodeio/threeui' {
  import { CSSProperties, FC } from 'react';
  export type ThreeDPaperVariant = "original" | "site-of-the-year" | "japanese" | "certificate";
  export type ThreeDPaperProps = {
    className?: string;
    style?: CSSProperties;
    variant?: ThreeDPaperVariant;
  };
  export const ThreeDPaper: FC<ThreeDPaperProps>;
}

declare module '@designcodeio/threeui/style.css';
