import { AMRequestsSN } from "@app/routes/admin/stacks/AMain/screens/AMRequests/types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { AMRHQualityProps } from "./types";

export const useAMRHQuality = ({
  navigation,
  route,
  ...props
}: AMRHQualityProps) => {
  const handlePushProfile = (card: ServiceCardModel) => {
    navigation.navigate(AMRequestsSN.INFO, {
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
