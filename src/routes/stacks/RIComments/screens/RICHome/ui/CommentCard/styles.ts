import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors.ts";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  shadow: {
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  myComment: {
    alignSelf: "flex-end",
  },
  otherComment: {
    alignSelf: "flex-start",
  },
  comment: {
    marginBottom: 15,
  },
  createdAt: {
    alignSelf: "flex-end",
    padding: 10,
  },
});
