import type { StyleProp, ViewStyle } from "react-native";

export interface BadgeUIProps {
  count?: number;
  size?: number;
  backgroundColor?: string;
  isDisplay?: boolean;
  style?: StyleProp<ViewStyle> | undefined;
  isZero?: boolean;
}
