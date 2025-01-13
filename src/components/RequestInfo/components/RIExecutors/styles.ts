import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors";

export const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 0,
  },
  marginTop: {
    marginTop: 15,
  },
  root: {
    borderRadius: 12,
    marginBottom: 24,
  },
  wrapper: {
    padding: 15,
    overflow: "hidden",
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
  title: {
    marginBottom: 8,
  },
  additional_executor: {
    marginTop: 20,
  },
  deadline: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  comment: {
    marginTop: 16,
  },
  check: {
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  media: {
    marginTop: 16,
  },
});
