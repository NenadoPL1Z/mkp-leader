import React from "react";
import Card from "@app/components/Card";
import { View } from "react-native";
import { styles } from "@app/routes/admin/components/AdminCard/variant/index.styles.ts";
import BadgeUI from "@app/ui/BadgeUI";
import { Colors } from "@app/theme/colors.ts";
import Typography from "@app/ui/Typography";
import type { AdminCardProps } from "@app/routes/admin/components/AdminCard/types.ts";

const ACWork = ({
  variant,
  title,
  onPress,
  isBadge,
  creationTime,
  deadline_at,
}: AdminCardProps) => {
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

export default React.memo(ACWork);