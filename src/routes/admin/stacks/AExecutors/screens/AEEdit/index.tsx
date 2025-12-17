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
import AEForm from "@app/routes/admin/stacks/AExecutors/components/AEForm";
import { useAEEdit } from "./useAEEdit";
import { styles } from "./index.styles";
import type { AEEditProps } from "@app/routes/admin/stacks/AExecutors/types";

const AEEdit = (props: AEEditProps) => {
  const { top, offset } = useMarginBottom("calc");
  const { methods, toast, isLoading, onHideToast, onSubmit } = useAEEdit(props);

  return (
    <ScreenContainer
      top={top}
      isSaveArea={false}>
      <HeaderUI
        right={{
          variant: "edit",
          disabled: true,
          iconProps: { color: Colors.PRIMARY },
        }}
      />
      <KeyboardContainer>
        <ScrollView
          style={styles.root}
          keyboardDismissMode="on-drag">
          <FormProvider {...methods}>
            <AEForm />
          </FormProvider>
        </ScrollView>
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
          { paddingBottom: offset, backgroundColor: Colors.DARK_SECONDARY_TWO },
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

export default React.memo(AEEdit);
