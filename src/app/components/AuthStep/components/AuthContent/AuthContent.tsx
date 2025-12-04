import { SafeAreaView, View } from "react-native";
import Typography from "@app/ui/Typography";
import { FormProvider } from "react-hook-form";
import KeyboardContainer from "@app/containers/KeyboardContainer";
import { LinearGradient } from "react-native-linear-gradient";
import { Colors, linear } from "@app/theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonUI from "@app/ui/ButtonUI";
import ToastUI from "@app/ui/ToastUI";
import Documentation from "@app/components/Documentation";
import { useEffect, useState } from "react";
import SpinnerUI from "@app/ui/SpinnerUI";
import AuthForm from "./components/AuthForm";
import { useAuthContent } from "./useAuthContent.ts";
import { styles } from "./index.styles";
import SessionLimit from "./components/SessionLimit";
import { RegistrationModal } from "./components/RegistrationModal";
import { ResetModal } from "./components/ResetModal";

type AuthContentProps = {
  isDisplayAuth: boolean;
};

export const AuthContent = ({ isDisplayAuth }: AuthContentProps) => {
  const { top, bottom } = useSafeAreaInsets();
  const { isLoading, toast, onHideToast, methods, onSubmit } = useAuthContent();
  const [registrationModal, setRegistrationModal] = useState<boolean>(false);
  const [resetModal, setResetModal] = useState(false);

  useEffect(() => {
    if (!isDisplayAuth) {
      setRegistrationModal(false);
      setResetModal(false);
    }
  }, [isDisplayAuth]);

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
              {isDisplayAuth ? (
                <>
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
                </>
              ) : (
                <SpinnerUI
                  size="large"
                  color={Colors.WHITE}
                />
              )}
            </View>
          </KeyboardContainer>
          <View style={[styles.bottom, bottom === 0 && styles.bottomMargin]}>
            {isDisplayAuth ? <Documentation /> : null}
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
      {isDisplayAuth && (
        <>
          <RegistrationModal
            open={registrationModal && isDisplayAuth}
            onClose={() => setRegistrationModal(false)}
          />
          <ResetModal
            open={resetModal && isDisplayAuth}
            onClose={() => setResetModal(false)}
          />
        </>
      )}
    </>
  );
};
