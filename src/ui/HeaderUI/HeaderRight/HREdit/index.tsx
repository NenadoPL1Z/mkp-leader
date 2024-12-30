import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Edit from "@app/assets/icons/Edit.svg";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors.ts";
import type { HRChildrenProps } from "@app/ui/HeaderUI/types";

const HREdit = (props: HRChildrenProps) => {
  const { iconProps, subtitle } = props;

  return (
    <TouchableOpacity
      {...props}
      style={styles.root}>
      <Typography
        variant="h5"
        style={styles.text}
        color={Colors.GRAY_SEVEN}>
        {subtitle}
      </Typography>
      <Edit {...iconProps} />
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
  text: {
    marginRight: 8,
  },
});

export default React.memo(HREdit);
