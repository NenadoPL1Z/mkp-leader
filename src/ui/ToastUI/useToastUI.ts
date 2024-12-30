import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { Timing } from "@app/lib/constants/timing";
import type { ToastUIProps } from "./types";

export const useToastUI = (params: Pick<ToastUIProps, "params">["params"]) => {
  useEffect(() => {
    if (params && params.isVisible) {
      Toast.show({
        type: "success",
        position: params.position || "bottom",
        autoHide: true,
        visibilityTime: Timing.TOAST_ANIMATION,
        bottomOffset: 0,
        topOffset: 0,
        ...params,
      });
    } else {
      Toast.hide();
    }
  }, [params]);
};
