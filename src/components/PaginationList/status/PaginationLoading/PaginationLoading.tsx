import React from "react";
import { StyleSheet, View } from "react-native";
import SpinnerUI from "@app/ui/SpinnerUI";

interface PEmptyLoadingProps {
  marginVertical?: number;
}

const PEmptyLoading = ({ marginVertical = 0 }: PEmptyLoadingProps) => {
  return (
    <View style={[styles.container, { marginVertical }]}>
      <SpinnerUI />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default React.memo(PEmptyLoading);
