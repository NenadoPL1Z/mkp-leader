import React, { useCallback } from "react";
import { View } from "react-native";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import { requestsListStyles } from "@app/components/RequestsListStyles";
import PaginationList from "@app/components/PaginationList/PaginationList";
import { Api } from "@app/lib/constants/api";
import EmptyContainer from "@app/containers/EmptyContainer";
import ACClosed from "@app/routes/admin/components/AdminCard/variant/ACClosed";
import Sort from "@app/components/Sort";
import { useAMRHClosed } from "./useAMRHClosed";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { ListRenderItem } from "react-native";
import type { AMRHClosedProps } from "./types";

type RenderItem = ListRenderItem<ServiceCardModel>;

const AMRHClosed = (props: AMRHClosedProps) => {
  const { handlePushProfile } = useAMRHClosed(props);

  const renderItem = useCallback<RenderItem>(({ item }) => {
    return (
      <ACClosed
        title={item.title}
        isBadge={!item.viewed_admin}
        variant="success"
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
            url: Api.service.getStatusService("closed", props.company.value.id),
            query: props.queryData,
            resetRef: props.closedRefs.resetRef,
            setCardRef: props.closedRefs.setCardRef,
            filterRef: props.closedRefs.filterRef,
            scrollRef: props.closedRefs.scrollRef,
            displayRefreshRef: props.closedRefs.displayRefreshRef,
            callbackCounter: props.counter.onChange,
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

export default React.memo(AMRHClosed);
