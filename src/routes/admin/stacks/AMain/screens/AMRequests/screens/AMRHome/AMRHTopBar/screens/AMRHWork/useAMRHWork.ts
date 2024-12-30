import { AMRequestsSN } from "@app/routes/admin/stacks/AMain/screens/AMRequests/types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { AMRHWorkProps } from "./types";

export const useAMRHWork = ({ navigation, route, ...props }: AMRHWorkProps) => {
  const handlePushProfile = (card: ServiceCardModel) => {
    navigation.navigate(AMRequestsSN.INFO, {
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
