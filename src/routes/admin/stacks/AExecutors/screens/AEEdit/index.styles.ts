import { StyleSheet } from "react-native";
import { Size } from "@app/lib/constants/size";

export const styles = StyleSheet.create({
  scroll: { flex: 1 },
  root: {
    marginTop: 10,
    paddingHorizontal: Size.SCREEN_PADDING,
  },
  bottom: {
    paddingTop: 10,
    paddingHorizontal: Size.SCREEN_PADDING,
  },
});
