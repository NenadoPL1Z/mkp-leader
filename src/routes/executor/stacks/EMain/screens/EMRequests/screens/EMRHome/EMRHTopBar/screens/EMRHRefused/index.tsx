import React, { useCallback } from "react";
import { View } from "react-native";
import { requestsListStyles } from "@app/components/RequestsListStyles";
import PaginationList from "@app/components/PaginationList/PaginationList";
import { Api } from "@app/lib/constants/api";
import EmptyContainer from "@app/containers/EmptyContainer";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import ECRefused from "@app/routes/executor/components/ExecutorCard/variant/ECRefused";
import { useEMRHRefused } from "./useEMRHRefused.ts";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { EMRHRefusedProps } from "./types";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<ServiceCardModel>;

const EMRHRefused = (props: EMRHRefusedProps) => {
  const { handlePushProfile } = useEMRHRefused(props);

  const renderItem = useCallback<RenderItem>(({ item }) => {
    return (
      <ECRefused
        title={item.title}
        isBadge={!item.viewed_executor}
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
        <PaginationList
          config={{
            url: Api.service.getStatusService(
              "refused",
              props.company.value.id,
            ),
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
          contentContainerStyle={[
            requestsListStyles.contentContainerStyle,
            requestsListStyles.contentMoreTop,
          ]}
          empty={{ Component: EmptyContainer }}
        />
      </View>
    </View>
  );
};

export default React.memo(EMRHRefused);
