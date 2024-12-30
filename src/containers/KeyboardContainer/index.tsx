import React from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { IS_ANDROID } from "@app/lib/constants";
import type { ChildrenProps } from "@app/types/general";

const KeyboardContainer = ({ children }: ChildrenProps) => {
  if (IS_ANDROID) {
    return <View style={styles.view}>{children}</View>;
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.avoid}>
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  avoid: {
    flex: 1,
  },
  view: {
    flexGrow: 1,
  },
});

export default React.memo(KeyboardContainer);
