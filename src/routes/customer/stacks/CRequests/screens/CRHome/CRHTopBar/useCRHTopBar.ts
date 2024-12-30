import { useState } from "react";
import { usePaginationRefs } from "@app/hooks/usePaginationRefs";
import { CRTopBarNamespace } from "./types";
import type { ResetArg } from "@app/components/PaginationList/types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { CRHTopBarProps, CRGeneralProps } from "../../../types";

export const useCRHTopBar = ({ newRefs }: CRHTopBarProps) => {
  const workRefs = usePaginationRefs<ServiceCardModel>();
  const qualityRefs = usePaginationRefs<ServiceCardModel>();
  const closedRefs = usePaginationRefs<ServiceCardModel>();

  const [counters, setCounters] = useState<Record<CRTopBarNamespace, number>>({
    [CRTopBarNamespace.NEW]: 0,
    [CRTopBarNamespace.WORK]: 0,
    [CRTopBarNamespace.QUALITY]: 0,
    [CRTopBarNamespace.CLOSED]: 0,
  });

  const onUpdateCounters = (tabName: CRTopBarNamespace) => {
    return (count: number) => {
      setCounters((prevState) => ({ ...prevState, [tabName]: count }));

      //? HIDE REFRESH IN PAGINATION LIST
      switch (tabName) {
        case CRTopBarNamespace.NEW:
          newRefs.displayRefreshRef.current?.(false);
          break;
        case CRTopBarNamespace.WORK:
          workRefs.displayRefreshRef.current?.(false);
          break;
        case CRTopBarNamespace.QUALITY:
          qualityRefs.displayRefreshRef.current?.(false);
          break;
        case CRTopBarNamespace.CLOSED:
          closedRefs.displayRefreshRef.current?.(false);
          break;
      }
    };
  };

  const onDecrementCounter = (tabName: CRTopBarNamespace) => {
    return () => {
      setCounters((prevState) => ({
        ...prevState,
        [tabName]: prevState[tabName] - 1,
      }));
    };
  };

  const onResetAllTabs = () => {
    const config: ResetArg = { isResetDefault: false };

    //? DISPLAY REFRESH
    newRefs.displayRefreshRef.current?.(true);
    workRefs.displayRefreshRef.current?.(true);
    qualityRefs.displayRefreshRef.current?.(true);
    closedRefs.displayRefreshRef.current?.(true);

    newRefs.resetRef.current?.(config);
    workRefs.resetRef.current?.(config);
    qualityRefs.resetRef.current?.(config);
    closedRefs.resetRef.current?.(config);
  };

  const tabProps = (tab: CRTopBarNamespace): CRGeneralProps => ({
    counter: {
      value: counters[tab],
      onChange: onUpdateCounters(tab),
      onDecrementCounter: onDecrementCounter(tab),
    },
    newRefs,
    workRefs,
    qualityRefs,
    closedRefs,
    onResetAllTabs,
  });

  return {
    counters,
    tabProps,
  };
};
