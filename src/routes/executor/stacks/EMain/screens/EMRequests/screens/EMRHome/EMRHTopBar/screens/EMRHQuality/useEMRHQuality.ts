import { EMRequestsSN } from "@app/routes/executor/stacks/EMain/screens/EMRequests/types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { EMRHQualityProps } from "./types";

export const useEMRHQuality = ({
  navigation,
  route,
  ...props
}: EMRHQualityProps) => {
  const handlePushProfile = (card: ServiceCardModel) => {
    navigation.navigate(EMRequestsSN.INFO, {
      tabName: "quality",
      nextTabName: "closed",
      card,
      ...props,
    });
  };

  return {
    route,
    handlePushProfile,
  };
};
