type GetDisplayCount = { isDisplayCount: boolean; displayCount: string };

export const getDisplayCount = (count = 0, isZero = false): GetDisplayCount => {
  const isDisplayCount = !!count;

  if (!isDisplayCount && !isZero) {
    return { isDisplayCount: false, displayCount: "" };
  }

  const displayCount = count > 999 ? 999 + "+" : `${count}`;

  return {
    isDisplayCount: true,
    displayCount,
  };
};

export const calcSize = (count = 0): number => {
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
