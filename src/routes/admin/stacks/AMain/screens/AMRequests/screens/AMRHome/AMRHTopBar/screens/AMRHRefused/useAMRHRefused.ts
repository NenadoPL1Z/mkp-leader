import { AMRequestsSN } from "@app/routes/admin/stacks/AMain/screens/AMRequests/types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { AMRHRefusedProps } from "./types";

export const useAMRHRefused = ({
  navigation,
  route,
  ...props
}: AMRHRefusedProps) => {
  const handlePushProfile = (card: ServiceCardModel) => {
    navigation.navigate(AMRequestsSN.INFO, {
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
