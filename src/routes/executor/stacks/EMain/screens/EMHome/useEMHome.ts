import { useRef } from "react";
import {
  decrementCompanyCounter,
  updateCompanyCounter,
} from "@app/lib/functions/decrementCompanyCounter";
import { EMainSN } from "../../types";
import { EMRequestsSN } from "../EMRequests/types";
import type { PaginationSetCardRef } from "@app/components/PaginationList/types";
import type { RequestCompanyModel } from "@app/lib/models/RequestModel";
import type { EMHomeScreenProps } from "../../types";

export const useEMHome = ({ navigation }: EMHomeScreenProps) => {
  const setCardRef = useRef<PaginationSetCardRef<RequestCompanyModel>>(null);

  const handleUnreadCountDecrement = (item: RequestCompanyModel) =>
    decrementCompanyCounter(item, setCardRef.current);

  const handleUnreadCountUpdate = (item: RequestCompanyModel) =>
    updateCompanyCounter(item, setCardRef.current);

  const onPress = (item: RequestCompanyModel) => {
    navigation.navigate(EMainSN.REQUESTS, {
      screen: EMRequestsSN.HOME,
      params: {
        company: {
          value: item,
          handleUnreadCountUpdate: handleUnreadCountUpdate(item),
          handleUnreadCountDecrement: handleUnreadCountDecrement(item),
        },
      },
    });
  };

  return {
    setCardRef,
    onPress,
  };
};
