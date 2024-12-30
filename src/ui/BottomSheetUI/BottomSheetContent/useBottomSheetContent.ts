import { useEffect, useMemo, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context/src/SafeAreaContext";
import type { LayoutChangeEvent } from "react-native";
import type BottomSheet from "@gorhom/bottom-sheet";

import type { BottomSheetUIProps } from "../types";

export const useBottomSheetContent = ({
  isOpen,
  isAutoHeight = false,
  bottomSheetProps,
  handleClose,
}: BottomSheetUIProps) => {
  const { left, right, bottom } = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [height, setHeight] = useState<number>(0);

  const autoHeightProps = useMemo(() => {
    let snapPoints: (string | number)[] = ["50%"];

    if (bottomSheetProps?.snapPoints) {
      snapPoints = bottomSheetProps.snapPoints as string[];
    }

    if (isAutoHeight) {
      snapPoints = [height + 35 + (bottom ? bottom - 10 : 0)];
    }

    return { snapPoints };
  }, [isAutoHeight, height, bottomSheetProps]);

  const onClose = () => {
    handleClose();
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    setHeight(e.nativeEvent.layout.height);
  };

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.snapToIndex(0);
    }
    if (!isOpen) {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  return {
    left,
    right,
    bottomSheetRef,
    autoHeightProps,
    onClose,
    handleLayout,
  };
};
