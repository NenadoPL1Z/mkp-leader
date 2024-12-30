import type { FastImageProps } from "react-native-fast-image";

export interface ImageUIProps extends FastImageProps {
  uri: string;
  height?: number | string;
}
