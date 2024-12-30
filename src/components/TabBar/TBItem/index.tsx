import React from "react";
import { Pressable, View } from "react-native";
import { Colors } from "@app/theme/colors";
import Typography from "@app/ui/Typography";
import { Font } from "@app/theme/font";
import { styles } from "./index.styles";
import type { TabBarItem } from "@app/components/TabBar/types";

const TBItem = ({
  title,
  routeName,
  activeRouteName,
  Icon,
  onPress,
  isFist = false,
  isLast = false,
}: TabBarItem) => {
  const isActive = routeName === activeRouteName;

  return (
    <Pressable
      style={[styles.container, isFist && styles.first, isLast && styles.last]}
      onPress={() => onPress(routeName)}>
      <View style={styles.icon}>
        <Icon color={isActive ? Colors.SECONDARY_TWO : Colors.GRAY_FOUR} />
      </View>
      <Typography
        fontFamily={Font.TEXT}
        fontSize={10}
        lineHeight={15}
        fontWeight="400"
        color={isActive ? Colors.SECONDARY_TWO : Colors.GRAY_FOUR}>
        {title}
      </Typography>
    </Pressable>
  );
};

export default React.memo(TBItem);
