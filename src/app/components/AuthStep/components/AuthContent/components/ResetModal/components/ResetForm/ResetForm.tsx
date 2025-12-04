import ButtonUI from "@app/ui/ButtonUI";
import { Keyboard, View } from "react-native";
import TextField from "@app/ui/TextField";
import { useStatus } from "@app/hooks/useStatus.ts";
import { FormProvider, useController, useForm } from "react-hook-form";
import { useAppDispatch } from "@app/store/hooks";
import { useState } from "react";
import { fetchUserForgotPassword } from "@app/store/reducers/user/asyncThunks/fetchUserForgotPassword";
import { matchValidEmail } from "@app/lib/functions/matchValidEmail";
import { isAxiosError } from "axios";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors.ts";
import { matchOnlyNumber } from "@app/lib/functions/matchOnlyNumber";
import { fetchUserVerifyCode } from "@app/store/reducers/user/asyncThunks/fetchUserVerifyCode";
import TFPassword from "@app/ui/TextField/variant/TFPassword";
import { ValidateRulesUI } from "@app/ui/ValidateRulesUI";
import { styles } from "./styles";
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
    // handleLoadingStatus,
    // handleClearStatus,
    // handleErrorStatus,
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

  const verifyCode = useController({
    name: "verifyCode",
    control: methods.control,
    rules: {
      required: "Обязательное поле",
      maxLength: { value: 6, message: "Макс. количество символов 6" },
    },
  });

  const password = useController({
    name: "password",
    control: methods.control,
    rules: {
      required: "Обязательное поле",
      maxLength: { value: 30, message: "Макс. количество символов 30" },
    },
  });

  const confirmPassword = useController({
    name: "confirmPassword",
    control: methods.control,
    rules: {
      required: "Обязательное поле",
      maxLength: { value: 30, message: "Макс. количество символов 30" },
    },
  });

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

  // const success = () => {
  //   handleClearStatus();
  // };
  //
  // const reject = () => {
  //   handleErrorStatus("Ошибка входа");
  //   onShowToast({
  //     text1: "Некорректный логин или пароль",
  //   });
  // };
  //
  // const showToastError = (usernameLength: number, passwordLength: number) => {
  //   if (!usernameLength && !passwordLength) {
  //     onShowToast({
  //       text1: "Заполните логин и пароль",
  //     });
  //     return;
  //   }
  //
  //   if (!usernameLength) {
  //     onShowToast({
  //       text1: "Введите логин",
  //     });
  //     return;
  //   }
  //
  //   if (!passwordLength) {
  //     onShowToast({
  //       text1: "Введите пароль",
  //     });
  //     return;
  //   }
  // };
  //
  // const onSubmit = methods.handleSubmit(
  //   (data) => {
  //     Keyboard.dismiss();
  //     handleLoadingStatus();
  //
  //     dispatch(
  //       fetchUserLogin({
  //         username: data.username,
  //         password: data.password,
  //         success,
  //         reject,
  //       }),
  //     );
  //   },
  //   () => {
  //     showToastError(
  //       methods.getValues("username").length,
  //       methods.getValues("password").length,
  //     );
  //   },
  // );

  const onSubmitEmail = () => {
    if (!matchValidEmail(username.field.value)) {
      return onShowToast({
        text1: "Введите почту в правильном формате. Например: ivanov@mail.ru",
      });
    }

    dispatch(fetchUserForgotPassword({ username: username.field.value }))
      .then(() => {
        setStep("code");
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          onShowToast({
            text1:
              error?.response?.data?.detail ??
              "Не получилось отправить код восстановления. Пожалуйста, попробуйте ещё раз или повторите попытку позже",
          });
        }
      });
  };

  const onSubmitVerifyCode = () => {
    if (
      !matchOnlyNumber(verifyCode.field.value) ||
      verifyCode.field.value.length !== 6
    ) {
      return onShowToast({
        text1: "Пожалуйста, введите 6-значный код (только цифры без пробелов)",
      });
    }

    dispatch(
      fetchUserVerifyCode({
        username: username.field.value,
        token: verifyCode.field.value,
      }),
    )
      .then(() => {
        setStep("password");
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          onShowToast({
            text1:
              error?.response?.data?.detail ??
              "Не получилось подтвердить код восстановления. Пожалуйста, попробуйте ещё раз или повторите попытку позже",
          });
        }
      });
  };

  const onSubmitPassword = () => {
    //
  };

  const usernameValue = username.field.value;
  const verifyCodeValue = verifyCode.field.value;
  const passwordValue = password.field.value;
  const confirmPasswordValue = confirmPassword.field.value;

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
            onPress={onSubmitEmail}>
            Отправить код восстановления на почту
          </ButtonUI>
        )}
        {step === "code" && (
          <ButtonUI
            variant="inverted"
            loading={isLoading}
            onPress={onSubmitVerifyCode}>
            Подтвердить код
          </ButtonUI>
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
