import React from "react";
import BottomSheetUI from "@app/ui/BottomSheetUI/BottomSheetUI";
import BottomSheetTitle from "@app/ui/BottomSheetUI/BottomSheetTitle";
import BottomSheetAction from "@app/ui/BottomSheetUI/BottomSheetAction";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { sortData } from "./constants";
import type { SortBottomSheetProps } from "./types";

const SortBottomSheet = ({
  sort,
  isOpen,
  handleChangeSort,
  handleClose,
}: SortBottomSheetProps) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <BottomSheetUI
      isOpen={isOpen}
      bottomSheetProps={{ snapPoints: [170 + bottom] }}
      handleClose={handleClose}>
      <BottomSheetTitle title="Сортировка" />
      {sortData.map((item) => (
        <BottomSheetAction
          key={item.title}
          title={item.title}
          isActive={sort.value === item.value}
          onPress={handleChangeSort(item)}
        />
      ))}
    </BottomSheetUI>
  );
};

export default React.memo(SortBottomSheet);
