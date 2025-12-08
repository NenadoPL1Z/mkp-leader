import type { Dispatch, SetStateAction } from "react";
import type { Nullable } from "@app/types/general.ts";
import type { ToastShowParams } from "react-native-toast-message";

export type RetryCodeProps = {
  onShowToast: (data: Nullable<ToastShowParams>) => void;
  setDisabledSubmitCode: Dispatch<SetStateAction<boolean>>;
};
