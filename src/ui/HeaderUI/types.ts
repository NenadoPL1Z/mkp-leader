import type { Colors } from "@app/theme/colors";
import type { ReactNode } from "react";
import type { SvgProps } from "react-native-svg";
import type { TouchableOpacityProps } from "react-native";

type Touch = Omit<TouchableOpacityProps, "children">;

export type HRChildrenProps = Touch & {
  iconProps?: SvgProps;
  subtitle?: string;
  subtitleColor?: Colors;
};

export type HeaderRightProps = HRChildrenProps & {
  variant?: "logout" | "edit" | "text" | "";
  subtitle?: string;
};

export type HeaderUIProps = Partial<{
  title: string;
  isBack: boolean;
  isOverLinear: boolean;
  right: HeaderRightProps;
  onBack: (() => void) | undefined;
  children: ReactNode;
}>;
