import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors";
import { Size } from "@app/lib/constants/size";

export const styles = StyleSheet.create({
  root: {
    borderRadius: 12,
    marginBottom: 24,
  },
  wrapper: {
    padding: 16,
    overflow: "hidden",
  },
  shadow: {
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  item: {
    marginBottom: 16,
  },
  check: { marginLeft: 0, marginVertical: 0 },
  pointer: {
    pointerEvents: "none",
  },
  bottom: {
    flex: 0,
    paddingVertical: 10,
    paddingHorizontal: Size.SCREEN_PADDING,
    backgroundColor: Colors.WHITE,
  },
});
