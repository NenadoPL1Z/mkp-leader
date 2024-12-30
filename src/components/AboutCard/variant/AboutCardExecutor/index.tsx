import React from "react";
import AboutCard from "@app/components/AboutCard";
import { formatPhoneNumber } from "@app/lib/functions/formatPhoneNumber";
import type { AboutCardProps } from "@app/components/AboutCard/types";
import type { ExecutorModel } from "@app/lib/models/ExecutorModel";

type Props = ExecutorModel & {
  onPress: (item: ExecutorModel) => void;
  nativeProps?: Partial<AboutCardProps>;
};

const AboutCardExecutor = (props: Props) => {
  const { name, phone, onPress, nativeProps = {} } = props;

  return (
    <AboutCard
      {...nativeProps}
      title={name || ""}
      subtitle={formatPhoneNumber(phone || "")}
      avatar={{
        name: name || "",
        phone: phone || "",
        size: 40,
      }}
      onPress={() => onPress(props)}
    />
  );
};

export default React.memo(AboutCardExecutor);
