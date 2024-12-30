import React from "react";

import ToastUI from "@app/ui/ToastUI";
import { useBottomOffset } from "@app/hooks/useBottomOffset";
import { Timing } from "@app/lib/constants/timing";
import { useSessionLimit } from "./useSessionLimit";

const SessionLimit = () => {
  const bottomOffset = useBottomOffset();
  const { toast, handleClose } = useSessionLimit();

  return (
    <ToastUI
      params={{
        ...toast,
        isVisible: Boolean(toast),
        onHide: handleClose,
        bottomOffset,
        visibilityTime: Timing.TOAST_ANIMATION * 4,
        autoHide: false,
      }}
    />
  );
};

export default React.memo(SessionLimit);
