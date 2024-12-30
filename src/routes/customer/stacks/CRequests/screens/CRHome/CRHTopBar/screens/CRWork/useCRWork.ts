import { CRequestsSN } from "../../../../../types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel.ts";
import type { CRWorkProps } from "./types";

export const useCRWork = ({ navigation, route, ...props }: CRWorkProps) => {
  const handlePushProfile = (card: ServiceCardModel, cardIndex: number) => {
    navigation.push(CRequestsSN.INFO, {
      tabName: "work",
      nextTabName: "quality",
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
