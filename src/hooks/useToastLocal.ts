import { useState } from "react";
import type { Nullable } from "@app/types/general";
import type { ToastShowParams } from "react-native-toast-message";

type State = Nullable<ToastShowParams>;

export const useToastLocal = () => {
  const [toast, setToast] = useState<State>(null);

  const onShowToast = (config: State) => {
    setToast(null);
    setTimeout(() => setToast(config), 150);
  };

  const onHideToast = () => {
    setToast(null);
  };

  return {
    toast,
    onShowToast,
    onHideToast,
  };
};
