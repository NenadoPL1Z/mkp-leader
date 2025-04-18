import React, { useCallback } from "react";
import {
  FlatList,
  type ListRenderItem,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenContainer from "@app/containers/ScreenContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderUI from "@app/ui/HeaderUI";
import ToastUI from "@app/ui/ToastUI";
import { Size } from "@app/lib/constants/size.ts";
import ButtonUI from "@app/ui/ButtonUI";
import EmptyContainer from "@app/containers/EmptyContainer";
import { ArrowReloadIcon, CommentIcon } from "@app/assets/icons/dist";
import { Colors } from "@app/theme/colors.ts";
import { useAppSelector } from "@app/store/hooks";
import { user } from "@app/store/reducers";
import PopupUI from "@app/ui/ModalUI/ui/PopupUI";
import PopupText from "@app/ui/ModalUI/ui/PopupUI/PopupText/PopupText.tsx";
import { ACTIVE_COMMENTS_BY_STATUS } from "./constants.ts";
import { useRICHome } from "./useRICHome.ts";
import { styles } from "./styles.ts";
import { CommentCard } from "./ui";
import type { CommentModel } from "@app/lib/models/CommentModel.ts";
import type { RICHomeScreenProps } from "../../types.ts";

type RenderItem = ListRenderItem<CommentModel>;

const RICHome = (props: RICHomeScreenProps) => {
  const { service } = props.route.params;
  const userInfo = useAppSelector(user.selectors.selectUserInfo);

  const { top, bottom } = useSafeAreaInsets();
  const paddingBottom = bottom || styles.bottom.paddingVertical;

  const {
    listRef,
    commentUpdateCount,
    isLoading,
    isOpen,
    toast,
    comments,
    onHideToast,
    handleOpen,
    handleClose,
    handlePushAddComment,
    refresh,
  } = useRICHome(props);

  const renderItem = useCallback<RenderItem>(
    ({ item: comment, index }) => {
      return (
        <CommentCard
          key={comment.id}
          service={service}
          comment={comment}
          count={index + 1}
          isMyComment={userInfo.id === comment.user_id}
        />
      );
    },
    [comments],
  );

  const isRefresh = isLoading && commentUpdateCount.current > 0;
  const isActiveComments = ACTIVE_COMMENTS_BY_STATUS.has(service.status);
  return (
    <ScreenContainer
      top={top}
      isSaveArea={false}>
      <HeaderUI
        title="Комментарии"
        isOverLinear={true}>
        <TouchableOpacity
          style={styles.reload}
          onPress={handleOpen}>
          <ArrowReloadIcon color={isRefresh ? Colors.GRAY_TEN : Colors.MAIN} />
        </TouchableOpacity>
      </HeaderUI>
      <FlatList
        ref={listRef}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        inverted={Boolean(comments.length)}
        data={comments}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <EmptyContainer
            title="Комментарии отсутствуют"
            Icon={() => <CommentIcon color={Colors.GRAY_TEN} />}
          />
        )}
      />
      <PopupUI
        visible={isOpen}
        onSuccess={() => refresh(true)}
        onClose={handleClose}
        successButtonProps={{ loading: isLoading, title: "Обновить" }}
        cancelButtonProps={{ disabled: isLoading }}
        isBackdoorClose={!isLoading}>
        <PopupText>Подтвердите обновление комментариев</PopupText>
      </PopupUI>
      <ToastUI
        params={{
          ...toast,
          isVisible: !!toast,
          onHide: onHideToast,
          bottomOffset: Size.BUTTON + 50,
        }}
      />
      <View style={[styles.bottom, { paddingBottom }]}>
        <ButtonUI
          disabled={!isActiveComments || isRefresh}
          onPress={handlePushAddComment}>
          {isActiveComments ? "Оставить комментарий" : "Комментарии закрыты"}
        </ButtonUI>
      </View>
    </ScreenContainer>
  );
};

export default React.memo(RICHome);
