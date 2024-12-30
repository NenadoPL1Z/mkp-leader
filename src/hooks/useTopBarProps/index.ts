import { Colors } from "@app/theme/colors.ts";
import { styles } from "./styles";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";

export const useTopBarProps = () => {
  const styleContainer: StyleProp<ViewStyle> = [styles.container];

  const sceneContainerStyle: StyleProp<ViewStyle> = [
    styles.sceneContainerStyle,
    { backgroundColor: Colors.WHITE },
  ];

  const containerProps = {
    style: styleContainer,
    sceneContainerStyle,
  };

  const tabBarStyle: StyleProp<ViewStyle> = [styles.tabBarStyle];

  const tabBarItemStyle: StyleProp<ViewStyle> = [styles.tabBarItemStyle];
  const tabBarLabelStyle: StyleProp<TextStyle> = [styles.tabBarLabelStyle];

  const tabBarIndicatorStyle: StyleProp<ViewStyle> = [
    styles.tabBarIndicatorStyle,
  ];
  const tabBarIndicatorContainerStyle: StyleProp<ViewStyle> = [
    styles.tabBarIndicatorContainerStyle,
    { borderBottomColor: Colors.GRAY_TEN },
  ];

  const screenOptions = {
    tabBarStyle,
    tabBarItemStyle,
    tabBarLabelStyle,
    tabBarIndicatorStyle,
    tabBarIndicatorContainerStyle,
    tabBarActiveTintColor: Colors.BLACK,
    tabBarInactiveTintColor: Colors.GRAY_SEVEN,
    tabBarPressColor: Colors.TRANSPARENT,
  };

  return {
    containerProps,
    screenOptions,
  };
};
