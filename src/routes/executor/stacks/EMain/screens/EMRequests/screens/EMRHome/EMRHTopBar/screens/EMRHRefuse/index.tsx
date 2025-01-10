import React, { useCallback } from "react";
import { View } from "react-native";
import { requestsListStyles } from "@app/components/RequestsListStyles";
import PaginationList from "@app/components/PaginationList/PaginationList";
import { Api } from "@app/lib/constants/api";
import EmptyContainer from "@app/containers/EmptyContainer";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import ECClosed from "@app/routes/executor/components/ExecutorCard/variant/ECClosed";
import { useEMRHRefuse } from "./useEMRHRefuse.ts";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { EMRHRefuseProps } from "./types";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<ServiceCardModel>;

const EMRHRefuse = (props: EMRHRefuseProps) => {
  const { handlePushProfile } = useEMRHRefuse(props);

  const renderItem = useCallback<RenderItem>(({ item }) => {
    return (
      <ECClosed
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
            url: Api.service.getStatusService("closed", props.company.value.id),
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

export default React.memo(EMRHRefuse);
