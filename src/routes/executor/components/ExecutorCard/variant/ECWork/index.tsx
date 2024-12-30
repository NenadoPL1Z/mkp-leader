import React from "react";
import Card from "@app/components/Card";
import BadgeUI from "@app/ui/BadgeUI";
import { Colors } from "@app/theme/colors.ts";
import { View } from "react-native";
import Typography from "@app/ui/Typography";
import { styles } from "../index.styles.ts";
import type { ExecutorCardProps } from "../../types.ts";

const ECWork = ({
  variant,
  title,
  onPress,
  isBadge,
  deadline_at,
}: ExecutorCardProps) => {
  return (
    <Card
      variant={variant}
      onPress={onPress}>
      <View style={styles.container}>
        {isBadge && (
          <BadgeUI
            backgroundColor={Colors.PRIMARY}
            size={12}
            style={styles.badge}
          />
        )}
        <Typography
          variant="h3"
          numberOfLines={2}
          lineHeight={20}
          fontWeight="700">
          {title}
        </Typography>
      </View>
      <Typography
        variant="h4"
        numberOfLines={1}
        color={Colors.GRAY_ELEVEN}>
        Срок исполнения: {deadline_at}
      </Typography>
    </Card>
  );
};

export default React.memo(ECWork);
