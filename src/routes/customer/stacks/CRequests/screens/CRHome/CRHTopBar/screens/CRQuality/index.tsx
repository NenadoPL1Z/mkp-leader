import { View } from "react-native";
import PaginationList from "@app/components/PaginationList/PaginationList.tsx";
import React, { useCallback } from "react";
import { Api } from "@app/lib/constants/api.ts";
import CCQuality from "@app/routes/customer/components/CustomerCard/variant/CCQuality";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import EmptyContainer from "@app/containers/EmptyContainer";
import { requestsListStyles } from "@app/components/RequestsListStyles";
import { useCRQuality } from "./useCRQuality";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel.ts";
import type { CRQualityProps } from "./types";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<ServiceCardModel>;

const CRQuality = (props: CRQualityProps) => {
  const { handlePushProfile } = useCRQuality(props);
  const renderItem = useCallback<RenderItem>(({ item, index }) => {
    return (
      <CCQuality
        title={item.title}
        isBadge={!item.viewed_customer}
        variant={item.emergency ? "error" : "default"}
        onPress={() => handlePushProfile(item, index)}
        deadline_at={formatDateTime(item.deadline_at || "")}
        creationTime={formatDateTime(item.created_at || "")}
      />
    );
  }, []);

  return (
    <View style={requestsListStyles.container}>
      <View style={requestsListStyles.top}>
        <PaginationList
          config={{
            url: Api.service.getCustomerStatusService("verifying"),
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

export default React.memo(CRQuality);
