import { useEffect, useRef } from "react";
import { DEVICE_WIDTH } from "@app/lib/constants/size.ts";
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";

import type { SwiperProps } from "./types";

type SwiperArg = Pick<SwiperProps, "onIndexChanged" | "currentIndex">;

export const useSwiper = ({ currentIndex = 0, onIndexChanged }: SwiperArg) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const slideWidth = event.nativeEvent.layoutMeasurement.width;
    const currentPosition = event.nativeEvent.contentOffset.x;
    const slideIndex = Math.round(currentPosition / slideWidth);

    if (onIndexChanged) {
      onIndexChanged(slideIndex <= 0 ? 0 : slideIndex);
    }
  };

  // on change
  useEffect(() => {
    const scrollElem = scrollViewRef.current;

    if (scrollElem && currentIndex >= 0) {
      const slideWidth = DEVICE_WIDTH;

      scrollElem.scrollTo({
        x: currentIndex * slideWidth,
        animated: false,
      });
    }
  }, [currentIndex]);

  // on mount
  useEffect(() => {
    const scrollElem = scrollViewRef.current;

    if (scrollElem) {
      const slideWidth = DEVICE_WIDTH;

      setTimeout(() => {
        scrollElem.scrollTo({
          x: currentIndex * slideWidth,
          animated: false,
        });
      }, 4);
    }
  }, []);

  return {
    scrollViewRef,
    currentIndex,
    handleMomentumScrollEnd,
  };
};
