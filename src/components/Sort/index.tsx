import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Size } from "@app/lib/constants/size";
import FiltersIcon from "@app/assets/icons/FiltersIcon.svg";
import BottomSheetUI from "@app/ui/BottomSheetUI/BottomSheetUI";
import CheckBoxUI from "@app/ui/CheckBoxUI";
import BottomSheetTitle from "@app/ui/BottomSheetUI/BottomSheetTitle";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@app/theme/colors";
import SortButton from "./SortButton";
import { useSort } from "./useSort";
import SortBottomSheet from "./SortBottomSheet";
import type { SortProps } from "./types";

const Sort = (props: SortProps) => {
  const { sort } = props;
  const {
    sortBS,
    filtersBS,
    emergency,
    customPosition,
    handleChangeSort,
    handleCloseFilters,
  } = useSort(props);

  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <View style={styles.root}>
        <SortButton
          title={sort.value.title}
          onPress={sortBS.handleToggleTrue}
        />
        <TouchableOpacity
          onPress={filtersBS.handleToggleTrue}
          style={styles.touch}>
          <FiltersIcon
            style={{
              color:
                emergency.isToggle || customPosition.isToggle
                  ? Colors.MAIN
                  : Colors.GRAY_TEN,
            }}
          />
        </TouchableOpacity>
      </View>
      <SortBottomSheet
        sort={sort.value}
        isOpen={sortBS.isToggle}
        handleClose={sortBS.handleToggleFalse}
        handleChangeSort={handleChangeSort}
      />
      <BottomSheetUI
        isOpen={filtersBS.isToggle}
        handleClose={handleCloseFilters}
        bottomSheetProps={{ snapPoints: [150 + bottom] }}>
        <BottomSheetTitle title="Фильтр" />
        <CheckBoxUI
          title="Только срочные"
          checked={emergency.isToggle}
          onPress={emergency.handleToggle}
        />
        <CheckBoxUI
          title="Только заказные"
          checked={customPosition.isToggle}
          onPress={customPosition.handleToggle}
        />
      </BottomSheetUI>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: Size.SCREEN_PADDING,
  },
  touch: {
    height: 40,
    paddingHorizontal: Size.SCREEN_PADDING,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default React.memo(Sort);
