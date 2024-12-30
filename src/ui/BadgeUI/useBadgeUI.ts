import type { BadgeUIProps } from "./types";
import type { ViewStyle } from "react-native";

export const useBadgeUI = ({ count, size }: BadgeUIProps) => {
  const { isDisplayCount, displayCount } = getDisplayCount(count);
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

type GetDisplayCount = { isDisplayCount: boolean; displayCount: string };

const getDisplayCount = (count = 0): GetDisplayCount => {
  const isDisplayCount = !!count;

  if (!isDisplayCount) {
    return { isDisplayCount: false, displayCount: "" };
  }

  const displayCount = count > 999 ? 999 + "+" : `${count}`;

  return {
    isDisplayCount: true,
    displayCount,
  };
};

const calcSize = (count = 0): number => {
  const isTwo = count > 9;
  const isThree = count > 99;
  const isFour = count > 999;

  if (isFour) {
    return 60;
  }
  if (isThree) {
    return 46;
  }
  if (isTwo) {
    return 34;
  }
  return 24;
};
