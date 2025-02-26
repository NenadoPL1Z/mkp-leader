import React, { useCallback } from "react";
import { View } from "react-native";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import { requestsListStyles } from "@app/components/RequestsListStyles";
import PaginationList from "@app/components/PaginationList/PaginationList";
import { Api } from "@app/lib/constants/api";
import EmptyContainer from "@app/containers/EmptyContainer";
import ACQuality from "@app/routes/admin/components/AdminCard/variant/ACQuality";
import Sort from "@app/components/Sort";
import { useAMRHQuality } from "./useAMRHQuality";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { AMRHQualityProps } from "./types";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<ServiceCardModel>;

const AMRHQuality = (props: AMRHQualityProps) => {
  const { handlePushProfile } = useAMRHQuality(props);

  const renderItem = useCallback<RenderItem>(({ item }) => {
    return (
      <ACQuality
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
              "verifying",
              props.company.value.id,
            ),
            query: props.queryData,
            resetRef: props.qualityRefs.resetRef,
            setCardRef: props.qualityRefs.setCardRef,
            filterRef: props.qualityRefs.filterRef,
            scrollRef: props.qualityRefs.scrollRef,
            displayRefreshRef: props.qualityRefs.displayRefreshRef,
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

export default React.memo(AMRHQuality);
