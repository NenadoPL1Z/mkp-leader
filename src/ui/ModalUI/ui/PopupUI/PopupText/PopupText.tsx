import React from "react";
import Typography from "@app/ui/Typography";
import { StyleSheet } from "react-native";
import { Colors } from "@app/theme/colors.ts";
import type { TypographyProps } from "@app/ui/Typography/types";

const PopupText = (props: TypographyProps) => {
  return (
    <Typography
      variant="h3"
      {...props}
      style={[styles.root, props.style]}
      color={Colors.TEXT}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    textAlign: "center",
  },
});

export default React.memo(PopupText);
