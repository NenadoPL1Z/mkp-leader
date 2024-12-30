import { CRequestsSN } from "../../../../../types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel.ts";
import type { CRQualityProps } from "./types";

export const useCRQuality = ({
  navigation,
  route,
  ...props
}: CRQualityProps) => {
  const handlePushProfile = (card: ServiceCardModel, cardIndex: number) => {
    navigation.push(CRequestsSN.INFO, {
      tabName: "quality",
      nextTabName: "closed",
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
