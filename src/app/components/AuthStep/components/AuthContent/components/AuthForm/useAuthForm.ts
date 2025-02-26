import { useController, useFormContext } from "react-hook-form";
import type { AuthForm } from "@app/lib/models/form/AuthForm";

export const useAuthForm = () => {
  const { control } = useFormContext<AuthForm>();

  const username = useController({
    name: "username",
    control,
    rules: {
      required: "Обязательное поле",
      maxLength: { value: 30, message: "Макс. количество символов 30" },
    },
  });

  const password = useController({
    name: "password",
    control,
    rules: {
      required: "Обязательное поле",
      maxLength: { value: 30, message: "Макс. количество символов 30" },
    },
  });

  const onChangeUsername = (text: string) => {
    username.field.onChange(text.trim());
  };

  const onChangePassword = (text: string) => {
    password.field.onChange(text.trim());
  };

  return {
    username,
    password,

    onChangeUsername,
    onChangePassword,
  };
};
