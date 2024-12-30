import React, { forwardRef, useMemo } from "react";
import { Input } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";
import { TFRClear } from "@app/ui/TextField/right/TFRClear";
import { defaultStyles, styles } from "./index.styles";
import type { TextFieldRef } from "@app/types/general";
import type { TextFieldProps } from "./types";

const TextField = forwardRef<TextFieldRef, TextFieldProps>((props, ref) => {
  const {
    variant = "contained",
    required,
    errorMessage,
    isClear = true,
    right,
    left,
    error,
    onClear = () => {},
  } = props;

  const after = useMemo(() => {
    if (right) {
      return right;
    }
    if (isClear) {
      return TFRClear(!!props.value, !!props.label, onClear);
    }

    return undefined;
  }, [right, isClear, onClear, props.label, props.value]);

  const isError = useMemo(() => {
    return Boolean(errorMessage || error);
  }, [errorMessage, error]);

  return (
    <View style={defaultStyles.root}>
      <Input
        placeholderTextColor={styles[variant].placeholder.color}
        {...props}
        rightIcon={null as never}
        rightIconContainerStyle={null}
        label={`${props.label || ""}${required ? " *" : ""}`}
        ref={ref as never}
        style={[styles[variant].root, props.style]}
        containerStyle={[styles[variant].container, props.containerStyle]}
        inputContainerStyle={[
          styles[variant].inputContainer,
          props.inputContainerStyle,
          isError ? defaultStyles.inputContainerError : {},
        ]}
        inputStyle={[
          styles[variant].input,
          props.inputStyle,
          after ? [defaultStyles.inputRight, after.inputStyle] : {},
          left ? [defaultStyles.inputLeft, left.inputStyle] : {},
        ]}
        disabledInputStyle={[
          styles[variant].disabled,
          props.disabledInputStyle,
        ]}
        labelStyle={[
          styles[variant].label,
          props.labelStyle,
          isError ? defaultStyles.labelError : {},
        ]}
        errorStyle={[styles[variant].error, props.errorStyle]}
        leftIconContainerStyle={[
          styles[variant].leftIcon,
          props.leftIconContainerStyle,
        ]}
      />
      {left && (
        <TouchableOpacity
          {...left}
          style={[defaultStyles.left, left.style]}>
          <left.Icon
            width={24}
            height={24}
            {...left.iconProps}
          />
        </TouchableOpacity>
      )}
      {after && (
        <TouchableOpacity
          {...after}
          style={[defaultStyles.right, after.style]}>
          <after.Icon
            width={24}
            height={24}
            {...after.iconProps}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});

TextField.displayName = "TextField";

export default React.memo(TextField);
