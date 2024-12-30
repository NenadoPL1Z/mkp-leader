import React, { useCallback } from "react";
import { View } from "react-native";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import { requestsListStyles } from "@app/components/RequestsListStyles";
import PaginationList from "@app/components/PaginationList/PaginationList";
import { Api } from "@app/lib/constants/api";
import EmptyContainer from "@app/containers/EmptyContainer";
import ACNew from "@app/routes/admin/components/AdminCard/variant/ACNew";
import Sort from "@app/components/Sort";
import { useAMRHNew } from "./useAMRHNew";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { AMRHNewProps } from "./types";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<ServiceCardModel>;

const AMRHNew = (props: AMRHNewProps) => {
  const { handlePushProfile } = useAMRHNew(props);

  const renderItem = useCallback<RenderItem>(({ item }) => {
    return (
      <ACNew
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
            url: Api.service.getStatusService("new", props.company.value.id),
            query: props.queryData,
            resetRef: props.newRefs.resetRef,
            setCardRef: props.newRefs.setCardRef,
            filterRef: props.newRefs.filterRef,
            scrollRef: props.newRefs.scrollRef,
            displayRefreshRef: props.newRefs.displayRefreshRef,
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

export default React.memo(AMRHNew);
