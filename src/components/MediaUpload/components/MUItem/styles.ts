import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors";
import { ZIndex } from "@app/theme/zIndex";

export const styles = StyleSheet.create({
  container: {
    position: "relative",

    width: 92,
    height: 92,

    borderRadius: 12,
    backgroundColor: Colors.GRAY_EIGHT,
    overflow: "hidden",

    marginRight: 8,
    marginBottom: 8,
  },
  delete: {
    width: 32,
    height: 32,

    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
    top: 4,
    right: 4,
    zIndex: ZIndex.OVER,

    backgroundColor: Colors.RGBA_BACKDOOR,
    borderRadius: 8,
  },
  bottom: {
    width: "100%",

    position: "absolute",
    left: 0,
    bottom: 0,
    zIndex: ZIndex.OVER,

    alignItems: "center",

    backgroundColor: Colors.RGBA_BACKDOOR,
  },
});
