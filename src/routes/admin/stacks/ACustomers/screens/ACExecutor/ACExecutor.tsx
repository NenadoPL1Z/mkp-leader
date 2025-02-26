import { type ListRenderItem, StyleSheet, View } from "react-native";
import { Size } from "@app/lib/constants/size.ts";
import ScreenContainer from "@app/containers/ScreenContainer";
import PaginationSearch from "@app/components/PaginationSearch";
import { TFLBack } from "@app/ui/TextField/left/TFLBack";
import PaginationList from "@app/components/PaginationList/PaginationList.tsx";
import { Api } from "@app/lib/constants/api.ts";
import { useCallback } from "react";
import { useSearch } from "@app/hooks/useSearch.ts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AboutCardExecutor from "@app/components/AboutCard/variant/AboutCardExecutor";
import ToastUI from "@app/ui/ToastUI";
import { useToastLocal } from "@app/hooks/useToastLocal.ts";
import type { ACExecutorProps } from "@app/routes/admin/stacks/ACustomers/types.ts";
import type { ExecutorModel } from "@app/lib/models/ExecutorModel.ts";

type RenderItem = ListRenderItem<ExecutorModel>;

export const ACExecutor = (props: ACExecutorProps) => {
  const {
    navigation,
    route: {
      params: { executorTitle, callbackSelectExecutor },
    },
  } = props;

  const { toast, onShowToast, onHideToast } = useToastLocal();
  const { resetRef, query, handleChangeSearch } = useSearch();
  const { top, bottom } = useSafeAreaInsets();

  const renderItem = useCallback<RenderItem>(({ item: executor }) => {
    return (
      <AboutCardExecutor
        key={executor.id}
        {...executor}
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
