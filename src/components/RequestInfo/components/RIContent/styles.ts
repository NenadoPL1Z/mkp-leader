import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    paddingBottom: 0,
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
    marginBottom: 16,
  },
  description: {
    marginBottom: 16,
  },
  material: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  materialTitle: {
    marginRight: 8,
  },
  materialValue: {},
  media: {
    marginBottom: 16,
  },
});
