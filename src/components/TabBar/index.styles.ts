import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  children: {
    flexGrow: 1,
  },
  root: {
    flex: 0,

    height: 72,

    borderStyle: "solid",
    borderTopWidth: 1,
    borderTopColor: Colors.GRAY_THREE,
  },
  wrapper: {
    height: 72,

    paddingTop: 6,
    paddingBottom: 13,

    flexDirection: "row",
    justifyContent: "center",
  },
});
