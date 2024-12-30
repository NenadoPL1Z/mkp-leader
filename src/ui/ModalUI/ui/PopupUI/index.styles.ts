import { StyleSheet } from "react-native";
import { ZIndex } from "@app/theme/zIndex";
import { Colors } from "@app/theme/colors";
//? FIX_COMMIT

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  innerContainer: {
    width: "100%",
    paddingHorizontal: 30,
    flexDirection: "column",
    alignItems: "flex-end",
  },
  safeArea: {
    width: "100%",
    alignItems: "center",
  },
  wrapper: {
    width: "100%",
    maxWidth: 315,
    minHeight: 80,

    paddingVertical: 15,
    paddingHorizontal: 15,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: Colors.WHITE,
    borderRadius: 24,
  },
  contentContainer: {
    marginBottom: 16,
  },
  bottom: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
  },
  backdoor: {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: ZIndex.BACK,
    backgroundColor: Colors.RGBA_BACKDOOR,
  },
  pressable: {
    height: "100%",
    width: "100%",
  },
});
