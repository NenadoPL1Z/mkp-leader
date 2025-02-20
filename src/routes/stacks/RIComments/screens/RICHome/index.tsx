import React from "react";
import { ScrollView, Text, View } from "react-native";
import ScreenContainer from "@app/containers/ScreenContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderUI from "@app/ui/HeaderUI";
import ToastUI from "@app/ui/ToastUI";
import { Size } from "@app/lib/constants/size.ts";
import ButtonUI from "@app/ui/ButtonUI";
import { ACTIVE_COMMENTS_BY_STATUS } from "./constants.ts";
import { useRICHome } from "./useRICHome.ts";
import { styles } from "./styles.ts";
import type { RICHomeScreenProps } from "../../types.ts";

const RICHome = ({ route: { params } }: RICHomeScreenProps) => {
  const { comments, service } = params;
  const { top, bottom } = useSafeAreaInsets();
  const paddingBottom = bottom || styles.bottom.paddingVertical;

  const { toast, onHideToast } = useRICHome();

  const isActiveComments = ACTIVE_COMMENTS_BY_STATUS.has(service.status);
  return (
    <ScreenContainer
      top={top}
      isSaveArea={false}>
      <HeaderUI
        title="Комментарии"
        isOverLinear={true}
      />
      <ScrollView style={styles.container}>
        <Text>{JSON.stringify(comments)}</Text>
      </ScrollView>
      <ToastUI
        params={{
          ...toast,
          isVisible: !!toast,
          onHide: onHideToast,
          bottomOffset: Size.BUTTON + 30,
        }}
      />
      <View style={[styles.bottom, { paddingBottom }]}>
        {isActiveComments && <ButtonUI>Оставить комментарий</ButtonUI>}
      </View>
    </ScreenContainer>
  );
};

export default React.memo(RICHome);
