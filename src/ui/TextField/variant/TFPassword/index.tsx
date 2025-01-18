import React, { forwardRef } from "react";
import { EyeHideIcon, EyeShowIcon } from "@app/assets/icons/dist";
import { Colors } from "@app/theme/colors";
import { useToggle } from "@app/hooks/useToggle";
import TextField from "../../index";
import type { TextFieldRef } from "@app/types/general";
import type { TextFieldProps } from "../../types";

const TFPassword = forwardRef<TextFieldRef, TextFieldProps>((props, ref) => {
  const { isToggle, handleToggle } = useToggle();

  return (
    <TextField
      autoCorrect={false}
      secureTextEntry={!isToggle}
      right={{
        onPress: handleToggle,
        Icon: isToggle ? EyeHideIcon : EyeShowIcon,
        iconProps: { color: Colors.WHITE },
      }}
      {...props}
      ref={ref}
    />
  );
});

TFPassword.displayName = "TFPassword";

export default React.memo(TFPassword);
