import React, { useMemo } from "react";
import Toast from "react-native-toast-message";
import TSuccess from "./ui/TSuccess";
import TError from "./ui/TError";
import { useToastUI } from "./useToastUI";
import type { BaseToastProps } from "react-native-toast-message";
import type { ToastUIProps } from "./types";

const getToastConfig = ({ success, error }: Omit<ToastUIProps, "params">) => ({
  success: (props: BaseToastProps) => (
    <TSuccess
      {...props}
      {...success}
    />
  ),
  error: (props: BaseToastProps) => (
    <TError
      {...props}
      {...error}
    />
  ),
});

const ToastUI = ({ params, success = {}, error = {} }: ToastUIProps) => {
  useToastUI(params);

  const toastConfig = useMemo(
    () => getToastConfig({ success, error }),
    [success, error],
  );

  return <Toast config={toastConfig} />;
};

export default React.memo(ToastUI);
