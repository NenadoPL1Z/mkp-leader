import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors";
import { Size } from "@app/lib/constants/size";

export const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
  scrollContainer: {
    flex: 1,
    flexGrow: 1,
  },
  scroll: {
    paddingHorizontal: Size.SCREEN_PADDING,
    paddingBottom: 10,
  },
  wrapper: {
    marginTop: 3,
    padding: Size.SCREEN_PADDING,
    borderRadius: 12,
  },
  shadow: {
    backgroundColor: Colors.MAIN,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  mb16: {
    marginBottom: 16,
  },
  check: {
    marginLeft: 0,
    paddingVertical: 0,
  },
  bottom: {
    flex: 0,
    paddingVertical: 10,
    paddingHorizontal: Size.SCREEN_PADDING,
  },
});
