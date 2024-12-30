import React from "react";
import { View, ScrollView } from "react-native";
import ScreenContainer from "@app/containers/ScreenContainer";
import HeaderUI from "@app/ui/HeaderUI";
import KeyboardContainer from "@app/containers/KeyboardContainer";
import { FormProvider } from "react-hook-form";
import ACForm from "@app/routes/admin/stacks/ACustomers/components/ACForm";
import ToastUI from "@app/ui/ToastUI";
import { Size } from "@app/lib/constants/size";
import { Colors } from "@app/theme/colors";
import ButtonUI from "@app/ui/ButtonUI";
import { useMarginBottom } from "@app/hooks/useMarginBottom";
import { styles } from "./index.styles";
import { useACEdit } from "./useACEdit";
import type { ACEditProps } from "@app/routes/admin/stacks/ACustomers/types";

const ACEdit = (props: ACEditProps) => {
  const { top, offset } = useMarginBottom("calc");
  const { methods, toast, isLoading, onHideToast, onSubmit } = useACEdit(props);

  return (
    <ScreenContainer
      top={top}
      isSaveArea={false}>
      <HeaderUI
        title=""
        right={{
          variant: "edit",
          disabled: true,
          iconProps: { color: Colors.MAIN },
        }}
      />
      <KeyboardContainer>
        <View style={styles.root}>
          <ScrollView
            style={styles.container}
            keyboardDismissMode="on-drag">
            <FormProvider {...methods}>
              <ACForm />
            </FormProvider>
          </ScrollView>
        </View>
      </KeyboardContainer>
      <ToastUI
        success={{ text1Props: { numberOfLines: 10 } }}
        params={{
          isVisible: !!toast,
          ...toast,
          bottomOffset: offset + Size.BUTTON + 20,
          onHide: onHideToast,
        }}
      />
      <View
        style={[
          styles.bottom,
          { paddingBottom: offset, backgroundColor: Colors.WHITE },
        ]}>
        <ButtonUI
          loading={isLoading}
          onPress={onSubmit}>
          Изменить
        </ButtonUI>
      </View>
    </ScreenContainer>
  );
};

export default React.memo(ACEdit);
