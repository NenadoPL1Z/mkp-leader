import React from "react";
import { ErrorToast } from "react-native-toast-message";
import { Colors } from "@app/theme/colors";
import { styles } from "../../index.styles";
import type { BaseToastProps } from "react-native-toast-message";

const TError = (props: BaseToastProps) => (
  <ErrorToast
    {...props}
    style={[styles.container, props.style]}
    contentContainerStyle={[
      styles.content,
      { backgroundColor: Colors.WHITE_TWO },
      props.contentContainerStyle,
    ]}
    text1Style={[styles.text1, { color: Colors.GRAY_TWO }, props.text1Style]}
    text1Props={{ numberOfLines: 5, ...props.text1Props }}
  />
);

export default React.memo(TError);
