import type { ViewStyle } from "react-native";
import type { ReactNode } from "react";
import type { RequestBadgeModel } from "@app/lib/models/RequestModel";
import type { AvatarUIProps } from "@app/ui/AvatarUI/types";

export type AboutCardProps = {
  containerStyle?: ViewStyle;
  title: string;
  subtitle: string;
  avatar: AvatarUIProps;
  onPress?: () => void;
  badge?: RequestBadgeModel;
  marginBottom?: number;
  children?: ReactNode;
  isShadow?: boolean;
  isTouch?: boolean;
  isPadding?: boolean;
  isDisplayMark?: boolean;
};
