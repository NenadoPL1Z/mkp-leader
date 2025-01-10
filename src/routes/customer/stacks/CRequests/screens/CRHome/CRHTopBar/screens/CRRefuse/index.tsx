import { View } from "react-native";
import PaginationList from "@app/components/PaginationList/PaginationList.tsx";
import CCNew from "@app/routes/customer/components/CustomerCard/variant/CCNew";
import React, { useCallback } from "react";
import { Api } from "@app/lib/constants/api.ts";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import EmptyContainer from "@app/containers/EmptyContainer";
import { requestsListStyles } from "@app/components/RequestsListStyles";
import { useCRRefuse } from "./useCRRefuse.ts";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel.ts";
import type { CRRefuseProps } from "./types";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<ServiceCardModel>;

const CRRefuse = (props: CRRefuseProps) => {
  const { handlePushProfile } = useCRRefuse(props);
  const renderItem = useCallback<RenderItem>(({ item, index }) => {
    return (
      <CCNew
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
            url: Api.service.getCustomerStatusService("new"),
            resetRef: props.refuseRefs.resetRef,
            setCardRef: props.refuseRefs.setCardRef,
            filterRef: props.refuseRefs.filterRef,
            scrollRef: props.refuseRefs.scrollRef,
            displayRefreshRef: props.refuseRefs.displayRefreshRef,
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

export default React.memo(CRRefuse);
