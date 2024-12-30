import React from "react";
import { View } from "react-native";
import BadgeUI from "@app/ui/BadgeUI";
import { Colors } from "@app/theme/colors.ts";
import Typography from "@app/ui/Typography";
import Card from "@app/components/Card";
import { styles } from "../index.styles.ts";
import type { CustomerCardProps } from "../../types.ts";

const CCWork = ({
  variant,
  title,
  creationTime,
  isBadge,
  onPress,
  deadline_at,
}: CustomerCardProps) => {
  return (
    <Card
      variant={variant}
      onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.column}>
          <View style={styles.titleContainer}>
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
        </View>
      </View>
      <Typography
        variant="h4"
        numberOfLines={1}
        color={Colors.GRAY_ELEVEN}>
        Дата создания: {creationTime}
      </Typography>
      <Typography
        variant="h4"
        numberOfLines={1}
        color={Colors.GRAY_ELEVEN}>
        Срок исполнения: {deadline_at}
      </Typography>
    </Card>
  );
};

export default React.memo(CCWork);