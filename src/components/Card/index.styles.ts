import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors";

const borderRadius = 12;

export const styles = StyleSheet.create({
  root: {
    marginBottom: 16,

    borderRadius,
  },
  shadow: {
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,

    elevation: 4,
  },
  wrapper: {
    minHeight: 60,

    paddingVertical: 15,
    paddingHorizontal: 15,

    borderRadius,
  },
  m2: {
    marginBottom: 2,
  },
  m8: {
    marginBottom: 8,
  },
});
