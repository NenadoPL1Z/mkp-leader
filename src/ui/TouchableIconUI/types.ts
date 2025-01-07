import type { SvgFC } from "@app/types/general.ts";
import type { TouchableOpacityProps } from "react-native";
import type { SvgProps } from "react-native-svg";

export interface TouchableIconUIProps {
  size: number;
  // color: IThemeKeyUnionType;
  Icon: SvgFC;
  onPress: Pick<TouchableOpacityProps, "onPress">["onPress"];
  padding?: number;

  iconProps?: SvgProps;
  touchableProps?: TouchableOpacityProps;
}
