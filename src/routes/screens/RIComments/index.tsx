import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ScreenContainer from "@app/containers/ScreenContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderUI from "@app/ui/HeaderUI";
import ToastUI from "@app/ui/ToastUI";
import { Size } from "@app/lib/constants/size.ts";
import ButtonUI from "@app/ui/ButtonUI";
import { Colors } from "@app/theme/colors.ts";
import { useRIComments } from "./useRIComments.ts";

const RIComments = () => {
  const { top, bottom } = useSafeAreaInsets();
  const paddingBottom = bottom || styles.bottom.paddingVertical;

  const { toast, onHideToast } = useRIComments();

  return (
    <ScreenContainer
      top={top}
      isSaveArea={false}>
      <HeaderUI
        title="Комментарии"
        isOverLinear={true}
      />
      <ScrollView style={styles.container} />
      <ToastUI
        params={{
          ...toast,
          isVisible: !!toast,
          onHide: onHideToast,
          bottomOffset: Size.BUTTON + 30,
        }}
      />
      <View style={[styles.bottom, { paddingBottom }]}>
        <ButtonUI loading={false}>Оставить комментарий</ButtonUI>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  bottom: {
    flex: 0,
    paddingVertical: 10,
    paddingHorizontal: Size.SCREEN_PADDING,
    backgroundColor: Colors.WHITE,
  },
});

export default React.memo(RIComments);
