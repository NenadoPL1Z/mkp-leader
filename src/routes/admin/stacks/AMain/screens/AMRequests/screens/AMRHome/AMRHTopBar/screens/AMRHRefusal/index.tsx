import React, { useCallback } from "react";
import { View } from "react-native";
import { formatDateTime } from "@app/lib/functions/formatDateTime";
import { requestsListStyles } from "@app/components/RequestsListStyles";
import PaginationList from "@app/components/PaginationList/PaginationList";
import { Api } from "@app/lib/constants/api";
import EmptyContainer from "@app/containers/EmptyContainer";
import ACRefusal from "@app/routes/admin/components/AdminCard/variant/ACRefusal";
import Sort from "@app/components/Sort";
import { useAMRHRefusal } from "./useAMRHRefusal.ts";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { AMRHRefusalProps } from "./types";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<ServiceCardModel>;

const AMRHRefusal = (props: AMRHRefusalProps) => {
  const { handlePushProfile } = useAMRHRefusal(props);

  const renderItem = useCallback<RenderItem>(({ item }) => {
    return (
      <ACRefusal
        title={item.title}
        isBadge={!item.viewed_admin}
        variant={item.emergency ? "error" : "default"}
        onPress={() => handlePushProfile(item)}
        creationTime={formatDateTime(item.created_at || "")}
      />
    );
  }, []);

  return (
    <View style={requestsListStyles.container}>
      <View style={requestsListStyles.top}>
        <View style={requestsListStyles.sort}>
          <Sort
            sort={props.sort}
            filters={props.filters}
          />
        </View>
        <PaginationList
          config={{
            url: Api.service.getStatusService(
              "refusal",
              props.company.value.id,
            ),
            query: props.queryData,
            resetRef: props.refusalRefs.resetRef,
            setCardRef: props.refusalRefs.setCardRef,
            filterRef: props.refusalRefs.filterRef,
            scrollRef: props.refusalRefs.scrollRef,
            displayRefreshRef: props.refusalRefs.displayRefreshRef,
            callbackCounter: props.counter.onChange,
            callbackRefresh: props.onResetAllTabs,
          }}
          renderItem={renderItem}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={[requestsListStyles.contentContainerStyle]}
          empty={{ Component: EmptyContainer }}
        />
      </View>
    </View>
  );
};

export default React.memo(AMRHRefusal);
