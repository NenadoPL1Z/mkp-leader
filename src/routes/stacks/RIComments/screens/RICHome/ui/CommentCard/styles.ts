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
  badge: {
    marginLeft: 8,
  },
  comment: {
    borderTopWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.GRAY_TEN,
    paddingTop: 15,
    marginBottom: 15,
  },
  createdAt: {
    alignSelf: "flex-end",
    padding: 10,
  },
});
