import React, { useCallback } from "react";
import { View } from "react-native";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import ECQuality from "@app/routes/executor/components/ExecutorCard/variant/ECQuality";
import { requestsListStyles } from "@app/components/RequestsListStyles";
import PaginationList from "@app/components/PaginationList/PaginationList";
import { Api } from "@app/lib/constants/api";
import EmptyContainer from "@app/containers/EmptyContainer";
import { useEMRHQuality } from "./useEMRHQuality";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { EMRHQualityProps } from "./types";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<ServiceCardModel>;

const EMRHQuality = (props: EMRHQualityProps) => {
  const { handlePushProfile } = useEMRHQuality(props);
  const renderItem = useCallback<RenderItem>(({ item }) => {
    return (
      <ECQuality
        title={item.title}
        isBadge={!item.viewed_executor}
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
        <PaginationList
          config={{
            url: Api.service.getStatusService(
              "verifying",
              props.company.value.id,
            ),
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

export default React.memo(EMRHQuality);
