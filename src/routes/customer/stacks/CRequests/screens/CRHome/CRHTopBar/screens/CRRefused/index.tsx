import { View } from "react-native";
import PaginationList from "@app/components/PaginationList/PaginationList.tsx";
import CCRefused from "@app/routes/customer/components/CustomerCard/variant/CCRefused";
import React, { useCallback } from "react";
import { Api } from "@app/lib/constants/api.ts";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import EmptyContainer from "@app/containers/EmptyContainer";
import { requestsListStyles } from "@app/components/RequestsListStyles";
import { useCRRefused } from "./useCRRefused.ts";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel.ts";
import type { CRRefusedProps } from "./types";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<ServiceCardModel>;

const CRRefused = (props: CRRefusedProps) => {
  const { handlePushProfile } = useCRRefused(props);
  const renderItem = useCallback<RenderItem>(({ item, index }) => {
    return (
      <CCRefused
        title={item.title}
        isBadge={!item.viewed_customer}
        variant={item.emergency ? "error" : "default"}
        creationTime={formatDateTime(item.created_at || "")}
        onPress={() => handlePushProfile(item, index)}
      />
    );
  }, []);

  return (
    <View style={requestsListStyles.container}>
      <View style={requestsListStyles.top}>
        <PaginationList
          showsVerticalScrollIndicator={false}
          config={{
            url: Api.service.getCustomerStatusService("refused"),
            resetRef: props.refusedRefs.resetRef,
            setCardRef: props.refusedRefs.setCardRef,
            filterRef: props.refusedRefs.filterRef,
            scrollRef: props.refusedRefs.scrollRef,
            displayRefreshRef: props.refusedRefs.displayRefreshRef,
            callbackCounter: props.counter.onChange,
            callbackRefresh: props.onResetAllTabs,
          }}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={true}
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

export default React.memo(CRRefused);
