import React from "react";
import { TouchableOpacity } from "react-native";

import { Colors } from "@app/theme/colors.ts";
import type { TouchableIconUIProps } from "./types";

const TouchableIconUI = ({
  size,
  Icon,
  // color,
  onPress,
  padding = 10,
  iconProps = {},
  touchableProps = {},
}: TouchableIconUIProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      {...touchableProps}
      style={[{ padding }, touchableProps?.style]}>
      <Icon
        width={size}
        height={size}
        style={{ color: Colors.WHITE }}
        {...iconProps}
      />
    </TouchableOpacity>
  );
};

export default React.memo(TouchableIconUI);
