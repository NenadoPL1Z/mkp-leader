import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors.ts";

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 10,
  },
  myComment: {
    alignSelf: "flex-end",
  },
  otherComment: {
    alignSelf: "flex-start",
  },
  comment: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: Colors.GRAY,
  },
  createdAt: {
    alignSelf: "flex-end",
    padding: 10,
  },
});
