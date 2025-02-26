import "react-native-svg";

declare module "react-native-svg" {
  export interface SvgProps {
    xmlns?: string;
    xmlnsXlink?: string;
    xmlSpace?: string;
  }
}

declare module "*.svg" {
  import type React from "react";
  import type { SvgProps } from "react-native-svg";

  const content: React.FC<SvgProps>;
  export default content;
}
