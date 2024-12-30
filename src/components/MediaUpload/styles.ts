import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors";

export const styles = StyleSheet.create({
  mb16: {
    marginBottom: 16,
  },
  photoList: {
    marginBottom: 8,

    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  button: {
    minWidth: 266,
    maxWidth: 266,
    alignItems: "flex-start",
  },
  buttonStyle: {
    width: 266,
    backgroundColor: Colors.TEXT,
    padding: 0,
    paddingHorizontal: 16,
  },
  scratch: {
    marginRight: 10,
  },
});
