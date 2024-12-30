import { StyleSheet } from "react-native";
import { Size } from "@app/lib/constants/size.ts";
import { ZIndex } from "@app/theme/zIndex.ts";

export const styles = StyleSheet.create({
  container: { flexGrow: 1 },
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
