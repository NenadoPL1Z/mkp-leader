import type {
  BaseToastProps,
  ToastShowParams,
} from "react-native-toast-message";

type Params = ToastShowParams & { isVisible: boolean };

export type ToastUIProps = Partial<{
  params: Params;
  success: BaseToastProps;
  error: BaseToastProps;
}>;
