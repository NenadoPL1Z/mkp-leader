import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Typography from "@app/ui/Typography";
import { Size } from "@app/lib/constants/size";
import { Font } from "@app/theme/font";
import { Colors } from "@app/theme/colors";
import type { DadataSuggestionItemType } from "@app/lib/models/Dadata";

type Props = {
  address: DadataSuggestionItemType;
  isActive: boolean;
  onPress: (item: DadataSuggestionItemType) => void;
};

const ACAItem = ({ address, isActive, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={styles.root}
      onPress={() => onPress(address)}>
      <Typography
        variant="h4"
        fontFamily={Font.TEXT}
        fontSize={15}
        lineHeight={20}
        fontWeight={isActive ? "600" : "400"}
        color={isActive ? Colors.SECONDARY : Colors.GRAY_ELEVEN}>
        {address.value}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 14,
    paddingHorizontal: Size.SCREEN_PADDING,
  },
});

export default React.memo(ACAItem);
