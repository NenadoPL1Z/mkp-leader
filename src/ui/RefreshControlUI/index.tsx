import React from "react";
import { RefreshControl } from "react-native";
import { Colors } from "@app/theme/colors";
import type { RefreshControlProps } from "react-native";

const RefreshControlUI = (props: RefreshControlProps) => {
  return (
    <RefreshControl
      colors={[Colors.WHITE]}
      tintColor={Colors.WHITE}
      {...props}
    />
  );
};

export default React.memo(RefreshControlUI);
