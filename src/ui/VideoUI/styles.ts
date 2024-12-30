import { StyleSheet } from "react-native";
import { DEVICE_HEIGHT, Size } from "@app/lib/constants/size";
import { ZIndex } from "@app/theme/zIndex";

export const styles = StyleSheet.create({
  video: {
    position: "relative",
    width: "100%",
    height: "100%",
    maxHeight: DEVICE_HEIGHT / 1.3,
  },
  absolute: {
    position: "absolute",
    zIndex: ZIndex.OVER,
    paddingHorizontal: Size.SCREEN_PADDING,
  },
  error: {
    alignItems: "center",
  },
  titleError: {
    textAlign: "center",
    marginBottom: 16,
  },
  progress: {
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: ZIndex.DEFAULT,
    pointerEvents: "none",
  },
});
