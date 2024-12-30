import React, { useEffect, useState } from "react";
import { Portal } from "@gorhom/portal";

import { Timing } from "@app/lib/constants/timing";
import type { BottomSheetUIProps } from "./types";

export const useBottomSheetUI = (props: BottomSheetUIProps) => {
  const { isOpen, isPortal = true } = props;
  const [localVisible, setLocalVisible] = useState<boolean>(isOpen);

  const PortalContainer = isPortal ? Portal : React.Fragment;

  useEffect(() => {
    if (isOpen) {
      setLocalVisible(true);
    }

    if (!isOpen) {
      setTimeout(() => {
        setLocalVisible(false);
      }, Timing.BOTTOM_SHEET_CLOSE);
    }
  }, [isOpen]);

  return {
    localVisible,
    PortalContainer,
  };
};
