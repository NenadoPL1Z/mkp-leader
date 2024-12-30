import { StyleSheet } from "react-native";
import { Size } from "@app/lib/constants/size";
import { Font } from "@app/theme/font.ts";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: undefined,

    borderLeftWidth: 0,
    paddingHorizontal: Size.SCREEN_PADDING,

    backgroundColor: undefined,
    elevation: 0,
  },
  content: {
    borderRadius: 20,
    paddingVertical: 18,
  },
  text1: {
    fontFamily: Font.TEXT,
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 20,
    textAlign: "left",
  },
});
