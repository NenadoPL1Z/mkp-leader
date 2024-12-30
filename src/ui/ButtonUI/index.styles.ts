import { Font } from "@app/theme/font";
import { Colors } from "@app/theme/colors";
import { StyleSheet } from "react-native";
import { Size } from "@app/lib/constants/size";

const general = StyleSheet.create({
  root: {},
  containerStyle: {
    borderRadius: 12,
  },
  titleStyle: {
    fontFamily: Font.TEXT_REGULAR,
    fontSize: 17,
    lineHeight: 20,
    fontWeight: "400",
  },
  disabledTitleStyle: {
    color: Colors.GRAY_SEVEN,
  },
  buttonStyle: {
    width: "100%",
    minHeight: Size.BUTTON,
  },
  disabledStyle: {
    backgroundColor: Colors.GRAY_NINE,
  },
});

const base = StyleSheet.create({
  root: general.root,
  containerStyle: general.containerStyle,
  titleStyle: {
    ...general.titleStyle,
    color: Colors.WHITE,
  },
  disabledTitleStyle: general.disabledTitleStyle,
  buttonStyle: {
    ...general.buttonStyle,
    backgroundColor: Colors.MAIN,
  },
  disabledStyle: general.disabledStyle,
});

const disabled = StyleSheet.create({
  root: general.root,
  containerStyle: general.containerStyle,
  titleStyle: {
    ...general.titleStyle,
    color: Colors.GRAY_SEVEN,
  },
  disabledTitleStyle: general.disabledTitleStyle,
  buttonStyle: {
    ...general.buttonStyle,
    backgroundColor: Colors.GRAY_NINE,
  },
  disabledStyle: general.disabledStyle,
});

const inverted = StyleSheet.create({
  root: general.root,
  containerStyle: general.containerStyle,
  titleStyle: {
    ...general.titleStyle,
    color: Colors.SECONDARY,
  },
  disabledTitleStyle: general.disabledTitleStyle,
  buttonStyle: {
    ...general.buttonStyle,
    backgroundColor: Colors.WHITE,
  },
  disabledStyle: general.disabledStyle,
});

const rounded = StyleSheet.create({
  root: general.root,
  containerStyle: {
    ...general.containerStyle,
    borderRadius: 20,
    borderColor: Colors.MAIN,
    borderStyle: "solid",
    borderWidth: 1,
  },
  titleStyle: {
    ...general.titleStyle,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.WHITE,
  },
  disabledTitleStyle: general.disabledTitleStyle,
  buttonStyle: {
    ...general.buttonStyle,
    width: "auto",
    minHeight: 40,
    paddingLeft: 12,
    paddingRight: 16,
    backgroundColor: Colors.MAIN,
  },
  disabledStyle: {
    ...general.disabledStyle,
    backgroundColor: Colors.GRAY_EIGHT,
  },
});

const roundedInverted = StyleSheet.create({
  root: general.root,
  containerStyle: {
    ...general.containerStyle,
    borderRadius: 20,
    borderColor: Colors.GRAY_EIGHT,
    borderStyle: "solid",
    borderWidth: 1,
  },
  titleStyle: {
    ...general.titleStyle,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.GRAY_SEVEN,
  },
  disabledTitleStyle: general.disabledTitleStyle,
  buttonStyle: {
    ...general.buttonStyle,
    width: "auto",
    minHeight: 40,
    paddingLeft: 12,
    paddingRight: 16,
    backgroundColor: Colors.WHITE,
  },
  disabledStyle: {
    ...general.disabledStyle,
    backgroundColor: Colors.GRAY_EIGHT,
  },
});

const text = StyleSheet.create({
  root: general.root,
  containerStyle: general.containerStyle,
  titleStyle: {
    ...general.titleStyle,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.MAIN,
  },
  disabledTitleStyle: {
    ...general.disabledTitleStyle,
    color: Colors.BLACK_TWO,
  },
  buttonStyle: {
    ...general.buttonStyle,
    width: "auto",
    minHeight: 40,
    paddingHorizontal: 16,
    backgroundColor: Colors.TRANSPARENT,
  },
  disabledStyle: {
    ...general.disabledStyle,
    backgroundColor: Colors.TRANSPARENT,
  },
});

export const styles = {
  base,
  disabled,
  inverted,
  rounded,
  text,
  "rounded-inverted": roundedInverted,
};
