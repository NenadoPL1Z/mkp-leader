import React, { useMemo } from "react";
import { FlatList } from "react-native";

import RefreshControlUI from "@app/ui/RefreshControlUI";
import PaginationEmpty from "./status/PaginationEmpty/PaginationEmpty";
import PaginationError from "./status/PaginationError/PaginationError";
import PaginationLoading from "./status/PaginationLoading/PaginationLoading";
import { styles } from "./PaginationList.styles";
import { usePaginationList } from "./usePaginationList";
import type { ExecutorModel } from "@app/lib/models/ExecutorModel";
import type { PaginationExtends, PaginationListProps } from "./types";

const PaginationList = <Item extends PaginationExtends = ExecutorModel>({
  config,
  empty = { Component: PaginationEmpty, children: null },
  ListEndBottomComponent,
  ...flatListProps
}: PaginationListProps<Item>) => {
  const { numColumns = 1 } = flatListProps;
  const { Component: EmptyComponents = PaginationEmpty } = empty;

  const {
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
  } = usePaginationList<Item>(config);

  const ListEmptyComponent = useMemo(() => {
    if (isLoading) {
      return <PaginationLoading />;
    }
    if (hasError) {
      return <PaginationError onPress={handleRetry} />;
    }
    if (isEmpty) {
      return <EmptyComponents />;
    }

    return null;
  }, [isLoading, hasError, isEmpty, handleLoadData]);

  const ListHeaderComponent = useMemo(() => {
    if (!isDisplayHeaderZeroData && !result.length) {
      return null;
    }
    return flatListProps.ListHeaderComponent;
  }, [flatListProps.ListHeaderComponent, isDisplayHeaderZeroData, result]);

  const ListFooterComponent = useMemo(() => {
    if (isLoading && resultLength) {
      return <PaginationLoading marginVertical={20} />;
    }

    if (hasError && resultLength) {
      return (
        <PaginationError
          onPress={handleLoadData}
          marginVertical={20}
        />
      );
    }

    if (isEnd && resultLength && ListEndBottomComponent) {
      return <ListEndBottomComponent />;
    }

    return null;
  }, [resultLength, isLoading, hasError, isEnd, handleLoadData]);

  return (
    <FlatList
      numColumns={numColumns}
      initialNumToRender={20}
      keyExtractor={(item) => `${item.id}`}
      onEndReachedThreshold={0.6}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...flatListProps}
      ref={(ref) => {
        scrollRef.current = ref;
      }}
      data={result}
      onEndReached={onEndReached}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      style={[styles.container, flatListProps.style]}
      contentContainerStyle={[
        styles.contentContainerStyle,
        flatListProps.contentContainerStyle,
      ]}
      refreshControl={
        isDisplayRefresh ? (
          <RefreshControlUI
            refreshing={isRefresh}
            onRefresh={handleRefresh}
          />
        ) : undefined
      }
    />
  );
};

export default React.memo(PaginationList) as <Item extends PaginationExtends>(
  props: PaginationListProps<Item>,
) => JSX.Element;
