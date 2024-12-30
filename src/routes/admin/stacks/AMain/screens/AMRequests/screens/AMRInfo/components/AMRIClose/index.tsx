import React from "react";
import { StyleSheet, View } from "react-native";
import { Portal } from "@gorhom/portal";
import { Portal as PortalNamespace } from "@app/theme/portal";
import ButtonUI from "@app/ui/ButtonUI";
import { Size } from "@app/lib/constants/size";
import { Colors } from "@app/theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ToastUI from "@app/ui/ToastUI";
import { useAMRIClose } from "./useAMRIClose";
import type { AMRICloseProps } from "./types";

const AMRIClose = (props: AMRICloseProps) => {
  const { bottom } = useSafeAreaInsets();
  const paddingBottom = bottom || styles.bottom.paddingVertical;

  const { toast, onHideToast, isLoading, onSubmit } = useAMRIClose(props);

  return (
    <Portal hostName={PortalNamespace.REQUEST_FOOTER}>
      <ToastUI
        params={{
          ...toast,
          isVisible: !!toast,
          onHide: onHideToast,
          bottomOffset: Size.BUTTON + paddingBottom + 10,
        }}
      />
      <View style={[styles.bottom, { paddingBottom }]}>
        <ButtonUI
          loading={isLoading}
          onPress={onSubmit}>
          Закрыть заявку
        </ButtonUI>
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flex: 0,
    paddingVertical: 10,
    paddingHorizontal: Size.SCREEN_PADDING,
    backgroundColor: Colors.WHITE,
  },
});

export default React.memo(AMRIClose);
