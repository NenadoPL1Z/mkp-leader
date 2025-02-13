import { View } from "react-native";
import PaginationList from "@app/components/PaginationList/PaginationList.tsx";
import React, { useCallback } from "react";
import { Api } from "@app/lib/constants/api.ts";
import CCClosed from "@app/routes/customer/components/CustomerCard/variant/CCClosed";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import EmptyContainer from "@app/containers/EmptyContainer";
import { requestsListStyles } from "@app/components/RequestsListStyles";
import { useCRClosed } from "./useCRClosed";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel.ts";
import type { CRClosedProps } from "./types";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<ServiceCardModel>;

const CRClosed = (props: CRClosedProps) => {
  const { handlePushProfile } = useCRClosed(props);
  const renderItem = useCallback<RenderItem>(({ item, index }) => {
    return (
      <CCClosed
        title={item.title}
        isBadge={!item.viewed_customer}
        variant="success"
        onPress={() => handlePushProfile(item, index)}
        creationTime={formatDateTime(item.created_at || "")}
        executionTime={formatDateTime(item.created_at || "")}
      />
    );
  }, []);

  return (
    <View style={requestsListStyles.container}>
      <View style={requestsListStyles.top}>
        <PaginationList
          config={{
            url: Api.service.getCustomerStatusService("closed"),
            resetRef: props.closedRefs.resetRef,
            setCardRef: props.closedRefs.setCardRef,
            filterRef: props.closedRefs.filterRef,
            scrollRef: props.closedRefs.scrollRef,
            displayRefreshRef: props.closedRefs.displayRefreshRef,
            callbackCounter: props.counter.onSetUnreadCounters,
            callbackRefresh: props.onResetAllTabs,
          }}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
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

export default React.memo(CRClosed);
