import { useEffect } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";
import type { GestureResponderEvent } from "react-native";

import type { BottomSheetBackdoorProps } from "../types";

export const useBottomSheetBackdoor = (props: BottomSheetBackdoorProps) => {
  const opacity = useSharedValue(0);

  const handlePress = (e: GestureResponderEvent) => {
    if (!props.onPress) {
      return;
    }
    opacity.value = withTiming(0);
    props.onPress(e);
  };

  useEffect(() => {
    opacity.value = withTiming(1);
    return () => {
      opacity.value = withTiming(0);
    };
  }, []);

  return {
    opacity,
    handlePress,
  };
};
