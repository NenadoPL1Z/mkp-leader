import { CRequestsSN } from "../../../../../types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel.ts";
import type { CRClosedProps } from "./types";

export const useCRClosed = ({ navigation, route, ...props }: CRClosedProps) => {
  const handlePushProfile = (card: ServiceCardModel, cardIndex: number) => {
    navigation.push(CRequestsSN.INFO, {
      tabName: "closed",
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
