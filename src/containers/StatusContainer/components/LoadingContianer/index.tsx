import React from "react";
import { StyleSheet, View } from "react-native";

import SpinnerUI from "@app/ui/SpinnerUI";
import type { LoadingContainerProps } from "../../types";

const LoadingContainer = ({ containerProps = {} }: LoadingContainerProps) => {
  return (
    <View
      {...containerProps}
      style={[styles.container, containerProps?.style]}>
      <SpinnerUI />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default React.memo(LoadingContainer);
