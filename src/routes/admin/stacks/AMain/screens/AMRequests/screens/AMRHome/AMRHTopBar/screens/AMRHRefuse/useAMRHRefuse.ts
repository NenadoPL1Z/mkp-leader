import { AMRequestsSN } from "@app/routes/admin/stacks/AMain/screens/AMRequests/types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { AMRHRefuseProps } from "./types";

export const useAMRHRefuse = ({
  navigation,
  route,
  ...props
}: AMRHRefuseProps) => {
  const handlePushProfile = (card: ServiceCardModel) => {
    navigation.navigate(AMRequestsSN.INFO, {
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
