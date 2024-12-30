import { useController, useFormContext } from "react-hook-form";
import { Count } from "@app/lib/constants/count";
import type { ExecutorModelRequired } from "@app/lib/models/ExecutorModel";

export const useAEForm = () => {
  const methods = useFormContext<ExecutorModelRequired>();
  const { control } = methods;

  const username = useController({
    name: "username",
    control,
    rules: {
      required: true,
      maxLength: {
        value: Count.FORM_MAX_LENGTH,
        message: `Макс. количество символов ${Count.FORM_MAX_LENGTH}`,
      },
    },
  });
  const password = useController({
    name: "password",
    control,
    rules: {
      required: true,
      maxLength: {
        value: Count.FORM_MAX_LENGTH,
        message: `Макс. количество символов ${Count.FORM_MAX_LENGTH}`,
      },
    },
  });
  const name = useController({
    name: "name",
    control,
    rules: {
      required: true,
      maxLength: {
        value: Count.FORM_MAX_LENGTH,
        message: `Макс. количество символов ${Count.FORM_MAX_LENGTH}`,
      },
    },
  });
  const phone = useController({
    name: "phone",
    control,
    rules: {
      required: true,
      maxLength: {
        value: Count.FORM_MAX_LENGTH,
        message: `Макс. количество символов ${Count.FORM_MAX_LENGTH}`,
      },
    },
  });

  return {
    methods,
    username,
    password,
    name,
    phone,
  };
};
