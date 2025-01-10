import { EMRequestsSN } from "@app/routes/executor/stacks/EMain/screens/EMRequests/types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { EMRHRefuseProps } from "./types";

export const useEMRHRefuse = ({
  navigation,
  route,
  ...props
}: EMRHRefuseProps) => {
  const handlePushProfile = (card: ServiceCardModel) => {
    navigation.navigate(EMRequestsSN.INFO, {
      tabName: "refuse",
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
