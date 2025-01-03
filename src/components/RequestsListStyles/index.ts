import { Size } from "@app/lib/constants/size.ts";
import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors.ts";

export const requestsListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  top: {
    flex: 1,
    flexGrow: 1,
  },
  contentContainerStyle: {
    paddingTop: 6,
    paddingBottom: Size.BUTTON + 16,
  },
  contentMoreTop: {
    paddingTop: 16,
  },
  bottom: {
    width: "100%",
    alignItems: "center",

    paddingHorizontal: Size.SCREEN_PADDING,

    position: "absolute",
    bottom: 0,
    left: 0,
  },
  sort: {
    flex: 0,
  },
});
