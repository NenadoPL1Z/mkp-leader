import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "@app/ui/Typography";
import { Font } from "@app/theme/font";
import type { ChildrenProps } from "@app/types/general";

type Props = ChildrenProps<{ title: string }>;

const FieldTitle = ({ title, children }: Props) => {
  return (
    <View>
      <View style={styles.title}>
        <Typography
          variant="h4"
          fontFamily={Font.TEXT}
          fontSize={15}
          lineHeight={20}
          fontWeight="600">
          {title}
        </Typography>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
  },
});

export default React.memo(FieldTitle);
