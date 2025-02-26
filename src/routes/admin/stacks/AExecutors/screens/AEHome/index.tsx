import React, { useCallback } from "react";
import ScreenContainer from "@app/containers/ScreenContainer";
import TabBar from "@app/components/TabBar";
import { AdminRootSN } from "@app/routes/admin/types";
import { View } from "react-native";
import PaginationList from "@app/components/PaginationList/PaginationList";
import ButtonUI from "@app/ui/ButtonUI";
import { Api } from "@app/lib/constants/api";
import HeaderUI from "@app/ui/HeaderUI";
import ToastUI from "@app/ui/ToastUI";
import { Size } from "@app/lib/constants/size";
import PaginationSearch from "@app/components/PaginationSearch";
import AboutCardExecutor from "@app/components/AboutCard/variant/AboutCardExecutor";
import EmptyContainer from "@app/containers/EmptyContainer";
import { styles } from "./index.styles";
import { useAEHome } from "./useAEHome";
import type { ExecutorModel } from "@app/lib/models/ExecutorModel";
import type { AEHomeProps } from "@app/routes/admin/stacks/AExecutors/types";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<ExecutorModel>;

const AEHome = (props: AEHomeProps) => {
  const {
    executorDefaultId,
    setCardRef,
    filterRef,
    resetRef,

    query,
    handleChangeSearch,

    toast,
    onHideToast,

    handlePushProfile,
    handlePushNew,
  } = useAEHome(props);

  const renderItem = useCallback<RenderItem>(
    ({ item }) => {
      return (
        <AboutCardExecutor
          key={item.id}
          {...item}
          executorDefaultId={executorDefaultId}
          onPress={handlePushProfile}
        />
      );
    },
    [executorDefaultId],
  );

  return (
    <TabBar activeRouteName={AdminRootSN.EXECUTORS}>
      <ScreenContainer>
        <View style={styles.header}>
          <HeaderUI
            title="Исполнители"
            isBack={false}
            right={{ variant: "logout" }}
          />
        </View>
        <View style={styles.top}>
          <PaginationSearch
            placeholder="Исполнитель"
            handleChangeSearch={handleChangeSearch}
          />
        </View>
        <View style={styles.middle}>
          <PaginationList
            config={{
              url: Api.users.executor.all,
              query,
              setCardRef,
              filterRef,
              resetRef,
            }}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={renderItem}
            empty={{
              Component: () => (
                <EmptyContainer
                  title="Исполнители не найдены"
                  Icon={null}
                />
              ),
            }}
          />
          <ToastUI
            params={{
              ...toast,
              isVisible: !!toast,
              onHide: onHideToast,
              bottomOffset: Size.BUTTON + 30,
            }}
          />
        </View>
        <View style={styles.bottom}>
          <ButtonUI onPress={handlePushNew}>Создать исполнителя</ButtonUI>
        </View>
      </ScreenContainer>
    </TabBar>
  );
};

export default React.memo(AEHome);
