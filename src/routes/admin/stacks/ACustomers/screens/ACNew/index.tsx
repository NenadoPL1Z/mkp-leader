import React from "react";
import { ScrollView, View } from "react-native";
import ScreenContainer from "@app/containers/ScreenContainer";
import HeaderUI from "@app/ui/HeaderUI";
import { Colors } from "@app/theme/colors";
import ButtonUI from "@app/ui/ButtonUI";
import { useMarginBottom } from "@app/hooks/useMarginBottom";
import KeyboardContainer from "@app/containers/KeyboardContainer";
import { FormProvider } from "react-hook-form";
import ToastUI from "@app/ui/ToastUI";
import { Size } from "@app/lib/constants/size";
import ACForm from "@app/routes/admin/stacks/ACustomers/components/ACForm";
import { useACNew } from "./useACNew";
import { styles } from "./index.styles";
import type { ACNewProps } from "@app/routes/admin/stacks/ACustomers/types";

const ACNew = (props: ACNewProps) => {
  const { top, offset } = useMarginBottom("calc");
  const { methods, toast, isLoading, onHideToast, onSubmit } = useACNew(props);

  return (
    <ScreenContainer
      top={top}
      isSaveArea={false}>
      <HeaderUI title="Заказчик" />
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
          Создать
        </ButtonUI>
      </View>
    </ScreenContainer>
  );
};

export default React.memo(ACNew);
