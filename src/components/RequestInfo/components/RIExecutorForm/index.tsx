import React from "react";
import { TouchableOpacity, View } from "react-native";
import TextField from "@app/ui/TextField";
import CheckBoxUI from "@app/ui/CheckBoxUI";
import DatePickerUI from "@app/ui/DatePickerUI";
import ButtonUI from "@app/ui/ButtonUI";
import PopupUI from "@app/ui/ModalUI/ui/PopupUI";
import PopupText from "@app/ui/ModalUI/ui/PopupUI/PopupText/PopupText";
import { Response } from "@app/lib/constants/response";
import ToastUI from "@app/ui/ToastUI";
import { Portal } from "@gorhom/portal";
import { Portal as PortalNamespace } from "@app/theme/portal";
import { Size } from "@app/lib/constants/size";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  FIRST_EXECUTOR_NAME,
  SECOND_EXECUTOR_NAME,
} from "@app/lib/constants/executors.ts";
import { useRIExecutorForm } from "./useRIExecutorForm";
import { styles } from "./styles";
import type { RIExecutorFormProps } from "./types";

const RIExecutorForm = (props: RIExecutorFormProps) => {
  const { bottom } = useSafeAreaInsets();
  const paddingBottom = bottom || styles.bottom.paddingVertical;

  const {
    isLoading,
    isError,
    executorDefaultController,
    executorAdditionalController,
    deadlineAtController,
    emergencyController,
    customPositionController,
    handlePushExecutorDefaultScreen,
    handlePushExecutorAdditionalScreen,
    handleClearStatus,
    onSubmit,
    toast,
    onHideToast,
  } = useRIExecutorForm(props);

  return (
    <>
      <View style={[styles.root, styles.shadow]}>
        <View style={styles.wrapper}>
          <View style={styles.item}>
            <TouchableOpacity onPress={handlePushExecutorDefaultScreen}>
              <TextField
                label={FIRST_EXECUTOR_NAME}
                value={
                  executorDefaultController.field.value?.name ||
                  executorDefaultController.field.value?.phone
                }
                disabled={true}
                required={true}
                inputStyle={styles.pointer}
                error={executorDefaultController.fieldState.error}
                isClear={false}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity onPress={handlePushExecutorAdditionalScreen}>
              <TextField
                label={SECOND_EXECUTOR_NAME}
                value={
                  executorAdditionalController.field.value?.name ||
                  executorAdditionalController.field.value?.phone
                }
                disabled={true}
                inputStyle={styles.pointer}
                error={executorAdditionalController.fieldState.error}
                onClear={() =>
                  executorAdditionalController.field.onChange(null)
                }
              />
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <DatePickerUI
              value={deadlineAtController.field.value ?? ""}
              onChange={deadlineAtController.field.onChange}
              textFieldProps={{
                label: "Срок исполнения",
                error: deadlineAtController.fieldState.error,
              }}
              pickerProps={{ mode: "date", minimumDate: new Date() }}
            />
          </View>
          <View style={styles.item}>
            <CheckBoxUI
              title="Заказная позиция"
              checked={customPositionController.field.value}
              containerStyle={styles.check}
              onPress={() => {
                customPositionController.field.onChange(
                  !customPositionController.field.value,
                );
              }}
            />
          </View>
          <CheckBoxUI
            title="Срочная заявка"
            checked={emergencyController.field.value}
            containerStyle={styles.check}
            onPress={() =>
              emergencyController.field.onChange(
                !emergencyController.field.value,
              )
            }
          />
        </View>
      </View>
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
            Изменить
          </ButtonUI>
        </View>
      </Portal>
      <PopupUI
        visible={isError}
        isSuccess={false}
        onClose={handleClearStatus}>
        <PopupText>{Response.UNKNOWN}</PopupText>
      </PopupUI>
    </>
  );
};

export default React.memo(RIExecutorForm);
