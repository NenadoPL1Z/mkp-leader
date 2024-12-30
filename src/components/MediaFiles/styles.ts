import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors";

export const styles = StyleSheet.create({
  root: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  item: {
    width: 92,
    height: 92,
    backgroundColor: Colors.GRAY_EIGHT,
    borderRadius: 12,
    overflow: "hidden",
  },
});
