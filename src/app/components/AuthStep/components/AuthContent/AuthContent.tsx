import { SafeAreaView, View } from "react-native";
import Typography from "@app/ui/Typography";
import { FormProvider } from "react-hook-form";
import KeyboardContainer from "@app/containers/KeyboardContainer";
import { LinearGradient } from "react-native-linear-gradient";
import { Colors, linear } from "@app/theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { openIndexWebsite } from "@app/lib/functions/openIndexWebsite";
import ButtonUI from "@app/ui/ButtonUI";
import ToastUI from "@app/ui/ToastUI";
import Documentation from "@app/components/Documentation";
import { IS_DEV } from "@app/lib/constants";
import { AutoAuth } from "./components/AutoAuth";
import AuthForm from "./components/AuthForm";
import { useAuthContent } from "./useAuthContent.ts";
import { styles } from "./index.styles";
import SessionLimit from "./components/SessionLimit";

export const AuthContent = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { isLoading, toast, onHideToast, methods, onSubmit } = useAuthContent();
  return (
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
              <AuthForm />
            </FormProvider>
            <View style={styles.button}>
              <ButtonUI
                variant="inverted"
                loading={isLoading}
                onPress={onSubmit}>
                Войти
              </ButtonUI>
              {IS_DEV && (
                <AutoAuth
                  methods={methods}
                  onSubmit={onSubmit}
                />
              )}
            </View>
          </View>
        </KeyboardContainer>
        <View style={[styles.bottom, bottom === 0 && styles.bottomMargin]}>
          <Documentation />
          <Typography
            variant="h4"
            fontWeight="400"
            fontSize={15}
            lineHeight={20}
            color={Colors.WHITE}>
            Разработано{" "}
            <Typography
              variant="h4"
              fontWeight="400"
              fontSize={15}
              lineHeight={20}
              color={Colors.WHITE}
              style={styles.url}
              onPress={openIndexWebsite}>
              INDEX studio
            </Typography>
          </Typography>
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
  );
};
