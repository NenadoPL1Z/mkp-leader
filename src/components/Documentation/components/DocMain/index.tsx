import React from "react";
import { View, StyleSheet } from "react-native";
import { Size } from "@app/lib/constants/size";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ isPadding?: boolean }>;

const DocMain = ({ children, isPadding = true }: Props) => {
  return (
    <View style={[styles.container, !isPadding && styles.resetPadding]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    paddingHorizontal: Size.SCREEN_PADDING,
  },
  resetPadding: {
    paddingHorizontal: 0,
  },
});

export default React.memo(DocMain);
