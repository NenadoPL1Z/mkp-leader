import React from "react";
import { View } from "react-native";
import { Colors } from "@app/theme/colors.ts";
import Typography from "@app/ui/Typography";
import { useBadgeUI } from "@app/ui/BadgeUI/useBadgeUI.ts";
import { styles } from "@app/ui/BadgeUI/index.styles.ts";
import type { BadgeUIProps } from "./types";

const BadgeUI = (props: BadgeUIProps) => {
  const { backgroundColor = Colors.PRIMARY, style, isDisplay = true } = props;
  const { sizeStyle, displayCount, isDisplayCount } = useBadgeUI(props);

  if (!isDisplay) {
    return null;
  }

  return (
    <View style={[styles.container, sizeStyle, { backgroundColor }, style]}>
      {isDisplayCount && (
        <Typography
          variant="h3"
          fontWeight="700"
          color={Colors.WHITE}>
          {displayCount}
        </Typography>
      )}
    </View>
  );
};

export default React.memo(BadgeUI);
