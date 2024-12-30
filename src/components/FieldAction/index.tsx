import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors";

type Props = {
  title: string;
  onPress: () => void;
};

const FieldAction = ({ title, onPress }: Props) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.press}
        onPress={onPress}>
        <Typography
          variant="h5"
          color={Colors.SECONDARY}>
          {title}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "flex-end",
  },
  press: {},
});

export default React.memo(FieldAction);
