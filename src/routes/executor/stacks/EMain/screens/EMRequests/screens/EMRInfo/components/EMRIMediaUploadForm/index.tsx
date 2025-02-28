import React from "react";
import MediaUpload from "@app/components/MediaUpload";
import { FormProvider } from "react-hook-form";
import ToastUI from "@app/ui/ToastUI";
import { StyleSheet, View } from "react-native";
import ButtonUI from "@app/ui/ButtonUI";
import { Portal } from "@gorhom/portal";
import { Portal as PortalNames } from "@app/theme/portal";
import { Size } from "@app/lib/constants/size";
import { Colors } from "@app/theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEMRIMediaUploadForm } from "./useEMRIMediaUploadForm";
import type { EMRIMediaUploadFormProps } from "./types";

const EMRIMediaUploadForm = (props: EMRIMediaUploadFormProps) => {
  const { bottom } = useSafeAreaInsets();
  const paddingBottom = bottom || styles.bottom.paddingVertical;

  const { toast, onHideToast, handleShowToast, isLoading, methods, onSubmit } =
    useEMRIMediaUploadForm(props);

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <MediaUpload
          callbackShowToast={handleShowToast}
          required={true}
        />
      </FormProvider>
      <Portal hostName={PortalNames.REQUEST_FOOTER}>
        <ToastUI
          params={{
            ...toast,
            isVisible: Boolean(toast),
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  bottom: {
    flex: 0,
    paddingVertical: 10,
    paddingHorizontal: Size.SCREEN_PADDING,
    backgroundColor: Colors.WHITE,
  },
});

export default React.memo(EMRIMediaUploadForm);
