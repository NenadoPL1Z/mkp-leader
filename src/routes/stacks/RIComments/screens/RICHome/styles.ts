import { StyleSheet } from "react-native";
import { Size } from "@app/lib/constants/size.ts";
import { Colors } from "@app/theme/colors.ts";

export const styles = StyleSheet.create({
  reload: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: Size.SCREEN_PADDING,
  },
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexDirection: "column-reverse",
    flexGrow: 1,
    gap: 15,
    paddingLeft: Size.SCREEN_PADDING,
    paddingRight: Size.SCREEN_PADDING,
    paddingBottom: Size.SCREEN_PADDING,
  },
  bottom: {
    flex: 0,
    paddingVertical: 10,
    paddingHorizontal: Size.SCREEN_PADDING,
    backgroundColor: Colors.WHITE,
  },
});
