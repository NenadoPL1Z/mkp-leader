import { StyleSheet } from "react-native";
import { Size } from "@app/lib/constants/size.ts";
import { Colors } from "@app/theme/colors.ts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingTop: 10,
    paddingLeft: Size.SCREEN_PADDING,
    paddingRight: Size.SCREEN_PADDING,
    gap: 15,
  },
  bottom: {
    flex: 0,
    paddingVertical: 10,
    paddingHorizontal: Size.SCREEN_PADDING,
    backgroundColor: Colors.WHITE,
  },
});
