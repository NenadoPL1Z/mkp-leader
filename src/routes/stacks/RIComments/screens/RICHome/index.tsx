import React, { useCallback } from "react";
import { FlatList, type ListRenderItem, Text, View } from "react-native";
import ScreenContainer from "@app/containers/ScreenContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderUI from "@app/ui/HeaderUI";
import ToastUI from "@app/ui/ToastUI";
import { Size } from "@app/lib/constants/size.ts";
import ButtonUI from "@app/ui/ButtonUI";
import RefreshControlUI from "@app/ui/RefreshControlUI";
import EmptyContainer from "@app/containers/EmptyContainer";
import { CommentIcon } from "@app/assets/icons/dist";
import { ACTIVE_COMMENTS_BY_STATUS } from "./constants.ts";
import { useRICHome } from "./useRICHome.ts";
import { styles } from "./styles.ts";
import type { CommentModel } from "@app/lib/models/CommentModel.ts";
import type { RICHomeScreenProps } from "../../types.ts";

type RenderItem = ListRenderItem<CommentModel>;

const RICHome = (props: RICHomeScreenProps) => {
  const { service } = props.route.params;

  const { top, bottom } = useSafeAreaInsets();
  const paddingBottom = bottom || styles.bottom.paddingVertical;

  const {
    scrollRef,
    toast,
    isLoading,
    comments,
    onHideToast,
    handlePushAddComment,
    refresh,
  } = useRICHome(props);

  const renderItem = useCallback<RenderItem>(
    ({ item }) => {
      return (
        <View>
          <Text>{JSON.stringify(item)}</Text>
        </View>
      );
    },
    [comments],
  );

  const isActiveComments = ACTIVE_COMMENTS_BY_STATUS.has(service.status);
  return (
    <ScreenContainer
      top={top}
      isSaveArea={false}>
      <HeaderUI
        title="Комментарии"
        isOverLinear={true}
      />
      <FlatList
        ref={(ref) => {
          scrollRef.current = ref;
        }}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyContainer
            title="Комментарии отсутствуют"
            Icon={CommentIcon}
          />
        )}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        data={comments}
        refreshControl={
          <RefreshControlUI
            refreshing={isLoading}
            onRefresh={refresh}
          />
        }
      />
      <ToastUI
        params={{
          ...toast,
          isVisible: !!toast,
          onHide: onHideToast,
          bottomOffset: Size.BUTTON + 30,
        }}
      />
      <View style={[styles.bottom, { paddingBottom }]}>
        {isActiveComments && (
          <ButtonUI onPress={handlePushAddComment}>
            Оставить комментарий
          </ButtonUI>
        )}
      </View>
    </ScreenContainer>
  );
};

export default React.memo(RICHome);
