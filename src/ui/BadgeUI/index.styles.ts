import { StyleSheet } from "react-native";
import { ZIndex } from "@app/theme/zIndex.ts";

export const styles = StyleSheet.create({
  container: {
    right: 0,
    bottom: 0,
    zIndex: ZIndex.DEFAULT,
    borderRadius: 100,

    alignItems: "center",
    justifyContent: "center",
  },
});
