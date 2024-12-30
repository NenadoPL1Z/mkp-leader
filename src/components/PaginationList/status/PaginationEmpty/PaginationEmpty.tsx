import React from "react";
import { StyleSheet, View } from "react-native";

import { Size } from "@app/lib/constants/size";

const PaginationEmpty = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Size.SCREEN_PADDING,
  },
});

export default React.memo(PaginationEmpty);
