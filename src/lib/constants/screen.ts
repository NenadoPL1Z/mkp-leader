import { IS_ANDROID } from "./index";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export const tabBarScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarHideOnKeyboard: true,
};

export const nativeScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  orientation: "portrait",
  animation: IS_ANDROID ? "none" : "default",
};
