import { StyleSheet } from "react-native";
import { DEVICE_WIDTH } from "@app/lib/constants/size.ts";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    position: "relative",
  },
  slide: {
    width: DEVICE_WIDTH,
  },
  slideLoading: {
    alignItems: "center",
    justifyContent: "center",
  },
});
