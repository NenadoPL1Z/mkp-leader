import React from "react";
import { Text } from "react-native";
import { useTypography } from "@app/ui/Typography/useTypography";
import type { TypographyProps } from "@app/ui/Typography/types";

const Typography = (props: TypographyProps) => {
  const { customStyle } = useTypography(props);

  return (
    <Text
      ellipsizeMode="tail"
      {...props}
      style={[customStyle, props.style]}
    />
  );
};

export default React.memo(Typography);
