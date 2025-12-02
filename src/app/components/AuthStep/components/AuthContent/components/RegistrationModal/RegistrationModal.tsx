import {
  Keyboard,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { styles } from "@app/app/components/AuthStep/components/AuthContent/index.styles.ts";
import { Colors, linear } from "@app/theme/colors.ts";
import KeyboardContainer from "@app/containers/KeyboardContainer";
import Typography from "@app/ui/Typography";
import { FormProvider, useForm } from "react-hook-form";
import ButtonUI from "@app/ui/ButtonUI";
import ToastUI from "@app/ui/ToastUI";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToastLocal } from "@app/hooks/useToastLocal.ts";
import { useStatus } from "@app/hooks/useStatus.ts";
import { fetchUserLogin } from "@app/store/reducers/user/asyncThunks/fetchUserLogin";
import { useAppDispatch } from "@app/store/hooks";
import { PrevIcon } from "@app/assets/icons/dist";
import { matchOnlyLatinCharacters } from "@app/lib/functions/matchOnlyLatinCharacters";
import { matchLength } from "@app/lib/functions/matchLength";
import { matchAtLeastOneDigit } from "@app/lib/functions/matchAtLeastOneDigit";
import { matchAtLeastOneSpecialCharacter } from "@app/lib/functions/ matchAtLeastOneSpecialCharacter";
import { RegisterForm } from "./components";
import type { RegisterForm as RegisterFormType } from "@app/lib/models/form/RegisterForm";
import type { RegistrationModalProps } from "./types";

const ICON_SIZE = 24;

export const RegistrationModal = ({
  open,
  onClose,
}: RegistrationModalProps) => {
  const dispatch = useAppDispatch();

  const { top } = useSafeAreaInsets();
  const { toast, onShowToast, onHideToast } = useToastLocal();

  const {
    isLoading,
    handleLoadingStatus,
    handleClearStatus,
    handleErrorStatus,
  } = useStatus({
    isLoading: false,
  });

  const methods = useForm<RegisterFormType>({
    defaultValues: { username: "", password: "" },
  });

  const success = () => {
    handleClearStatus();
  };

  const reject = () => {
    handleErrorStatus("Ошибка входа");
    onShowToast({
      text1: "Некорректный логин или пароль",
    });
  };

  const showToastError = (usernameLength: number, passwordLength: number) => {
    if (!usernameLength && !passwordLength) {
      onShowToast({
        text1: "Заполните логин и пароль",
      });
      return;
    }

    if (!usernameLength) {
      onShowToast({
        text1: "Введите логин",
      });
      return;
    }

    if (!passwordLength) {
      onShowToast({
        text1: "Введите пароль",
      });
      return;
    }
  };

  const onSubmit = methods.handleSubmit(
    (data) => {
      const isOnlyLatinCharacters = matchOnlyLatinCharacters(data.password);
      const isLength = matchLength(data.password);
      const isAtLeastOneDigit = matchAtLeastOneDigit(data.password);
      const isAtLeastOneSpecialCharacter = matchAtLeastOneSpecialCharacter(
        data.password,
      );

      if (!isOnlyLatinCharacters) {
        return onShowToast({
          text1: "Пароль должен содержать только латинские символы",
        });
      }

      if (!isLength) {
        return onShowToast({
          text1: "88: от 8 до 30 символов",
        });
      }

      if (!isAtLeastOneDigit) {
        return onShowToast({
          text1: "Пароль должен содержать хотя бы одну цифру (0-9)",
        });
      }

      if (!isAtLeastOneSpecialCharacter) {
        return onShowToast({
          text1: `Пароль должен содержать хотя бы один спец. символ (! @ # $ % ^ & * ( ) _ + - = [ ] { } ; ' : , " | . < > / ?)`,
        });
      }

      Keyboard.dismiss();
      handleLoadingStatus();

      dispatch(
        fetchUserLogin({
          username: data.username,
          password: data.password,
          success,
          reject,
        }),
      );
    },
    () => {
      showToastError(
        methods.getValues("username").length,
        methods.getValues("password").length,
      );
    },
  );

  return (
    <Modal
      animationType="slide"
      visible={open}>
      <LinearGradient
        style={styles.container}
        colors={linear.authorization}>
        <SafeAreaView style={styles.wrapper}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
            onPress={onClose}>
            <PrevIcon
              width={ICON_SIZE}
              height={ICON_SIZE}
              color={Colors.WHITE}
            />
            <Typography
              fontSize={16}
              lineHeight={16}
              color={Colors.WHITE}>
              Авторизация
            </Typography>
          </TouchableOpacity>
          <KeyboardContainer>
            <View
              style={{
                ...styles.top,
                marginTop: styles.top.marginTop - ICON_SIZE,
              }}>
              <Typography
                variant="h1"
                style={styles.title}>
                Регистрация
              </Typography>
              <FormProvider {...methods}>
                <RegisterForm />
              </FormProvider>
              <View style={styles.buttonContainer}>
                <ButtonUI
                  variant="inverted"
                  loading={isLoading}
                  onPress={onSubmit}>
                  Зарегистрироваться
                </ButtonUI>
              </View>
            </View>
          </KeyboardContainer>
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
      </LinearGradient>
    </Modal>
  );
};
