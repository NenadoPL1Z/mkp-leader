import ButtonUI from "@app/ui/ButtonUI";
import { Keyboard, View } from "react-native";
import TextField from "@app/ui/TextField";
import { useStatus } from "@app/hooks/useStatus.ts";
import { FormProvider, useController, useForm } from "react-hook-form";
import { useAppDispatch } from "@app/store/hooks";
import { useState } from "react";
import { matchValidEmail } from "@app/lib/functions/matchValidEmail";
import { isAxiosError } from "axios";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors.ts";
import { matchOnlyNumber } from "@app/lib/functions/matchOnlyNumber";
import TFPassword from "@app/ui/TextField/variant/TFPassword";
import { ValidateRulesUI } from "@app/ui/ValidateRulesUI";
import { apiInstance } from "@app/lib/http";
import { matchOnlyLatinCharacters } from "@app/lib/functions/matchOnlyLatinCharacters";
import { matchLength } from "@app/lib/functions/matchLength";
import { matchAtLeastOneDigit } from "@app/lib/functions/matchAtLeastOneDigit";
import { matchAtLeastOneSpecialCharacter } from "@app/lib/functions/matchAtLeastOneSpecialCharacter";
import { fetchUserReset } from "@app/store/reducers/user/asyncThunks/fetchUserReset";
import dayjs, { EU_TIME_FORMAT } from "@app/lib/dayjs";
import { formatTimeToText } from "@app/lib/functions/format-time-to-text";
import { styles } from "./styles";
import { RetryCode } from "./ui";
import type { ResetForm as ResetFormType } from "@app/lib/models/form/ResetForm.ts";
import type { Nullable } from "@app/types/general.ts";
import type { ToastShowParams } from "react-native-toast-message";

type ResetFormProps = {
  onShowToast: (data: Nullable<ToastShowParams>) => void;
};

