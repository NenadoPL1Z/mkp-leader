import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors.ts";
import { Size } from "@app/lib/constants/size.ts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  main: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
  },
  inputContainerStyle: {
    borderRadius: 0,
    height: "100%",
    backgroundColor: Colors.WHITE,
  },
  inputStyle: {
    maxHeight: undefined,
    height: "100%",
  },
  bottom: {
    flex: 0,
    paddingTop: 10,
    paddingHorizontal: Size.SCREEN_PADDING,
  },
});
