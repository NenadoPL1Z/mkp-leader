import React, { useCallback } from "react";
import { View } from "react-native";
import { requestsListStyles } from "@app/components/RequestsListStyles";
import PaginationList from "@app/components/PaginationList/PaginationList";
import { Api } from "@app/lib/constants/api";
import EmptyContainer from "@app/containers/EmptyContainer";
import ECWork from "@app/routes/executor/components/ExecutorCard/variant/ECWork";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import { useEMRHWork } from "./useEMRHWork";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { EMRHWorkProps } from "./types";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<ServiceCardModel>;

const EMRHWork = (props: EMRHWorkProps) => {
  const { handlePushProfile } = useEMRHWork(props);
  const renderItem = useCallback<RenderItem>(({ item }) => {
    return (
      <ECWork
        title={item.title}
        isBadge={!item.viewed_executor}
        variant={item.emergency ? "error" : "default"}
        onPress={() => handlePushProfile(item)}
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
              "working",
              props.company.value.id,
            ),
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

export default React.memo(EMRHWork);
