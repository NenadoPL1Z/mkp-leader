import { StyleSheet } from "react-native";
import { Size } from "@app/lib/constants/size";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: Size.SCREEN_PADDING,
  },
  bottom: {
    paddingTop: 10,
    paddingHorizontal: Size.SCREEN_PADDING,
  },
});
