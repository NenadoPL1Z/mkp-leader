import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { WithTimingConfig } from "react-native-reanimated";

import type { PopupUIProps } from "./types";

type UsePopupFuncType = Pick<PopupUIProps, "onClose" | "visible">;

const MB_INITIAL = 0;
const OPACITY_INITIAL = 0;
const ANIM_CONFIG: WithTimingConfig = { duration: 300 };

export const usePopupUI = ({ visible, onClose }: UsePopupFuncType) => {
  const translateY = useSharedValue(MB_INITIAL);
  const opacity = useSharedValue(OPACITY_INITIAL);
  const opacityBackdoor = useSharedValue(visible ? 1 : 0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  const opacityBackdoorStyles = useAnimatedStyle(() => {
    return {
      opacity: opacityBackdoor.value,
    };
  });

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(-50, ANIM_CONFIG);
      opacity.value = withTiming(1, ANIM_CONFIG);
      opacityBackdoor.value = withTiming(1, ANIM_CONFIG);
    }
  }, [visible]);

  const handleClose = () => {
    translateY.value = withTiming(MB_INITIAL, ANIM_CONFIG);
    opacity.value = withTiming(OPACITY_INITIAL, ANIM_CONFIG);
    opacityBackdoor.value = withTiming(0, ANIM_CONFIG);
    setTimeout(onClose, (ANIM_CONFIG.duration || 0) + 20);
  };

  return {
    handleClose,
    animatedStyles,
    opacityBackdoorStyles,
  };
};
