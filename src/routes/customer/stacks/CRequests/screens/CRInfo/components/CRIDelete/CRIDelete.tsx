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
import { useCRIDelete } from "./useCRIDelete.ts";
import type { CRIDeleteProps } from "./types";

export const CRIDelete = (props: CRIDeleteProps) => {
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
  } = useCRIDelete(props);

  return (
    <Portal hostName={PortalNamespace.REQUEST_FOOTER}>
      <ToastUI
        params={{
          ...toast,
          isVisible: !!toast,
          onHide: onHideToast,
          bottomOffset: Size.BUTTON,
        }}
      />
      <View style={[styles.bottom, { paddingBottom }]}>
        <ButtonUI
          loading={isLoading}
          onPress={handleOpen}>
          Удалить заявку
        </ButtonUI>
      </View>
      <PopupUI
        visible={isOpen}
        onSuccess={onSubmit}
        onClose={handleClose}
        successButtonProps={{ loading: isLoading, title: "Удалить" }}
        cancelButtonProps={{ disabled: isLoading }}
        isBackdoorClose={!isLoading}>
        <PopupText>Вы уверены, что хотите удалить заявку?</PopupText>
      </PopupUI>
    </Portal>
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
