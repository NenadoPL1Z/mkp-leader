import React, { useCallback } from "react";
import ScreenContainer from "@app/containers/ScreenContainer";
import { StyleSheet, View } from "react-native";
import PaginationList from "@app/components/PaginationList/PaginationList";
import { Api } from "@app/lib/constants/api";
import PaginationSearch from "@app/components/PaginationSearch";
import AboutCardExecutor from "@app/components/AboutCard/variant/AboutCardExecutor";
import { useSearch } from "@app/hooks/useSearch";
import { Size } from "@app/lib/constants/size";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TFLBack } from "@app/ui/TextField/left/TFLBack";
import { useToastLocal } from "@app/hooks/useToastLocal.ts";
import ToastUI from "@app/ui/ToastUI";
import type { AMRExecutorScreenProps } from "@app/routes/admin/stacks/AMain/screens/AMRequests/types";
import type { ExecutorModel } from "@app/lib/models/ExecutorModel";
import type { ListRenderItem } from "react-native";

type RenderItem = ListRenderItem<ExecutorModel>;

const AMRExecutor = ({
  route: { params },
  navigation,
}: AMRExecutorScreenProps) => {
  const { executorTitle, callbackSelectExecutor } = params;

  const { top, bottom } = useSafeAreaInsets();
  const { toast, onShowToast, onHideToast } = useToastLocal();
  const { resetRef, query, handleChangeSearch } = useSearch();

  const renderItem = useCallback<RenderItem>(({ item }) => {
    return (
      <AboutCardExecutor
        key={item.id}
        {...item}
        onPress={(executor) =>
          callbackSelectExecutor(executor, onShowToast, navigation.goBack)
        }
      />
    );
  }, []);

  return (
    <ScreenContainer
      top={top}
      isSaveArea={false}>
      <View style={styles.root}>
        <View style={styles.header}>
          <PaginationSearch
            placeholder={executorTitle}
            left={TFLBack(navigation.goBack)}
            handleChangeSearch={handleChangeSearch}
          />
        </View>
        <View style={styles.body}>
          <PaginationList
            config={{
              url: Api.users.executor.all,
              query,
              resetRef,
            }}
            contentContainerStyle={[
              styles.contentContainerStyle,
              { paddingBottom: bottom || 10 },
            ]}
            renderItem={renderItem}
          />
        </View>
      </View>
      <ToastUI
        params={{
          isVisible: !!toast,
          ...toast,
          bottomOffset: bottom,
          onHide: onHideToast,
        }}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
  header: {
    paddingTop: Size.HEADER_TOP,
    paddingHorizontal: Size.SCREEN_PADDING,
    paddingBottom: 10,
  },
  body: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 2,
    paddingHorizontal: Size.SCREEN_PADDING,
  },
});

export default React.memo(AMRExecutor);
