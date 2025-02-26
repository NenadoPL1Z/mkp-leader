import React, { useCallback } from "react";
import { View } from "react-native";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import { requestsListStyles } from "@app/components/RequestsListStyles";
import PaginationList from "@app/components/PaginationList/PaginationList";
import { Api } from "@app/lib/constants/api";
import EmptyContainer from "@app/containers/EmptyContainer";
import ACRefused from "@app/routes/admin/components/AdminCard/variant/ACRefused";
import Sort from "@app/components/Sort";
import { useAMRHRefused } from "./useAMRHRefused.ts";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { AMRHRefusedProps } from "./types";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<ServiceCardModel>;

const AMRHRefused = (props: AMRHRefusedProps) => {
  const { handlePushProfile } = useAMRHRefused(props);

  const renderItem = useCallback<RenderItem>(({ item }) => {
    return (
      <ACRefused
        title={item.title}
        isBadge={!item.viewed_admin}
        variant={item.emergency ? "error" : "default"}
        onPress={() => handlePushProfile(item)}
        creationTime={formatDateTime(item.created_at || "")}
      />
    );
  }, []);

  return (
    <View style={requestsListStyles.container}>
      <View style={requestsListStyles.top}>
        <View style={requestsListStyles.sort}>
          <Sort
            sort={props.sort}
            filters={props.filters}
          />
        </View>
        <PaginationList
          config={{
            url: Api.service.getStatusService(
              "refused",
              props.company.value.id,
            ),
            query: props.queryData,
            resetRef: props.refusedRefs.resetRef,
            setCardRef: props.refusedRefs.setCardRef,
            filterRef: props.refusedRefs.filterRef,
            scrollRef: props.refusedRefs.scrollRef,
            displayRefreshRef: props.refusedRefs.displayRefreshRef,
            callbackCounter: props.counter.onSetUnreadCounters,
            callbackRefresh: props.onResetAllTabs,
          }}
          renderItem={renderItem}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={[requestsListStyles.contentContainerStyle]}
          empty={{ Component: EmptyContainer }}
        />
      </View>
    </View>
  );
};

export default React.memo(AMRHRefused);
