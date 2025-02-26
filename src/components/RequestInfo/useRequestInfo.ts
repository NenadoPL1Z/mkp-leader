import { useStatus } from "@app/hooks/useStatus";
import { useEffect, useMemo, useState } from "react";
import { Response } from "@app/lib/constants/response";
import { getServiceById } from "@app/lib/api/services/getServiceById.ts";
import type {
  ServiceCardModel,
  ServicesDetailModel,
} from "@app/lib/models/ServiceModel";
import type { RInfoChildrenProps, RequestInfoProps } from "./types";
import type { Nullable } from "@app/types/general";

type ViewedRole = keyof Pick<
  ServiceCardModel,
  "viewed_admin" | "viewed_executor" | "viewed_customer"
>;

export const useRequestInfo = ({
  role,
  card,
  setCardRef,
  onDecrementUnreadCounter,
}: RequestInfoProps) => {
  const viewedRole: ViewedRole = `viewed_${role}`;
  const isNew = !card[viewedRole];

  const [servicesData, setServicesData] =
    useState<Nullable<ServicesDetailModel>>(null);

  const {
    isLoading,
    isError,
    handleLoadingStatus,
    handleErrorStatus,
    handleClearStatus,
  } = useStatus();

  const callbackViews = () => {
    if (isNew && setCardRef) {
      setCardRef((prevState) => {
        const result = [];

        for (let i = 0; i < prevState.length; i++) {
          const item = prevState[i];

          if (card.id === item.id) {
            item[viewedRole] = true;
            onDecrementUnreadCounter();
          }
          result.push(item);
        }

        return result;
      });
    }
  };

  const handleUpdateService = (data: Partial<ServicesDetailModel>) => {
    setServicesData((prev) => ({
      ...(prev ? prev : ({} as never)),
      ...data,
    }));
  };

  const handleRetry = () => {
    loadData();
  };

  function loadData() {
    handleLoadingStatus();
    getServiceById(card.id)
      .then((response) => {
        handleClearStatus();
        callbackViews();
        handleUpdateService(response);
      })
      .catch(() => {
        handleErrorStatus(Response.UNKNOWN);
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  const childrenData: RInfoChildrenProps = useMemo(() => {
    return {
      data: servicesData as ServicesDetailModel,
      onUpdateData: handleUpdateService,
    };
  }, [servicesData]);

  return {
    isLoading,
    isError,
    handleRetry,
    childrenData,
  };
};
