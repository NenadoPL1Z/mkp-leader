import { useState } from "react";
import { usePaginationRefs } from "@app/hooks/usePaginationRefs";
import { EMRHTopBarNamespace } from "./types";
import type { ResetArg } from "@app/components/PaginationList/types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { EMRequestsHomeProps, EMRHGeneralProps } from "../../../types";

export const useEMRHTopBar = ({ company }: EMRequestsHomeProps) => {
  const workRefs = usePaginationRefs<ServiceCardModel>();
  const qualityRefs = usePaginationRefs<ServiceCardModel>();
  const closedRefs = usePaginationRefs<ServiceCardModel>();
  const refuseRefs = usePaginationRefs<ServiceCardModel>();

  const [counters, setCounters] = useState<Record<EMRHTopBarNamespace, number>>(
    {
      [EMRHTopBarNamespace.WORK]: company.value.tabs.working,
      [EMRHTopBarNamespace.QUALITY]: company.value.tabs.verifying,
      [EMRHTopBarNamespace.CLOSED]: company.value.tabs.closed,
      [EMRHTopBarNamespace.REFUSE]: company.value.tabs.refuse,
    },
  );

  const onUpdateCounters = (tabName: EMRHTopBarNamespace) => {
    return (count: number) => {
      setCounters((prevState) => ({ ...prevState, [tabName]: count }));

      //? HIDE REFRESH IN PAGINATION LIST
      switch (tabName) {
        case EMRHTopBarNamespace.WORK:
          workRefs.displayRefreshRef.current?.(false);
          break;
        case EMRHTopBarNamespace.QUALITY:
          qualityRefs.displayRefreshRef.current?.(false);
          break;
        case EMRHTopBarNamespace.CLOSED:
          closedRefs.displayRefreshRef.current?.(false);
          break;
        case EMRHTopBarNamespace.REFUSE:
          refuseRefs.displayRefreshRef.current?.(false);
          break;
      }

      company.handleCounterUpdate(tabName as never, count);
    };
  };

  const onDecrementCounter = (tabName: EMRHTopBarNamespace) => {
    return () => {
      setCounters((prevState) => ({
        ...prevState,
        [tabName]: prevState[tabName] - 1,
      }));
      company.handleCounterDecrement(tabName as never);
    };
  };

  const onResetAllTabs = () => {
    const config: ResetArg = { isResetDefault: false };

    //? DISPLAY REFRESH
    workRefs.displayRefreshRef.current?.(true);
    qualityRefs.displayRefreshRef.current?.(true);
    closedRefs.displayRefreshRef.current?.(true);
    refuseRefs.displayRefreshRef.current?.(true);

    workRefs.resetRef.current?.(config);
    qualityRefs.resetRef.current?.(config);
    closedRefs.resetRef.current?.(config);
    refuseRefs.resetRef.current?.(config);
  };

  const tabProps = (tab: EMRHTopBarNamespace): EMRHGeneralProps => ({
    company,
    counter: {
      value: counters[tab],
      onChange: onUpdateCounters(tab),
      onDecrementCounter: onDecrementCounter(tab),
    },
    workRefs,
    qualityRefs,
    closedRefs,
    refuseRefs,
    onResetAllTabs,
  });

  return {
    counters,
    tabProps,
  };
};
