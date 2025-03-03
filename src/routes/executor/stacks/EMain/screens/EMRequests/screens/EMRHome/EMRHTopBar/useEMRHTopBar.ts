import { useState } from "react";
import { usePaginationRefs } from "@app/hooks/usePaginationRefs";
import { EMRHTopBarNamespace } from "./types";
import type {
  PaginationCallbackCounter,
  ResetArg,
} from "@app/components/PaginationList/types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { EMRequestsHomeProps, EMRHGeneralProps } from "../../../types";

export const useEMRHTopBar = ({ company }: EMRequestsHomeProps) => {
  const workRefs = usePaginationRefs<ServiceCardModel>();
  const qualityRefs = usePaginationRefs<ServiceCardModel>();
  const closedRefs = usePaginationRefs<ServiceCardModel>();
  const refusedRefs = usePaginationRefs<ServiceCardModel>();

  const [counters, setCounters] = useState<Record<EMRHTopBarNamespace, number>>(
    {
      [EMRHTopBarNamespace.WORK]: company.value.tabs.working,
      [EMRHTopBarNamespace.QUALITY]: company.value.tabs.verifying,
      [EMRHTopBarNamespace.CLOSED]: company.value.tabs.closed,
      [EMRHTopBarNamespace.REFUSED]: company.value.tabs.refused,
    },
  );

  const onSetUnreadCounters = (
    tabName: EMRHTopBarNamespace,
  ): PaginationCallbackCounter => {
    return (total, count) => {
      setCounters((prevState) => ({ ...prevState, [tabName]: count }));

      //? HIDE REFRESH IN PAGINATION LIST
      switch (tabName) {
        case EMRHTopBarNamespace.WORK:
          workRefs.displayRefreshRef.current?.(false);
          company.handleSetStatusCounter({ working: total });
          break;
        case EMRHTopBarNamespace.QUALITY:
          qualityRefs.displayRefreshRef.current?.(false);
          company.handleSetStatusCounter({ verifying: total });
          break;
        case EMRHTopBarNamespace.CLOSED:
          closedRefs.displayRefreshRef.current?.(false);
          break;
        case EMRHTopBarNamespace.REFUSED:
          refusedRefs.displayRefreshRef.current?.(false);
          break;
      }

      company.handleSetUnreadCount(tabName as never, count);
    };
  };

  const onDecrementUnreadCounter = (tabName: EMRHTopBarNamespace) => {
    return () => {
      setCounters((prevState) => ({
        ...prevState,
        [tabName]: prevState[tabName] - 1,
      }));
      company.handleDecrementUnreadCount(tabName as never);
    };
  };

  const onResetAllTabs = () => {
    const config: ResetArg = { isResetDefault: false };

    //? DISPLAY REFRESH
    workRefs.displayRefreshRef.current?.(true);
    qualityRefs.displayRefreshRef.current?.(true);
    closedRefs.displayRefreshRef.current?.(true);
    refusedRefs.displayRefreshRef.current?.(true);

    workRefs.resetRef.current?.(config);
    qualityRefs.resetRef.current?.(config);
    closedRefs.resetRef.current?.(config);
    refusedRefs.resetRef.current?.(config);
  };

  const tabProps = (tab: EMRHTopBarNamespace): EMRHGeneralProps => ({
    company,
    counter: {
      value: counters[tab],
      onSetUnreadCounters: onSetUnreadCounters(tab),
      onDecrementUnreadCounter: onDecrementUnreadCounter(tab),
    },
    workRefs,
    qualityRefs,
    closedRefs,
    refusedRefs,
    onResetAllTabs,
  });

  return {
    counters,
    tabProps,
  };
};
