import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useBottomOffset = () => {
  const { bottom } = useSafeAreaInsets();
  return bottom || 10;
};
