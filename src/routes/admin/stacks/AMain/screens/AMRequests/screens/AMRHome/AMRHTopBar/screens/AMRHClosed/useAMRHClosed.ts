import { AMRequestsSN } from "@app/routes/admin/stacks/AMain/screens/AMRequests/types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { AMRHClosedProps } from "./types";

export const useAMRHClosed = ({
  navigation,
  route,
  ...props
}: AMRHClosedProps) => {
  const handlePushProfile = (card: ServiceCardModel) => {
    navigation.navigate(AMRequestsSN.INFO, {
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
