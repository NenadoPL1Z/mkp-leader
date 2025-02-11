import { getDisplayCount, calcSize } from "./helpers.ts";
import type { BadgeUIProps } from "./types";
import type { ViewStyle } from "react-native";

export const useBadgeUI = ({ count, size, isZero = false }: BadgeUIProps) => {
  const { isDisplayCount, displayCount } = getDisplayCount(count, isZero);
  const width = size || calcSize(count);
  const height = size || 24;

  const sizeStyle: ViewStyle = {
    width,
    height,
  };

  return {
    isDisplayCount,
    displayCount,

    sizeStyle,
  };
};
