import React from "react";
import { BaseToast } from "react-native-toast-message";
import { Colors } from "@app/theme/colors";
import { styles } from "../../index.styles";
import type { BaseToastProps } from "react-native-toast-message";

const TSuccess = (props: BaseToastProps) => (
  <BaseToast
    {...props}
    style={[styles.container, props.style]}
    contentContainerStyle={[
      styles.content,
      { backgroundColor: Colors.RGBA_BACKDOOR_TWO },
      props.contentContainerStyle,
    ]}
    text1Style={[styles.text1, { color: Colors.WHITE }, props.text1Style]}
    text1Props={{ numberOfLines: 5, ...props.text1Props }}
  />
);

export default React.memo(TSuccess);
