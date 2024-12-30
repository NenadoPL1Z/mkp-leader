import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors";
import { Font } from "@app/theme/font";

export const styles = StyleSheet.create({
  root: {
    position: "relative",

    height: 48,
    padding: 4,

    backgroundColor: Colors.GRAY_EIGHT,
    borderRadius: 12,
  },
  option: {
    height: "100%",

    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  item: {
    height: "100%",

    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 10,
  },
  active: {
    height: "100%",

    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
    top: 0,

    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
  activeText: {
    fontSize: 17,
    lineHeight: 20,
    fontWeight: "400",
    fontFamily: Font.TEXT_REGULAR,
  },
});
