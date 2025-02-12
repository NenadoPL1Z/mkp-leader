import { useRef } from "react";
import {
  decrementUnreadCounter,
  setUnreadCounter,
} from "@app/lib/functions/decrementCompanyCounter";
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

  const onPress = (item: RequestCompanyModel) => {
    navigation.navigate(EMainSN.REQUESTS, {
      screen: EMRequestsSN.HOME,
      params: {
        company: {
          value: item,
          handleSetUnreadCount: handleSetUnreadCount(item),
          handleDecrementUnreadCount: handleDecrementUnreadCount(item),
        },
      },
    });
  };

  return {
    setCardRef,
    onPress,
  };
};
