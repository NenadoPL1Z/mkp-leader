import React from "react";
import { ActivityIndicator } from "react-native";
import { Colors } from "@app/theme/colors";
import { IS_IOS } from "@app/lib/constants";
import type { ActivityIndicatorProps } from "react-native";

type Props = ActivityIndicatorProps;

const SpinnerUI = (props: Props) => {
  return (
    <ActivityIndicator
      size={IS_IOS ? "small" : 32}
      color={Colors.WHITE}
      {...props}
    />
  );
};

export default React.memo(SpinnerUI);
