import { StyleSheet } from "react-native";
import { Size } from "@app/lib/constants/size.ts";
import { Colors } from "@app/theme/colors.ts";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  bottom: {
    flex: 0,
    paddingVertical: 10,
    paddingHorizontal: Size.SCREEN_PADDING,
    backgroundColor: Colors.WHITE,
  },
});
