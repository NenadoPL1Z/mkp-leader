import React, { useCallback } from "react";
import { View } from "react-native";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import { requestsListStyles } from "@app/components/RequestsListStyles";
import PaginationList from "@app/components/PaginationList/PaginationList";
import { Api } from "@app/lib/constants/api";
import EmptyContainer from "@app/containers/EmptyContainer";
import Sort from "@app/components/Sort";
import ACWork from "@app/routes/admin/components/AdminCard/variant/ACWork";
import { useAMRHWork } from "./useAMRHWork";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { AMRHWorkProps } from "./types";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<ServiceCardModel>;

const AMRHWork = (props: AMRHWorkProps) => {
  const { handlePushProfile } = useAMRHWork(props);

  const renderItem = useCallback<RenderItem>(({ item }) => {
    return (
      <ACWork
        title={item.title}
        isBadge={!item.viewed_admin}
        variant={item.emergency ? "error" : "default"}
        onPress={() => handlePushProfile(item)}
        creationTime={formatDateTime(item.created_at || "")}
        deadline_at={formatDateTime(item.deadline_at || "")}
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
              "working",
              props.company.value.id,
            ),
            query: props.queryData,
            resetRef: props.workRefs.resetRef,
            setCardRef: props.workRefs.setCardRef,
            filterRef: props.workRefs.filterRef,
            scrollRef: props.workRefs.scrollRef,
            displayRefreshRef: props.workRefs.displayRefreshRef,
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

export default React.memo(AMRHWork);
