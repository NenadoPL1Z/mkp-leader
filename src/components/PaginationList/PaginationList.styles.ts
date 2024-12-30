import { StyleSheet } from "react-native";
import { Size } from "@app/lib/constants/size";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainerStyle: {
    flexGrow: 1,
    paddingLeft: Size.SCREEN_PADDING,
    paddingRight: Size.SCREEN_PADDING,
  },
});
