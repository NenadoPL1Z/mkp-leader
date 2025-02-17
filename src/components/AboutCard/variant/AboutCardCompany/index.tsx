import React from "react";
import AboutCard from "@app/components/AboutCard";
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
        size: 40,
        isDefault: true,
      }}
      onPress={() => onPress(props)}
    />
  );
};

export default React.memo(AboutCardCompany);
