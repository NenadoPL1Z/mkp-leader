import { StyleSheet } from "react-native";

import { Colors } from "@app/theme/colors";
import { ZIndex } from "@app/theme/zIndex";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    zIndex: ZIndex.BACK,
  },
  pressable: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.RGBA_BACKDOOR,
  },
});
