import { CRequestsSN } from "../../../../../types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel.ts";
import type { CRRefusedProps } from "./types";

export const useCRRefused = ({
  navigation,
  route,
  ...props
}: CRRefusedProps) => {
  const handlePushProfile = (card: ServiceCardModel, cardIndex: number) => {
    navigation.push(CRequestsSN.INFO, {
      tabName: "refused",
      nextTabName: "",
      card,
      cardIndex,
      ...props,
    });
  };

  return {
    route,
    handlePushProfile,
  };
};
