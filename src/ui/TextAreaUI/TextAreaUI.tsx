import React, { forwardRef } from "react";
import { View } from "react-native";

import TextField from "@app/ui/TextField";
import Typography from "@app/ui/Typography";
import { styles } from "@app/ui/TextAreaUI/styles.ts";
import type { TextStyle } from "react-native";
import type { TextFieldRef } from "@app/types/general.ts";
import type { TextAreaUIProps } from "./types";

const TextAreaUI = forwardRef<TextFieldRef, TextAreaUIProps>(
  ({ children, inputStyle = {}, ...props }, ref) => {
    return (
      <View>
        <TextField
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          /*@ts-expect-error*/
          ref={ref}
          numberOfLines={4}
          multiline={true}
          scrollEnabled={true}
          inputContainerStyle={[styles.container, props?.inputContainerStyle]}
          inputStyle={{ ...styles.inputStyle, ...(inputStyle as TextStyle) }}
          {...props}
        />
        {children && (
          <Typography
            fontSize={14}
            style={styles.descriptionInfo}>
            {children}
          </Typography>
        )}
      </View>
    );
  },
);

TextAreaUI.displayName = "TextAreaUI";
export default React.memo(TextAreaUI);
