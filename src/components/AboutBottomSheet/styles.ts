import { StyleSheet } from "react-native";
import { Size } from "@app/lib/constants/size";

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Size.SCREEN_PADDING,
  },
  header: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvatar: {
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  headerTextName: {
    flex: 0,
  },
  headerTextAddress: {
    flex: 0,
  },
  main: {
    paddingVertical: 16,
  },
  mainText: {},
  mainTextWorkName: {},
  mainTextWorkTime: {
    marginBottom: 8,
  },
  mainTextWorkWeekdays: {
    marginLeft: 0,
    paddingVertical: 0,
  },
  footer: {
    paddingTop: 8,
  },
  footerWrapper: {
    marginBottom: 8,
  },
  footerName: {
    marginBottom: 2,
  },
  footerPhone: {},
});
