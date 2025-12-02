import { SafeAreaView, View } from "react-native";
import Typography from "@app/ui/Typography";
import { FormProvider } from "react-hook-form";
import KeyboardContainer from "@app/containers/KeyboardContainer";
import { LinearGradient } from "react-native-linear-gradient";
import { linear } from "@app/theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonUI from "@app/ui/ButtonUI";
import ToastUI from "@app/ui/ToastUI";
import Documentation from "@app/components/Documentation";
import { useState } from "react";
import AuthForm from "./components/AuthForm";
import { useAuthContent } from "./useAuthContent.ts";
import { styles } from "./index.styles";
import SessionLimit from "./components/SessionLimit";
import { RegistrationModal } from "./components/RegistrationModal";
import { ResetModal } from "./components/ResetModal";

export const AuthContent = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { isLoading, toast, onHideToast, methods, onSubmit } = useAuthContent();
  const [registrationModal, setRegistrationModal] = useState<boolean>(false);
  const [resetModal, setResetModal] = useState(false);

  return (
    <>
      <LinearGradient
        style={styles.container}
        colors={linear.authorization}>
        <SafeAreaView style={styles.wrapper}>
          <KeyboardContainer>
            <View style={styles.top}>
              <Typography
                variant="h1"
                style={styles.title}>
                Авторизация
              </Typography>
              <FormProvider {...methods}>
                <AuthForm onPressReset={() => setResetModal(true)} />
              </FormProvider>
              <View style={styles.buttonContainer}>
                <ButtonUI
                  variant="inverted"
                  loading={isLoading}
                  onPress={onSubmit}>
                  Войти
                </ButtonUI>
                <View style={styles.registerButton}>
                  <ButtonUI
                    variant="base"
                    onPress={() => setRegistrationModal(true)}>
                    Зарегистрироваться
                  </ButtonUI>
                </View>
              </View>
            </View>
          </KeyboardContainer>
          <View style={[styles.bottom, bottom === 0 && styles.bottomMargin]}>
            <Documentation />
          </View>
        </SafeAreaView>
        <ToastUI
          success={{
            contentContainerStyle: styles.toast,
            text1Style: styles.toastText,
          }}
          params={{
            ...toast,
            isVisible: Boolean(toast),
            onHide: onHideToast,
            position: "top",
            topOffset: top + 10,
          }}
        />
        <SessionLimit />
      </LinearGradient>
      <RegistrationModal
        open={registrationModal}
        onClose={() => setRegistrationModal(false)}
      />
      <ResetModal
        open={resetModal}
        onClose={() => setResetModal(false)}
      />
    </>
  );
};
