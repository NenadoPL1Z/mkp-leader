import React from "react";
import { StyleSheet, View } from "react-native";
import { Portal } from "@gorhom/portal";
import { Portal as PortalNamespace } from "@app/theme/portal";
import ButtonUI from "@app/ui/ButtonUI";
import { Size } from "@app/lib/constants/size";
import { Colors } from "@app/theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ToastUI from "@app/ui/ToastUI";
import PopupUI from "@app/ui/ModalUI/ui/PopupUI";
import PopupText from "@app/ui/ModalUI/ui/PopupUI/PopupText/PopupText.tsx";
import { useAMRIRefuse } from "./useAMRIRefuse";
import type { AMRIRefuseProps } from "./types";

const AMRIRefuse = (props: AMRIRefuseProps) => {
  const { bottom } = useSafeAreaInsets();
  const paddingBottom = bottom || styles.bottom.paddingVertical;

  const {
    toast,
    isOpen,
    isLoading,
    onSubmit,
    handleOpen,
    handleClose,
    onHideToast,
  } = useAMRIRefuse(props);

  return (
    <>
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
            onPress={handleOpen}>
            Отказаться от заявки
          </ButtonUI>
        </View>
      </Portal>
      <PopupUI
        visible={isOpen}
        onSuccess={onSubmit}
        onClose={handleClose}
        successButtonProps={{ loading: isLoading, title: "Отказаться" }}
        cancelButtonProps={{ disabled: isLoading }}
        isBackdoorClose={!isLoading}>
        <PopupText>Вы уверены, что хотите отказаться от заявки?</PopupText>
      </PopupUI>
    </>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flex: 0,
    paddingVertical: 10,
    paddingHorizontal: Size.SCREEN_PADDING,
    backgroundColor: Colors.DARK_SECONDARY_TWO,
  },
});

export default React.memo(AMRIRefuse);
