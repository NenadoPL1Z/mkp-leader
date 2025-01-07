import React, { forwardRef } from "react";
import ShowIcon from "@app/assets/icons/EyeShow.svg";
import HideIcon from "@app/assets/icons/EyeHide.svg";
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
        Icon: isToggle ? HideIcon : ShowIcon,
        iconProps: { color: Colors.WHITE },
      }}
      {...props}
      ref={ref}
    />
  );
});

TFPassword.displayName = "TFPassword";

export default React.memo(TFPassword);
