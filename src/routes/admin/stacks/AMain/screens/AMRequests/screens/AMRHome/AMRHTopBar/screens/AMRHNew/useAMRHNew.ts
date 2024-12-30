import { AMRequestsSN } from "@app/routes/admin/stacks/AMain/screens/AMRequests/types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { AMRHNewProps } from "./types";

export const useAMRHNew = ({ navigation, route, ...props }: AMRHNewProps) => {
  const handlePushProfile = (card: ServiceCardModel) => {
    navigation.navigate(AMRequestsSN.INFO, {
      tabName: "new",
      nextTabName: "work",
      card,
      ...props,
    });
  };

  return {
    route,
    handlePushProfile,
  };
};
