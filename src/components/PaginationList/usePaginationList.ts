import { useEffect, useMemo, useRef, useState } from "react";

import { usePagination } from "@app/hooks/usePagination";
import { PAGE_LIMIT } from "@app/lib/constants";
import { Timing } from "@app/lib/constants/timing";
import { apiInstance } from "@app/lib/http";

import type { FetchPaginationResponse } from "@app/types/general";
import type {
  PaginationConfig,
  PaginationExtends,
  PaginationFilterFunction,
  PaginationResetFunction,
  PaginationScrollRef,
} from "./types";

export const usePaginationList = <Item extends PaginationExtends>({
  url,
  query = [],
  data = {},
  initialPage = 1,
  pageLimit = PAGE_LIMIT,
  requestEnabled = true,
  axiosConfig = {},
  isDisplayRefresh = true,
  isDisplayHeaderZeroData = true,
  scrollRef: initialScrollRef,
  resetRef,
  filterRef,
  setCardRef,
  displayRefreshRef,
  callbackCounter,
  callbackRefresh,
}: PaginationConfig<Item>) => {
  const {
    page,
    isEnd,
    isLoading,
    hasError,
    handleLoading,
    handleSuccess,
    handleReject,
    handleChangePage,
    handleChangeStatus,
  } = usePagination(initialPage);

  //? REFS
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const scrollRef = initialScrollRef || useRef<PaginationScrollRef>(null);

  const [result, setResult] = useState<Item[]>([]);
  const resultLength = result.length;

  //? refresh control
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  const isEmpty = useMemo(() => {
    return !resultLength && isEnd && !isLoading;
  }, [result, isEnd, isLoading]);

  //? enable infinity scroll
  const isInfinityScroll = useMemo(() => {
    return resultLength && !isEnd && !hasError && !isEmpty && !isRefresh;
  }, [resultLength, isEnd, hasError, isEmpty, isRefresh]);

  const onEndReached = isInfinityScroll ? () => handleLoadData() : undefined;

  const handleRefresh = () => {
    if (callbackRefresh) {
      callbackRefresh();
      return;
    }

    setIsRefresh(true);

    handleLoadData(true, 1).finally(() => {
      setTimeout(() => {
        setIsRefresh(false);
      }, Timing.REFRESH);
    });
  };

  const handleRetry = () => {
    handleLoading();
    handleLoadData().finally();
  };

  const handleReset: PaginationResetFunction = ({
    resetData,
    resetQuery,
    isResetDefault = true,
    isScrollTop = false,
  }) => {
    if (isResetDefault) {
      setResult([]);
      handleChangeStatus({ isLoading: true, hasError: "", isEnd: false });
    }

    if (isScrollTop && scrollRef.current) {
      scrollRef.current.scrollToOffset({ offset: 0, animated: false });
    }

    handleLoadData(true, 1, resetData, resetQuery).finally();
  };

  const handleFilter: PaginationFilterFunction = (filterId) => {
    setResult((result) =>
      result.filter((item) => `${item.id}` !== `${filterId}`),
    );
  };

  useEffect(() => {
    if (resetRef) {
      resetRef.current = handleReset;
    }
    if (filterRef) {
      filterRef.current = handleFilter;
    }
    if (setCardRef) {
      setCardRef.current = setResult;
    }
    if (displayRefreshRef) {
      displayRefreshRef.current = setIsRefresh;
    }
    if (!requestEnabled) {
      return;
    }

    handleLoadData().finally();
  }, [requestEnabled]);

  //? isReset = initial data (page = 1)
  async function handleLoadData(
    isReset = false,
    sendPage = page,
    sendData = data,
    sendQuery = query,
  ) {
    if (!requestEnabled) {
      return;
    }

    if (isLoading && resultLength) {
      return;
    }

    try {
      if (!isReset) {
        handleLoading();
      }

      const method = Object.keys(sendData).length ? "post" : "get";
      let dataUrl = `${url}`;

      const resultData: object = {
        ...sendData,
        page: sendPage,
        limit: pageLimit,
      };

      if (method === "get") {
        dataUrl += `?page=${sendPage}&limit=${pageLimit}&${sendQuery?.join(
          "&",
        )}`;
      }

      const params = axiosConfig;

      const response =
        method === "get"
          ? await apiInstance.get<FetchPaginationResponse<Item>>(
              dataUrl,
              params,
            )
          : await apiInstance.post<FetchPaginationResponse<Item>>(
              dataUrl,
              resultData,
              params,
            );

      if (response.status === 200) {
        const {
          data: { items, total, counter },
        } = response;

        callbackCounter?.(total, counter, sendQuery);

        if (isReset) {
          const isEnd = items.length >= total;
          handleChangeStatus({ isLoading: false, isEnd, hasError: "" });
          handleChangePage(2);
          setResult(items);
        }

        if (!isReset) {
          const isEnd =
            items.length + resultLength >= total || items.length === 0;
          handleSuccess(isEnd);

          setResult((prevState) => [...prevState, ...items]);
        }
      }
    } catch {
      setTimeout(() => {
        handleReject("Непредвиденная ошибка, попробуйте ещё раз");
      }, Timing.REFRESH);
    }
  }

  return {
    result,
    resultLength,

    isEnd,
    isLoading,
    isEmpty,
    isRefresh,
    isDisplayRefresh,
    isDisplayHeaderZeroData,
    hasError,

    scrollRef,

    handleRetry,
    handleLoadData,
    handleRefresh,
    onEndReached,
  };
};
