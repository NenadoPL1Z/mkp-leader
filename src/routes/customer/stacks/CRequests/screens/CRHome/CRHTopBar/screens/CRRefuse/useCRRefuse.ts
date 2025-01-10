import { CRequestsSN } from "../../../../../types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel.ts";
import type { CRRefuseProps } from "./types";

export const useCRRefuse = ({ navigation, route, ...props }: CRRefuseProps) => {
  const handlePushProfile = (card: ServiceCardModel, cardIndex: number) => {
    navigation.push(CRequestsSN.INFO, {
      tabName: "refuse",
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
