import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors.ts";
import { Font } from "@app/theme/font.ts";

export const styles = StyleSheet.create({
  container: {},
  sceneContainerStyle: {},
  tabBarStyle: {},
  tabBarItemStyle: {
    paddingBottom: 4,
    paddingHorizontal: 24,
    width: "auto",
    position: "relative",
  },
  tabBarLabelStyle: {
    fontSize: 17,
    lineHeight: 20,
    fontWeight: "400",
    fontFamily: Font.TEXT,
    textTransform: "none",
  },
  tabBarIndicatorStyle: {
    backgroundColor: Colors.PRIMARY,
    height: 2,
    bottom: -2,
    borderRadius: 10,
  },
  tabBarIndicatorContainerStyle: {
    borderBottomWidth: 2,
  },
});
