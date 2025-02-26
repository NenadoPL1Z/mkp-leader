import { EMRequestsSN } from "@app/routes/executor/stacks/EMain/screens/EMRequests/types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { EMRHRefusedProps } from "./types";

export const useEMRHRefused = ({
  navigation,
  route,
  ...props
}: EMRHRefusedProps) => {
  const handlePushProfile = (card: ServiceCardModel) => {
    navigation.navigate(EMRequestsSN.INFO, {
      tabName: "refused",
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
