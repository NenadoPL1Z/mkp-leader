import React from "react";
import AboutCard from "@app/components/AboutCard";
import { formatPhoneNumber } from "@app/lib/functions/formatPhoneNumber";
import { StarIcon } from "@app/assets/icons/dist";
import type { AboutCardProps } from "@app/components/AboutCard/types";
import type { ExecutorModel } from "@app/lib/models/ExecutorModel";

type Props = ExecutorModel & {
  executorDefaultId?: number | null;
  onPress?: (item: ExecutorModel) => void;
  nativeProps?: Partial<AboutCardProps>;
};

const AboutCardExecutor = (props: Props) => {
  const {
    id,
    name,
    phone,
    onPress,
    executorDefaultId,
    nativeProps = {},
  } = props;
  const isDefaultExecutor = id && executorDefaultId && id === executorDefaultId;

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
      isTouch={!!onPress}
      onPress={() => onPress && onPress(props)}>
      {isDefaultExecutor ? <StarIcon /> : null}
    </AboutCard>
  );
};

export default React.memo(AboutCardExecutor);
