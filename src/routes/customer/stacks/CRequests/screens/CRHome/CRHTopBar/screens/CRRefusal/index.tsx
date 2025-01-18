import { View } from "react-native";
import PaginationList from "@app/components/PaginationList/PaginationList.tsx";
import CCRefusal from "@app/routes/customer/components/CustomerCard/variant/CCRefusal";
import React, { useCallback } from "react";
import { Api } from "@app/lib/constants/api.ts";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import EmptyContainer from "@app/containers/EmptyContainer";
import { requestsListStyles } from "@app/components/RequestsListStyles";
import { useCRRefusal } from "./useCRRefusal.ts";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel.ts";
import type { CRRefusalProps } from "./types";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<ServiceCardModel>;

const CRRefusal = (props: CRRefusalProps) => {
  const { handlePushProfile } = useCRRefusal(props);
  const renderItem = useCallback<RenderItem>(({ item, index }) => {
    return (
      <CCRefusal
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
            url: Api.service.getCustomerStatusService("refusal"),
            resetRef: props.refusalRefs.resetRef,
            setCardRef: props.refusalRefs.setCardRef,
            filterRef: props.refusalRefs.filterRef,
            scrollRef: props.refusalRefs.scrollRef,
            displayRefreshRef: props.refusalRefs.displayRefreshRef,
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

export default React.memo(CRRefusal);
