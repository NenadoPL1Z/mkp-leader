import { StyleSheet } from "react-native";
import { Size } from "@app/lib/constants/size";
import { ZIndex } from "@app/theme/zIndex";

export const styles = StyleSheet.create({
  header: {
    marginBottom: 8,
  },
  top: {
    flex: 0,
    paddingHorizontal: Size.SCREEN_PADDING,
    marginBottom: 10,
  },
  middle: {
    flexGrow: 1,
  },
  contentContainerStyle: {
    paddingTop: 6,
    paddingBottom: Size.BUTTON + 20,
  },
  bottom: {
    flex: 0,

    width: "100%",

    paddingHorizontal: Size.SCREEN_PADDING,
    marginBottom: 15,

    position: "absolute",
    left: 0,
    bottom: 0,
    zIndex: ZIndex.DEFAULT,
  },
});
