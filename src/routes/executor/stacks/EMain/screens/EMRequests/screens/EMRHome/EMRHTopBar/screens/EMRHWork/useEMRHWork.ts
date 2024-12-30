import { EMRequestsSN } from "@app/routes/executor/stacks/EMain/screens/EMRequests/types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { EMRHWorkProps } from "./types";

export const useEMRHWork = ({ navigation, route, ...props }: EMRHWorkProps) => {
  const handlePushProfile = (card: ServiceCardModel) => {
    navigation.navigate(EMRequestsSN.INFO, {
      tabName: "work",
      nextTabName: "quality",
      card,
      ...props,
    });
  };

  return {
    route,
    handlePushProfile,
  };
};
