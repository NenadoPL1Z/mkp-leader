import { StyleSheet } from "react-native";
import { Size } from "@app/lib/constants/size";

const leftAndRightWidth = Size.SCREEN_PADDING * 2 + 12;

export const styles = StyleSheet.create({
  container: {
    height: Size.HEADER,
    flexDirection: "row",
    justifyContent: "center",
  },
  left: {
    flex: 0,
    width: leftAndRightWidth,
    height: Size.HEADER,
  },
  leftPress: {
    width: "100%",
    height: "100%",
    paddingLeft: Size.SCREEN_PADDING,
    justifyContent: "center",
  },
  middle: {
    position: "relative",

    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  middleText: {
    width: "100%",
    textAlign: "center",
  },
  linearContainer: {
    width: 42,
    height: "100%",

    justifyContent: "center",

    position: "absolute",
    top: 0,
    right: 0,
  },
  linear: {
    width: "100%",
    height: "60%",
  },
  right: {
    flex: 0,
    width: leftAndRightWidth,
    paddingHorizontal: Size.SCREEN_PADDING,
    height: Size.HEADER,
  },
  rightAuto: {
    width: "auto",
  },
});
