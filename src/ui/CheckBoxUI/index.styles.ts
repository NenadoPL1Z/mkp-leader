import { StyleSheet } from "react-native";
import { Font } from "@app/theme/font";
import { Colors } from "@app/theme/colors";

export const styles = StyleSheet.create({
  root: {},
  containerStyle: {
    padding: 0,
    paddingVertical: 5,
  },
  wrapperStyle: {},
  disabledStyle: {},
  textStyle: {
    marginLeft: 8,

    color: Colors.TEXT,

    fontFamily: Font.TEXT,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "400",
  },
  disabledTitleStyle: {},
});
