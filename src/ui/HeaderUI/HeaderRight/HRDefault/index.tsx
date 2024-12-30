import { StyleSheet, TouchableOpacity } from "react-native";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors.ts";
import React from "react";
import type { HRChildrenProps } from "@app/ui/HeaderUI/types.ts";

const HRDefault = (props: HRChildrenProps) => {
  const { subtitle, subtitleColor = Colors.GRAY_SEVEN } = props;

  return (
    <TouchableOpacity
      {...props}
      style={styles.root}>
      <Typography
        variant="h5"
        color={subtitleColor}>
        {subtitle}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default React.memo(HRDefault);
