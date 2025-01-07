import React from "react";
import { CheckBox } from "@rneui/themed";
import CheckedCheckBoxIcon from "@app/assets/icons/dist/CheckBoxChecked";
import CheckBoxDisabledIcon from "@app/assets/icons/dist/CheckBoxDisabled";
import CheckBoxIcon from "@app/assets/icons/dist/CheckBox";
import { Colors } from "@app/theme/colors";
import { styles } from "./index.styles";
import type { CheckBoxProps } from "@rneui/themed";
import type { CheckBoxIconProps } from "@rneui/base/dist/CheckBox/components/CheckBoxIcon";

type Props = CheckBoxIconProps & Omit<CheckBoxProps, "children">;

const CheckBoxUI = (props: Props) => {
  const activeColor = props.disabled ? Colors.GRAY_TEN : Colors.MAIN;

  return (
    <CheckBox
      {...props}
      style={[styles.root, props.style]}
      containerStyle={[styles.containerStyle, props.containerStyle]}
      wrapperStyle={[styles.wrapperStyle, props.wrapperStyle]}
      disabledStyle={[styles.disabledStyle, props.disabledStyle]}
      textStyle={[styles.textStyle, props.textStyle]}
      disabledTitleStyle={[styles.disabledTitleStyle, props.disabledTitleStyle]}
      checkedIcon={
        props.checkedIcon || (
          <CheckedCheckBoxIcon
            color={activeColor}
            width={20}
            height={20}
          />
        )
      }
      uncheckedIcon={
        props.uncheckedIcon ||
        (props.disabled ? (
          <CheckBoxDisabledIcon
            width={20}
            height={20}
          />
        ) : (
          <CheckBoxIcon
            width={20}
            height={20}
          />
        ))
      }
    />
  );
};

export default React.memo(CheckBoxUI);
