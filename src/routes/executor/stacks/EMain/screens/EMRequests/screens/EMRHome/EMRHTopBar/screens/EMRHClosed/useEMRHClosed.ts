import { EMRequestsSN } from "@app/routes/executor/stacks/EMain/screens/EMRequests/types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { EMRHClosedProps } from "./types";

export const useEMRHClosed = ({
  navigation,
  route,
  ...props
}: EMRHClosedProps) => {
  const handlePushProfile = (card: ServiceCardModel) => {
    navigation.navigate(EMRequestsSN.INFO, {
      tabName: "closed",
      nextTabName: "",
      card,
      ...props,
    });
  };

  return {
    route,
    handlePushProfile,
  };
};
