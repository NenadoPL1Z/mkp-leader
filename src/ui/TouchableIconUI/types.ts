import type { SvgFC, SvgPropsFixed } from "@app/types/general.ts";
import type { TouchableOpacityProps } from "react-native";

export interface TouchableIconUIProps {
  size: number;
  // color: IThemeKeyUnionType;
  Icon: SvgFC;
  onPress: Pick<TouchableOpacityProps, "onPress">["onPress"];
  padding?: number;

  iconProps?: SvgPropsFixed;
  touchableProps?: TouchableOpacityProps;
}
