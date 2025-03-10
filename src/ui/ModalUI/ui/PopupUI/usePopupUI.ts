import { useEffect } from "react";
import { useAnimatedValue, Animated } from "react-native";

import type { PopupUIProps } from "./types";

type UsePopupFuncType = Pick<PopupUIProps, "onClose" | "visible">;

const MB_INITIAL = 0;
const OPACITY_INITIAL = 0;
const DURATION = 300;

export const usePopupUI = ({ visible, onClose }: UsePopupFuncType) => {
  const translateY = useAnimatedValue(MB_INITIAL);
  const opacity = useAnimatedValue(OPACITY_INITIAL);
  const opacityBackdoor = useAnimatedValue(visible ? 1 : 0);

  const animatedStyles = {
    opacity: opacity,
    transform: [{ translateY: translateY }],
  };
  const opacityBackdoorStyles = { opacity: opacityBackdoor };

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: -50,
        duration: DURATION,
        useNativeDriver: true,
      }).start();
      Animated.timing(opacity, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }).start();
      Animated.timing(opacityBackdoor, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: MB_INITIAL,
      duration: DURATION,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: OPACITY_INITIAL,
      duration: DURATION,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacityBackdoor, {
      toValue: 0,
      duration: DURATION,
      useNativeDriver: true,
    }).start();
    setTimeout(onClose, DURATION + 20);
  };

  return {
    handleClose,
    animatedStyles,
    opacityBackdoorStyles,
  };
};
