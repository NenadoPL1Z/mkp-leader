import { useForm } from "react-hook-form";
import { useStatus } from "@app/hooks/useStatus";
import { Keyboard } from "react-native";
import { fetchUserLogin } from "@app/store/reducers/user/asyncThunks/fetchUserLogin";
import { useAppDispatch } from "@app/store/hooks";
import { useToastLocal } from "@app/hooks/useToastLocal";
import type { AuthForm } from "@app/lib/models/form/AuthForm";

export const useAuthContent = () => {
  const dispatch = useAppDispatch();
  const { toast, onShowToast, onHideToast } = useToastLocal();

  const {
    isLoading,
    handleLoadingStatus,
    handleClearStatus,
    handleErrorStatus,
  } = useStatus({
    isLoading: false,
  });

  const methods = useForm<AuthForm>({
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

  return {
    isLoading,
    toast,
    onHideToast,
    methods,
    onSubmit,
  };
};
