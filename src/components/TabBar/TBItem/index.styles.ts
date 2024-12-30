import { StyleSheet } from "react-native";
import { DEVICE_WIDTH } from "@app/lib/constants/size";

const IS_SMALL = DEVICE_WIDTH <= 410;

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 8,
    paddingLeft: IS_SMALL ? 5 : 10,
    paddingRight: IS_SMALL ? 5 : 10,

    justifyContent: "center",
    alignItems: "center",
  },
  first: {
    paddingLeft: IS_SMALL ? 5 : 40,
  },
  last: {
    paddingRight: IS_SMALL ? 5 : 40,
  },
  icon: {
    width: IS_SMALL ? 28 : 32,
    height: IS_SMALL ? 28 : 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
