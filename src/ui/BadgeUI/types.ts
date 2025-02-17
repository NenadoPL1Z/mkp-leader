import type { TypographyProps } from "@app/ui/Typography/types.ts";
import type { StyleProp, ViewStyle } from "react-native";

export interface BadgeUIProps {
  count?: number;
  size?: number;
  backgroundColor?: string;
  isDisplay?: boolean;
  style?: StyleProp<ViewStyle> | undefined;
  isZero?: boolean;
  typographyStyles?: TypographyProps;
}
