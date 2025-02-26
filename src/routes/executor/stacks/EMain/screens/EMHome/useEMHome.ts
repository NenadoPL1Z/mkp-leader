import { useRef } from "react";
import {
  decrementUnreadCounter,
  setUnreadCounter,
  updateStatusCounter,
  setStatusCounter,
} from "@app/lib/functions/companyCounters";
import { EMainSN } from "../../types";
import { EMRequestsSN } from "../EMRequests/types";
import type { PaginationSetCardRef } from "@app/components/PaginationList/types";
import type { RequestCompanyModel } from "@app/lib/models/RequestModel";
import type { EMHomeScreenProps } from "../../types";

export const useEMHome = ({ navigation }: EMHomeScreenProps) => {
  const setCardRef = useRef<PaginationSetCardRef<RequestCompanyModel>>(null);

  const handleDecrementUnreadCount = (item: RequestCompanyModel) =>
    decrementUnreadCounter(item, setCardRef.current);

  const handleSetUnreadCount = (item: RequestCompanyModel) =>
    setUnreadCounter(item, setCardRef.current);

  const handleUpdateStatusCounter = (item: RequestCompanyModel) =>
    updateStatusCounter(item, setCardRef.current);

  const handleSetStatusCounter = (item: RequestCompanyModel) =>
    setStatusCounter(item, setCardRef.current);

  const onPress = (item: RequestCompanyModel) => {
    navigation.navigate(EMainSN.REQUESTS, {
      screen: EMRequestsSN.HOME,
      params: {
        company: {
          value: item,
          handleSetUnreadCount: handleSetUnreadCount(item),
          handleDecrementUnreadCount: handleDecrementUnreadCount(item),
          handleUpdateStatusCounter: handleUpdateStatusCounter(item),
          handleSetStatusCounter: handleSetStatusCounter(item),
        },
      },
    });
  };

  return {
    setCardRef,
    onPress,
  };
};
