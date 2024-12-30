import React from "react";
import Typography from "@app/ui/Typography";
import { StyleSheet } from "react-native";
import type { TypographyProps } from "@app/ui/Typography/types";

const PopupText = (props: TypographyProps) => {
  return (
    <Typography
      variant="h3"
      {...props}
      style={[styles.root, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    textAlign: "center",
  },
});

export default React.memo(PopupText);
