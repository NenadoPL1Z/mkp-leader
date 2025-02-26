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
  const workRefs = usePaginationRefs<ServiceCardModel>();
  const qualityRefs = usePaginationRefs<ServiceCardModel>();
  const closedRefs = usePaginationRefs<ServiceCardModel>();
  const refusedRefs = usePaginationRefs<ServiceCardModel>();
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
      [AMRHTopBarNamespace.WORK]: company.value.tabs.working,
      [AMRHTopBarNamespace.QUALITY]: company.value.tabs.verifying,
      [AMRHTopBarNamespace.CLOSED]: company.value.tabs.closed,
      [AMRHTopBarNamespace.REFUSED]: company.value.tabs.refused,
    },
  );

  const onSetUnreadCounters = (
    tabName: AMRHTopBarNamespace,
  ): PaginationCallbackCounter => {
    return (total, count, queryData = []) => {
      setCounters((prevState) => ({ ...prevState, [tabName]: count }));

      //? HIDE REFRESH IN PAGINATION LIST
      switch (tabName) {
        case AMRHTopBarNamespace.WORK:
          workRefs.displayRefreshRef.current?.(false);
          company.handleSetStatusCounter({ working: total });
          break;
        case AMRHTopBarNamespace.QUALITY:
          qualityRefs.displayRefreshRef.current?.(false);
          company.handleSetStatusCounter({ verifying: total });
          break;
        case AMRHTopBarNamespace.CLOSED:
          closedRefs.displayRefreshRef.current?.(false);
          break;
        case AMRHTopBarNamespace.REFUSED:
          refusedRefs.displayRefreshRef.current?.(false);
          break;
      }

      //? СВЯЗАН С СОРТИРОВКОЙ И ФИЛЬТРАМИ
      //? UPDATE COMPANY COUNTER IF NOT SELECT FILTERS
      if (queryData.length === 1) {
        company.handleSetUnreadCount(tabName as never, count);
      }
    };
  };

  const onDecrementUnreadCounter = (tabName: AMRHTopBarNamespace) => {
    return () => {
      setCounters((prevState) => ({
        ...prevState,
        [tabName]: prevState[tabName] - 1,
      }));
      company.handleDecrementUnreadCount(tabName as never);
    };
  };

  const onResetAllTabs = (query = queryData) => {
    const config: ResetArg = { isResetDefault: false, resetQuery: query };

    //? DISPLAY REFRESH
    workRefs.displayRefreshRef.current?.(true);
    qualityRefs.displayRefreshRef.current?.(true);
    closedRefs.displayRefreshRef.current?.(true);
    refusedRefs.displayRefreshRef.current?.(true);

    //? RESET CONFIG
    workRefs.resetRef.current?.(config);
    qualityRefs.resetRef.current?.(config);
    closedRefs.resetRef.current?.(config);
    refusedRefs.resetRef.current?.(config);
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
      onSetUnreadCounters: onSetUnreadCounters(tab),
      onDecrementUnreadCounter: onDecrementUnreadCounter(tab),
    },
    queryData,
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
