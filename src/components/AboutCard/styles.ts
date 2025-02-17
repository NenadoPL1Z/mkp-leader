import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors";

export const styles = StyleSheet.create({
  root: {
    width: "100%",

    marginBottom: 15,
    padding: 15,

    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.WHITE,

    borderRadius: 12,
  },
  resetPadding: {
    padding: 0,
  },
  shadow: {
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,

    elevation: 4,
  },
  left: {
    marginRight: 15,
  },
  right: {
    flex: 1,
  },
  rightTop: {
    minHeight: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  rightTopMax: {
    minHeight: 28,
  },
  rightTopLeft: {
    flex: 0,
    marginRight: 8,
  },
  rightTopMiddle: {
    flex: 1,
  },
  rightTopRight: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  children: {
    flex: 0,
    marginLeft: 8,
  },
  badgeContainer: {
    gap: 5,
    marginLeft: 8,
    flexDirection: "column",
    alignItems: "flex-end",
  },
});
