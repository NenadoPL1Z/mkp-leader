import Card from "@app/components/Card";
import { View } from "react-native";
import BadgeUI from "@app/ui/BadgeUI";
import { Colors } from "@app/theme/colors.ts";
import Typography from "@app/ui/Typography";
import React from "react";
import { getServiceDeadline } from "@app/lib/utils/servicesUtils.ts";
import { styles } from "../index.styles.ts";
import type { ExecutorCardProps } from "../../types.ts";

const ECRefusal = ({
  variant,
  title,
  creationTime,
  deadline_at,
  isBadge,
  onPress,
}: ExecutorCardProps) => {
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
        Срок исполнения: {getServiceDeadline(deadline_at)}
      </Typography>
    </Card>
  );
};

export default React.memo(ECRefusal);
