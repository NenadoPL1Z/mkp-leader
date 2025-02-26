import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors";
import { DEVICE_HEIGHT, Size } from "@app/lib/constants/size";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    marginHorizontal: Size.SCREEN_PADDING,
    minHeight: DEVICE_HEIGHT,
  },
  top: {
    width: "100%",
    marginTop: DEVICE_HEIGHT > 700 ? 101 : 70,

    flexGrow: 1,
    alignItems: "center",
  },
  title: {
    marginBottom: 60,
    textAlign: "center",
    color: Colors.WHITE,
  },
  subtitle: {
    width: "100%",
    padding: 15,
    borderRadius: 15,

    borderStyle: "solid",
    borderWidth: 2,
    borderColor: Colors.WHITE,

    textAlign: "center",
  },
  block: {
    width: "100%",
    gap: 5,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    marginBottom: 20,
  },
  bottom: {
    width: "100%",
    alignItems: "center",
    flex: 0,
  },
  bottomMargin: {
    marginBottom: 10,
  },
  url: {
    textDecorationLine: "underline",
  },
  toast: {
    backgroundColor: Colors.WHITE_TWO,
  },
  toastText: {
    color: Colors.GRAY_TWO,
    textAlign: "center",
    fontSize: 15,
    lineHeight: 20,
  },
});
