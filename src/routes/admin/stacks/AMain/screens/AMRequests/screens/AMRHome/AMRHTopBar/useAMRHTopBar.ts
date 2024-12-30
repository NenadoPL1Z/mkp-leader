import { useEffect, useMemo, useRef, useState } from "react";
import { sortDataInitial } from "@app/components/Sort/constants";
import { usePaginationRefs } from "@app/hooks/usePaginationRefs";
import { AMRHTopBarNamespace } from "./types";
import { createQuery } from "./helpers";
import type {
  PaginationCallbackCounter,
  ResetArg,
} from "@app/components/PaginationList/types";
import type {
  Filter,
  FilterChange,
  Sort,
  SortChange,
} from "@app/components/Sort/types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { AMRequestsHomeProps, AMRHGeneralProps } from "../../../types";

export const useAMRHTopBar = ({ company }: AMRequestsHomeProps) => {
  const newRefs = usePaginationRefs<ServiceCardModel>();
  const workRefs = usePaginationRefs<ServiceCardModel>();
  const qualityRefs = usePaginationRefs<ServiceCardModel>();
  const closedRefs = usePaginationRefs<ServiceCardModel>();
  const isFirstQuery = useRef(true);

  const [sort, setSort] = useState<Sort>(sortDataInitial);
  const [filters, setFilters] = useState<Filter>({
    isEmergency: false,
    isCustomPosition: false,
  });

  const queryData = useMemo(
    () =>
      createQuery(sort.value, filters.isEmergency, filters.isCustomPosition),
    [sort.value, filters.isEmergency, filters.isCustomPosition],
  );

  const [counters, setCounters] = useState<Record<AMRHTopBarNamespace, number>>(
    {
      [AMRHTopBarNamespace.NEW]: company.value.tabs.new,
      [AMRHTopBarNamespace.WORK]: company.value.tabs.working,
      [AMRHTopBarNamespace.QUALITY]: company.value.tabs.verifying,
      [AMRHTopBarNamespace.CLOSED]: company.value.tabs.closed,
    },
  );

  const onUpdateCounters = (
    tabName: AMRHTopBarNamespace,
  ): PaginationCallbackCounter => {
    return (count, queryData = []) => {
      setCounters((prevState) => ({ ...prevState, [tabName]: count }));

      //? HIDE REFRESH IN PAGINATION LIST
      switch (tabName) {
        case AMRHTopBarNamespace.NEW:
          newRefs.displayRefreshRef.current?.(false);
          break;
        case AMRHTopBarNamespace.WORK:
          workRefs.displayRefreshRef.current?.(false);
          break;
        case AMRHTopBarNamespace.QUALITY:
          qualityRefs.displayRefreshRef.current?.(false);
          break;
        case AMRHTopBarNamespace.CLOSED:
          closedRefs.displayRefreshRef.current?.(false);
          break;
      }

      //? СВЯЗАН С СОРТИРОВКОЙ И ФИЛЬТРАМИ
      //? UPDATE COMPANY COUNTER IF NOT SELECT FILTERS
      if (queryData.length === 1) {
        company.handleCounterUpdate(tabName as never, count);
      }
    };
  };

  const onDecrementCounter = (tabName: AMRHTopBarNamespace) => {
    return () => {
      setCounters((prevState) => ({
        ...prevState,
        [tabName]: prevState[tabName] - 1,
      }));
      company.handleCounterDecrement(tabName as never);
    };
  };

  const onResetAllTabs = (query = queryData) => {
    const config: ResetArg = { isResetDefault: false, resetQuery: query };

    //? DISPLAY REFRESH
    newRefs.displayRefreshRef.current?.(true);
    workRefs.displayRefreshRef.current?.(true);
    qualityRefs.displayRefreshRef.current?.(true);
    closedRefs.displayRefreshRef.current?.(true);

    //? RESET CONFIG
    newRefs.resetRef.current?.(config);
    workRefs.resetRef.current?.(config);
    qualityRefs.resetRef.current?.(config);
    closedRefs.resetRef.current?.(config);
  };

  const onChangeSort: SortChange = (sort) => {
    setSort(sort);
  };

  const onChangeFilter: FilterChange = (data) => {
    setFilters((prevState) => ({ ...prevState, ...data }));
  };

  useEffect(() => {
    if (!isFirstQuery.current) {
      onResetAllTabs(queryData);
    }
    isFirstQuery.current = false;
  }, [queryData]);

  const tabProps = (tab: AMRHTopBarNamespace): AMRHGeneralProps => ({
    company,
    sort: {
      value: sort,
      onChange: onChangeSort,
    },
    filters: {
      value: filters,
      onChange: onChangeFilter,
    },
    counter: {
      value: counters[tab],
      onChange: onUpdateCounters(tab),
      onDecrementCounter: onDecrementCounter(tab),
    },
    queryData,
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
