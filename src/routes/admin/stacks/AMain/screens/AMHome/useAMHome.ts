import { AMainSN } from "@app/routes/admin/stacks/AMain/types";
import { useRef } from "react";
import { AMRequestsSN } from "@app/routes/admin/stacks/AMain/screens/AMRequests/types";
import {
  decrementCompanyCounter,
  updateCompanyCounter,
} from "@app/lib/functions/decrementCompanyCounter";
import type { RequestCompanyModel } from "@app/lib/models/RequestModel";
import type { AMHomeScreenProps } from "@app/routes/admin/stacks/AMain/types";
import type { PaginationSetCardRef } from "@app/components/PaginationList/types";

export const useAMHome = ({ navigation }: AMHomeScreenProps) => {
  const setCardRef = useRef<PaginationSetCardRef<RequestCompanyModel>>(null);

  const handleCounterDecrement = (item: RequestCompanyModel) =>
    decrementCompanyCounter(item, setCardRef.current);

  const handleCounterUpdate = (item: RequestCompanyModel) =>
    updateCompanyCounter(item, setCardRef.current);

  const onPress = (item: RequestCompanyModel) => {
    navigation.navigate(AMainSN.REQUESTS, {
      screen: AMRequestsSN.HOME,
      params: {
        company: {
          value: item,
          handleCounterDecrement: handleCounterDecrement(item),
          handleCounterUpdate: handleCounterUpdate(item),
        },
      },
    });
  };

  return {
    setCardRef,
    onPress,
  };
};
