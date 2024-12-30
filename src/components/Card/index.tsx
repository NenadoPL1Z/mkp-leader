import React from "react";
import { View, TouchableOpacity } from "react-native";
import { colorsCard } from "@app/theme/colors";
import { styles } from "./index.styles";
import type { ChildrenProps } from "@app/types/general";

export type Variant = "default" | "success" | "error";

export type OnPress = () => void;

type Props = ChildrenProps<{
  variant?: Variant | undefined;
  onPress: OnPress;
}>;

const Card = ({ variant = "default", children, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.root, styles.shadow]}
      onPress={onPress}>
      <View style={[styles.wrapper, { backgroundColor: colorsCard[variant] }]}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(Card);
