import React from "react";
import { RefreshControl } from "react-native";
import { Colors } from "@app/theme/colors";
import type { RefreshControlProps } from "react-native";

const RefreshControlUI = (props: RefreshControlProps) => {
  return (
    <RefreshControl
      colors={[Colors.MAIN]}
      tintColor={Colors.MAIN}
      {...props}
    />
  );
};

export default React.memo(RefreshControlUI);
