import React from "react";
import { Button } from "@rneui/base";
import { Colors } from "@app/theme/colors";
import { IS_ANDROID } from "@app/lib/constants";
import { styles } from "./index.styles";
import type { ButtonUIProps } from "./types";

const ButtonUI = (props: ButtonUIProps) => {
  const { variant = "base" } = props;
  const isBase = variant === "base";
  const onPress = props.loading ? undefined : props.onPress;

  return (
    <Button
      {...props}
      style={[styles[variant].root, props.style]}
      containerStyle={[styles[variant].containerStyle, props.containerStyle]}
      titleStyle={[styles[variant].titleStyle, props.titleStyle]}
      disabledTitleStyle={[
        styles[variant].disabledTitleStyle,
        props.disabledTitleStyle,
      ]}
      buttonStyle={[styles[variant].buttonStyle, props.buttonStyle]}
      disabledStyle={[styles[variant].disabledStyle, props.disabledStyle]}
      loadingProps={{
        color: isBase ? Colors.WHITE : Colors.SECONDARY,
        size: IS_ANDROID ? 24 : "small",
      }}
      onPress={onPress}
    />
  );
};

export default React.memo(ButtonUI);
