import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors.ts";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  preview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  arrowRight: {
    transform: [{ rotate: "-90deg" }],
  },
  buttonStyles: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    minHeight: 0,
  },
});