export const ResetForm = ({ onShowToast }: ResetFormProps) => {
  const dispatch = useAppDispatch();

  const {
    isLoading,
    handleLoadingStatus,
    handleClearStatus,
    handleErrorStatus,
  } = useStatus({
    isLoading: false,
  });

  const [step, setStep] = useState<"email" | "code" | "password">("email");
  const [isValidPassword, setIsValidPassword] = useState(false);

  const methods = useForm<ResetFormType>({
    defaultValues: {
      username: "",
      verifyCode: "",
      password: "",
      confirmPassword: "",
    },
  });

  const username = useController({
    name: "username",
    control: methods.control,
    rules: {
      required: "Обязательное поле",
      maxLength: { value: 30, message: "Макс. количество символов 30" },
    },
  });
  const usernameValue = username.field.value;

  const verifyCode = useController({
    name: "verifyCode",
    control: methods.control,
    rules: {
      required: "Обязательное поле",
      maxLength: { value: 6, message: "Макс. количество символов 6" },
    },
  });
  const verifyCodeValue = verifyCode.field.value;

  const password = useController({
    name: "password",
    control: methods.control,
    rules: {
      required: "Обязательное поле",
      maxLength: { value: 30, message: "Макс. количество символов 30" },
    },
  });
  const passwordValue = password.field.value;

  const confirmPassword = useController({
    name: "confirmPassword",
    control: methods.control,
    rules: {
      required: "Обязательное поле",
      maxLength: { value: 30, message: "Макс. количество символов 30" },
    },
  });
  const confirmPasswordValue = confirmPassword.field.value;

  const onChangeUsername = (text: string) => {
    username.field.onChange(text.trim());
  };

  const onChangeVerifyCode = (text: string) => {
    if (!text) return verifyCode.field.onChange("");

    const valueOnlyNumber = text.trim().toUpperCase();
    if (matchOnlyNumber(valueOnlyNumber)) {
      if (valueOnlyNumber.length === 6) Keyboard.dismiss();
      verifyCode.field.onChange(valueOnlyNumber);
    }
  };

  const onChangePassword = (text: string) => {
    password.field.onChange(text.trim());
  };

  const onChangeConfirmPassword = (text: string) => {
    confirmPassword.field.onChange(text.trim());
  };

  const onSubmitEmail = (cb?: () => void) => {
    if (!usernameValue.length) {
      cb?.();
      return onShowToast({ text1: "Введите почту" });
    }

    if (!matchValidEmail(usernameValue)) {
      cb?.();
      return onShowToast({
        text1: "Введите почту в правильном формате. Например: ivanov@mail.ru",
      });
    }

    Keyboard.dismiss();
    handleLoadingStatus();

    apiInstance
      .post<{ msg: string }>("/auth/forgot-password", {
        username: usernameValue,
      })
      .then((data) => {
        setStep("code");
        onShowToast({ text1: data.data.msg });
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          const retryAfter = error.response?.headers?.["retry-after"];

          if (retryAfter && Number(retryAfter)) {
            const remainderTiming = dayjs
              .duration(Number(retryAfter), "seconds")
              .format(EU_TIME_FORMAT);

            onShowToast({
              text1: `Чтобы ваша почта была в безопасности, мы ограничиваем число запросов. Следующий код можно будет отправить через ${formatTimeToText(remainderTiming)}`,
            });
          } else {
            onShowToast({
              text1:
                error?.response?.data?.detail ??
                "Не получилось отправить код восстановления. Пожалуйста, попробуйте ещё раз или повторите попытку позже",
            });
          }
        }
      })
      .finally(() => {
        cb?.();
        handleClearStatus();
      });
  };

  const onSubmitVerifyCode = () => {
    if (!verifyCodeValue.length) {
      return onShowToast({ text1: "Введите код восстановления" });
    }

    if (!matchOnlyNumber(verifyCodeValue) || verifyCodeValue.length !== 6) {
      return onShowToast({
        text1: "Пожалуйста, введите 6-значный код (только цифры без пробелов)",
      });
    }

    Keyboard.dismiss();
    handleLoadingStatus();

    apiInstance
      .post<{ msg: string }>("/auth/verify-reset-code", {
        token: verifyCodeValue,
      })
      .then((data) => {
        setStep("password");
        onShowToast({ text1: data.data.msg });
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          onShowToast({
            text1:
              error?.response?.data?.detail ??
              "Не получилось подтвердить код восстановления. Пожалуйста, попробуйте ещё раз или повторите попытку позже",
          });
        }
      })
      .finally(() => {
        handleClearStatus();
      });
  };

  const onSubmitPassword = () => {
    if (!passwordValue.length) {
      return onShowToast({ text1: "Введите новый пароль" });
    }

    if (!confirmPasswordValue.length) {
      return onShowToast({ text1: "Введите новый пароль еще раз" });
    }

    const isOnlyLatinCharacters = matchOnlyLatinCharacters(passwordValue);
    const isLength = matchLength(passwordValue);
    const isAtLeastOneDigit = matchAtLeastOneDigit(passwordValue);
    const isAtLeastOneSpecialCharacter =
      matchAtLeastOneSpecialCharacter(passwordValue);

    if (!isOnlyLatinCharacters) {
      return onShowToast({
        text1: "Пароль должен содержать только латинские символы",
      });
    }

    if (!isLength) {
      return onShowToast({ text1: "Длина пароля: от 8 до 30 символов" });
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

    if (usernameValue === passwordValue) {
      return onShowToast({ text1: "Пароль не должен совпадать с email" });
    }

    if (passwordValue !== confirmPasswordValue) {
      return onShowToast({ text1: "Пароли не совпадают" });
    }

    Keyboard.dismiss();
    handleLoadingStatus();

    const success = () => {
      handleClearStatus();
    };

    const reject = (message?: string) => {
      handleErrorStatus("Ошибка при смене пароля");
      onShowToast({
        text1:
          message ??
          "Ошибка при смене пароля. Пожалуйста, попробуйте ещё раз или повторите попытку позже",
      });
    };

    dispatch(
      fetchUserReset({
        username: usernameValue,
        new_password: passwordValue,
        token: verifyCodeValue,
        success,
        reject,
      }),
    );
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        {step !== "email" ? (
          <Typography
            style={{ textAlign: "center", marginTop: 2, marginBottom: 40 }}
            fontSize={16}
            lineHeight={16}
            color={Colors.WHITE}>
            для почты: {usernameValue}
          </Typography>
        ) : (
          <View style={{ marginTop: 40 }} />
        )}
        {step === "email" && (
          <View style={styles.input}>
            <TextField
              isClear={false}
              variant="outlined"
              label={usernameValue.length ? "Почта" : ""}
              placeholder={!usernameValue.length ? "Почта" : ""}
              autoCapitalize="none"
              value={usernameValue}
              keyboardType="email-address"
              autoCorrect={false}
              onChangeText={onChangeUsername}
              maxLength={60}
            />
          </View>
        )}
        {step === "code" && (
          <View style={styles.input}>
            <TextField
              isClear={false}
              variant="outlined"
              label={verifyCodeValue.length ? "Код восстановления" : ""}
              placeholder={!verifyCodeValue.length ? "Код восстановления" : ""}
              autoCapitalize="none"
              value={verifyCodeValue}
              keyboardType="numeric"
              autoCorrect={false}
              maxLength={6}
              onChangeText={onChangeVerifyCode}
              errorMessage={verifyCode.fieldState.error?.message || ""}
            />
            <Typography
              style={{ marginTop: 10 }}
              fontSize={16}
              lineHeight={16}
              color={Colors.WHITE}>
              Мы отправили письмо с кодом на вашу почту. Не забудьте проверить
              папку «Спам», если письмо не найдётся во «Входящих».
            </Typography>
          </View>
        )}
        {step === "password" && (
          <View style={styles.input}>
            <TFPassword
              isClear={false}
              variant="outlined"
              label={passwordValue.length ? "Новый пароль" : ""}
              placeholder={!passwordValue.length ? "Новый пароль" : ""}
              autoCapitalize="none"
              value={passwordValue}
              onChangeText={onChangePassword}
              maxLength={30}
            />
            <ValidateRulesUI
              value={passwordValue}
              onConfirm={setIsValidPassword}
            />
            {isValidPassword && (
              <View style={{ marginTop: 20 }}>
                <TFPassword
                  isClear={false}
                  variant="outlined"
                  label={
                    confirmPasswordValue.length
                      ? "Подтвердите новый пароль"
                      : ""
                  }
                  placeholder={
                    !confirmPasswordValue.length
                      ? "Подтвердите новый пароль"
                      : ""
                  }
                  autoCapitalize="none"
                  value={confirmPasswordValue}
                  onChangeText={onChangeConfirmPassword}
                  maxLength={30}
                />
              </View>
            )}
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {step === "email" && (
          <ButtonUI
            variant="inverted"
            loading={isLoading}
            onPress={() => onSubmitEmail()}>
            Отправить код восстановления на почту
          </ButtonUI>
        )}
        {step === "code" && (
          <>
            <ButtonUI
              variant="inverted"
              loading={isLoading}
              onPress={onSubmitVerifyCode}>
              Подтвердить код
            </ButtonUI>
            <RetryCode
              onShowToast={onShowToast}
              onSubmit={onSubmitEmail}
            />
          </>
        )}
        {step === "password" && (
          <ButtonUI
            variant="inverted"
            loading={isLoading}
            onPress={onSubmitPassword}>
            Обновить пароль
          </ButtonUI>
        )}
      </View>
    </FormProvider>
  );
};
