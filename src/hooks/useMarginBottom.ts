import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMemo } from "react";

type Strategy = "calc" | "";
export const useMarginBottom = (strategy: Strategy = "") => {
  const { top, bottom } = useSafeAreaInsets();
  const marginBottom = bottom ? 0 : 10;
  const offset = useMemo(() => {
    if (strategy === "calc") {
      return marginBottom + bottom;
    }
    return bottom ? 0 : 10;
  }, [bottom, strategy]);

  return { top, bottom, offset };
};
