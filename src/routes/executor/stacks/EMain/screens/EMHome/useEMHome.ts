import { useRef } from "react";
import {
  decrementCompanyCounter,
  updateCompanyCounter,
} from "@app/lib/functions/decrementCompanyCounter";
import { TopBarNames } from "@app/types/enums/TopBarNames";
import { EMainSN } from "../../types";
import { EMRequestsSN } from "../EMRequests/types";
import type { PaginationSetCardRef } from "@app/components/PaginationList/types";
import type { RequestCompanyModel } from "@app/lib/models/RequestModel";
import type { EMHomeScreenProps } from "../../types";

export const useEMHome = ({ navigation }: EMHomeScreenProps) => {
  const setCardRef = useRef<PaginationSetCardRef<RequestCompanyModel>>(null);

  const handleCounterDecrement = (item: RequestCompanyModel) =>
    decrementCompanyCounter(item, setCardRef.current, TopBarNames.WORK);

  const handleCounterUpdate = (item: RequestCompanyModel) =>
    updateCompanyCounter(item, setCardRef.current, TopBarNames.WORK);

  const onPress = (item: RequestCompanyModel) => {
    navigation.navigate(EMainSN.REQUESTS, {
      screen: EMRequestsSN.HOME,
      params: {
        company: {
          value: item,
          handleCounterUpdate: handleCounterUpdate(item),
          handleCounterDecrement: handleCounterDecrement(item),
        },
      },
    });
  };

  return {
    setCardRef,
    onPress,
  };
};
