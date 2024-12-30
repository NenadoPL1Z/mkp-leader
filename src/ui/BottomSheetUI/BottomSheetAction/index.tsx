import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors";
import { Size } from "@app/lib/constants/size";

type Props = {
  title: string;
  isActive: boolean;
  onPress: () => void;
};

const BottomSheetAction = ({ title, isActive, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}>
      <Typography
        fontSize={15}
        lineHeight={20}
        fontWeight="400"
        color={isActive ? Colors.MAIN : Colors.GRAY_ELEVEN}>
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingHorizontal: Size.SCREEN_PADDING,
    justifyContent: "center",
  },
});

export default React.memo(BottomSheetAction);
