import { AMainSN } from "@app/routes/admin/stacks/AMain/types";
import { useRef } from "react";
import { AMRequestsSN } from "@app/routes/admin/stacks/AMain/screens/AMRequests/types";
import {
  decrementUnreadCounter,
  setUnreadCounter,
} from "@app/lib/functions/decrementCompanyCounter";
import type { RequestCompanyModel } from "@app/lib/models/RequestModel";
import type { AMHomeScreenProps } from "@app/routes/admin/stacks/AMain/types";
import type { PaginationSetCardRef } from "@app/components/PaginationList/types";

export const useAMHome = ({ navigation }: AMHomeScreenProps) => {
  const setCardRef = useRef<PaginationSetCardRef<RequestCompanyModel>>(null);

  const handleDecrementUnreadCount = (item: RequestCompanyModel) =>
    decrementUnreadCounter(item, setCardRef.current);

  const handleSetUnreadCount = (item: RequestCompanyModel) =>
    setUnreadCounter(item, setCardRef.current);

  const onPress = (item: RequestCompanyModel) => {
    navigation.navigate(AMainSN.REQUESTS, {
      screen: AMRequestsSN.HOME,
      params: {
        company: {
          value: item,
          handleDecrementUnreadCount: handleDecrementUnreadCount(item),
          handleSetUnreadCount: handleSetUnreadCount(item),
        },
      },
    });
  };

  return {
    setCardRef,
    onPress,
  };
};
