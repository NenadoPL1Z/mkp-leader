import React from "react";
import AboutCard from "@app/components/AboutCard";
import { View } from "react-native";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors.ts";
import BadgeUI from "@app/ui/BadgeUI";
import { styles } from "./styles.ts";
import type { RequestCompanyModel } from "@app/lib/models/RequestModel";

type Props = RequestCompanyModel & {
  onPress: (item: RequestCompanyModel) => void;
};

const AboutCardCompany = (props: Props) => {
  const { id, name, address, badge, onPress, tabs } = props;

  const isDisplayMark = Boolean(
    tabs.working || tabs.verifying || tabs.closed || tabs.refused,
  );
  return (
    <AboutCard
      title={name}
      subtitle={address || ""}
      badge={badge}
      isDisplayMark={isDisplayMark}
      containerStyle={{ paddingVertical: 10 }}
      avatar={{
        name: name,
        phone: `${id}`,
        isDefault: true,
      }}
      onPress={() => onPress(props)}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Typography
            variant="h4"
            fontSize={12}
            lineHeight={14}
            color={Colors.GRAY_SIX}>
            В работе -
          </Typography>
          <BadgeUI
            count={badge.working}
            isZero={true}
            typographyStyles={{ fontSize: 15 }}
          />
        </View>
        <View style={styles.wrapper}>
          <Typography
            variant="h4"
            fontSize={12}
            lineHeight={14}
            color={Colors.GRAY_SIX}>
            Контроль качества -
          </Typography>
          <BadgeUI
            count={badge.verifying}
            isZero={true}
            backgroundColor={Colors.GRAY_TWO}
            typographyStyles={{ fontSize: 15 }}
          />
        </View>
      </View>
    </AboutCard>
  );
};

export default React.memo(AboutCardCompany);
