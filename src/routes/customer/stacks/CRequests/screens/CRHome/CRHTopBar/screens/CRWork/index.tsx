import { View } from "react-native";
import PaginationList from "@app/components/PaginationList/PaginationList.tsx";
import React, { useCallback } from "react";
import { Api } from "@app/lib/constants/api.ts";
import CCWork from "@app/routes/customer/components/CustomerCard/variant/CCWork";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import EmptyContainer from "@app/containers/EmptyContainer";
import { requestsListStyles } from "@app/components/RequestsListStyles";
import { useCRWork } from "./useCRWork";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel.ts";
import type { CRWorkProps } from "./types";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<ServiceCardModel>;

const CRWork = (props: CRWorkProps) => {
  const { handlePushProfile } = useCRWork(props);

  const renderItem = useCallback<RenderItem>(({ item, index }) => {
    return (
      <CCWork
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
            url: Api.service.getCustomerStatusService("working"),
            resetRef: props.workRefs.resetRef,
            setCardRef: props.workRefs.setCardRef,
            filterRef: props.workRefs.filterRef,
            scrollRef: props.workRefs.scrollRef,
            displayRefreshRef: props.workRefs.displayRefreshRef,
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

export default React.memo(CRWork);
