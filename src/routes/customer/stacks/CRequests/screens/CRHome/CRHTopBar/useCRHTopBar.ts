import { useState } from "react";
import { usePaginationRefs } from "@app/hooks/usePaginationRefs";
import { CRTopBarNamespace } from "./types";
import type { ResetArg } from "@app/components/PaginationList/types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { CRHTopBarProps, CRGeneralProps } from "../../../types";

export const useCRHTopBar = ({ workRefs }: CRHTopBarProps) => {
  const qualityRefs = usePaginationRefs<ServiceCardModel>();
  const closedRefs = usePaginationRefs<ServiceCardModel>();
  const refusalRefs = usePaginationRefs<ServiceCardModel>();

  const [counters, setCounters] = useState<Record<CRTopBarNamespace, number>>({
    [CRTopBarNamespace.WORK]: 0,
    [CRTopBarNamespace.QUALITY]: 0,
    [CRTopBarNamespace.CLOSED]: 0,
    [CRTopBarNamespace.REFUSAL]: 0,
  });

  const onUpdateCounters = (tabName: CRTopBarNamespace) => {
    return (count: number) => {
      setCounters((prevState) => ({ ...prevState, [tabName]: count }));

      //? HIDE REFRESH IN PAGINATION LIST
      switch (tabName) {
        case CRTopBarNamespace.WORK:
          workRefs.displayRefreshRef.current?.(false);
          break;
        case CRTopBarNamespace.QUALITY:
          qualityRefs.displayRefreshRef.current?.(false);
          break;
        case CRTopBarNamespace.CLOSED:
          closedRefs.displayRefreshRef.current?.(false);
          break;
        case CRTopBarNamespace.REFUSAL:
          refusalRefs.displayRefreshRef.current?.(false);
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
    workRefs.displayRefreshRef.current?.(true);
    qualityRefs.displayRefreshRef.current?.(true);
    closedRefs.displayRefreshRef.current?.(true);
    refusalRefs.displayRefreshRef.current?.(true);

    workRefs.resetRef.current?.(config);
    qualityRefs.resetRef.current?.(config);
    closedRefs.resetRef.current?.(config);
    refusalRefs.resetRef.current?.(config);
  };

  const tabProps = (tab: CRTopBarNamespace): CRGeneralProps => ({
    counter: {
      value: counters[tab],
      onChange: onUpdateCounters(tab),
      onDecrementCounter: onDecrementCounter(tab),
    },
    workRefs,
    qualityRefs,
    closedRefs,
    refusalRefs,
    onResetAllTabs,
  });

  return {
    counters,
    tabProps,
  };
};
