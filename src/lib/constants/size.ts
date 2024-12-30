import { Dimensions } from "react-native";

export const DEVICE_WIDTH = Dimensions.get("window").width;
export const DEVICE_HEIGHT = Dimensions.get("window").height;
export const DEVICE_HEIGHT_IS_SMAL = DEVICE_HEIGHT < 700;

export const Size = {
  HEADER: 56,
  HEADER_TOP: 5,
  INPUT: 45,
  SCREEN_TOP: 11,
  SCREEN_PADDING: 15,
  ICON_PADDING: 10,
  BUTTON: 48,
};
