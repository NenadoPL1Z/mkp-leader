import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors";
import { Font } from "@app/theme/font";
import { ZIndex } from "@app/theme/zIndex";
import { Size } from "@app/lib/constants/size";

const general = StyleSheet.create({
  root: {},
  container: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  inputContainer: {},
  input: {
    fontSize: 17,
  },
  disabled: {},
  label: {
    fontFamily: Font.TEXT,
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 15,
  },
  error: {
    width: "100%",

    marginTop: 0,
    marginLeft: 0,

    fontFamily: Font.TEXT,
    fontSize: 10,
    lineHeight: 15,
    color: Colors.ERROR,

    position: "absolute",
    bottom: -23,
  },
  leftIcon: {},
  rightIcon: {
    width: 32,
    height: 32,
    alignItems: "flex-end",
  },
});

const outlined = StyleSheet.create({
  root: general.root,
  placeholder: { color: Colors.WHITE },
  container: general.container,
  inputContainer: {
    ...general.inputContainer,
    borderColor: Colors.WHITE,
    borderBottomColor: Colors.WHITE,
    borderBottomWidth: 1,
  },
  input: {
    ...general.input,
    height: 40,
    padding: 0,

    color: Colors.WHITE,
    backgroundColor: Colors.TRANSPARENT,
  },
  disabled: general.disabled,
  label: {
    ...general.label,
    width: "100%",

    color: Colors.WHITE,

    position: "absolute",
    top: -8,
  },
  error: {
    ...general.error,
    display: "none",
  },
  leftIcon: general.leftIcon,
  rightIcon: general.rightIcon,
});

const contained = StyleSheet.create({
  root: general.root,
  placeholder: {
    color: Colors.GRAY_SEVEN,
  },
  container: general.container,
  inputContainer: {
    ...general.inputContainer,

    borderWidth: 1,
    borderColor: Colors.TRANSPARENT,
    backgroundColor: Colors.WHITE,

    borderRadius: 12,
  },
  input: {
    ...general.input,
    height: Size.INPUT,
    paddingLeft: 15,
    paddingRight: 15,

    color: Colors.BLACK_TWO,
    borderBottomWidth: 0,
  },
  disabled: general.disabled,
  label: {
    ...general.label,
    color: Colors.WHITE,
    marginBottom: 5,
  },
  error: general.error,
  leftIcon: general.leftIcon,
  rightIcon: general.rightIcon,
});

export const styles = {
  outlined,
  contained,
};

const rightWidth = 32;
const rightHeight = 32;

export const defaultStyles = StyleSheet.create({
  root: {
    position: "relative",
  },
  inputRight: {
    paddingRight: rightWidth + 5,
  },
  inputLeft: {
    paddingLeft: 35,
  },
  left: {
    width: rightWidth,
    height: rightHeight,

    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
    left: 5,
    top: 8,
    zIndex: ZIndex.DEFAULT,
  },
  right: {
    width: rightWidth,
    height: rightHeight,

    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
    right: 0,
    top: 4,
    zIndex: ZIndex.DEFAULT,
  },
  inputContainerError: {
    borderColor: Colors.ERROR,
  },
  labelError: {
    color: Colors.ERROR,
  },
});
