import { CRequestsSN } from "../../../../../types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel.ts";
import type { CRNewProps } from "./types";

export const useCRNew = ({ navigation, route, ...props }: CRNewProps) => {
  const handlePushProfile = (card: ServiceCardModel, cardIndex: number) => {
    navigation.push(CRequestsSN.INFO, {
      tabName: "new",
      nextTabName: "work",
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
