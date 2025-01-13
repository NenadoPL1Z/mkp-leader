import React from "react";
import { ScrollView, View } from "react-native";
import ButtonUI from "@app/ui/ButtonUI";
import FieldTitle from "@app/components/FieldTitle";
import TextField from "@app/ui/TextField";
import CheckBoxUI from "@app/ui/CheckBoxUI";
import TextAreaUI from "@app/ui/TextAreaUI/TextAreaUI";
import SwitchUI from "@app/ui/SwitchUI";
import ToastUI from "@app/ui/ToastUI";
import { Size } from "@app/lib/constants/size";
import { Colors } from "@app/theme/colors";
import MediaUpload from "@app/components/MediaUpload";
import { FormProvider } from "react-hook-form";
import { Count } from "@app/lib/constants/count";
import { useRequestForm } from "./useRequestForm";
import { styles } from "./styles";
import { SWITCH_OPTIONS } from "./constants";
import type { RequestFormProps } from "./types";

const RequestForm = (props: RequestFormProps) => {
  const {
    toast,
    onHideToast,
    handleShowToast,
    isLoading,
    methods,
    title,
    emergency,
    description,
    material,
    onSubmit,
  } = useRequestForm(props);

  return (
    <View style={styles.root}>
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={[styles.wrapper, styles.shadow, styles.mb16]}>
            <View style={styles.mb16}>
              <TextField
                label="Задача"
                required={true}
                autoCorrect={false}
                autoCapitalize="none"
                value={title.field.value}
                onChangeText={title.field.onChange}
                error={title.fieldState.error}
                onClear={() => title.field.onChange("")}
              />
            </View>
            <View style={styles.mb16}>
              <CheckBoxUI
                checked={emergency.field.value}
                onPress={() => emergency.field.onChange(!emergency.field.value)}
                title="Срочная заявка"
                containerStyle={styles.check}
              />
            </View>
            <View style={styles.mb16}>
              <TextAreaUI
                label="Описание задачи"
                required={true}
                autoCorrect={false}
                autoCapitalize="none"
                value={description.field.value}
                onChangeText={description.field.onChange}
                error={description.fieldState.error}
                onClear={() => description.field.onChange("")}
              />
            </View>
            <View>
              <FieldTitle title="Материал:">
                <SwitchUI
                  options={SWITCH_OPTIONS}
                  value={material.field.value}
                  colors={[Colors.GREEN, Colors.MAIN]}
                  onSelect={material.field.onChange}
                />
              </FieldTitle>
            </View>
          </View>
          <View style={[styles.wrapper, styles.shadow]}>
            <FormProvider {...methods}>
              <MediaUpload
                max={Count.MEDIA_CUSTOMER}
                callbackShowToast={handleShowToast}
                required={true}
              />
            </FormProvider>
          </View>
        </ScrollView>
      </View>
      <ToastUI
        params={{
          ...toast,
          isVisible: Boolean(toast),
          onHide: onHideToast,
          bottomOffset: Size.BUTTON + 20,
        }}
      />
      <View style={styles.bottom}>
        <ButtonUI
          onPress={onSubmit}
          loading={isLoading}>
          {props.initialData ? "Сохранить" : "Создать"}
        </ButtonUI>
      </View>
    </View>
  );
};

export default React.memo(RequestForm);
