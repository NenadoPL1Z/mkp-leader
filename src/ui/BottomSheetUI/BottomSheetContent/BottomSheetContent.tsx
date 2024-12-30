//! MAIN COMPONENT
import React from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";

import { Colors } from "@app/theme/colors";
import { styles } from "./BottomSheetContent.styles";
import { useBottomSheetContent } from "./useBottomSheetContent";
import BottomSheetBackdoor from "../BottomSheetBackdoor";
import type { BottomSheetUIProps } from "../types";

const ButtonSheetContent = (props: BottomSheetUIProps) => {
  const {
    children,
    handleClose,
    bottomSheetProps,
    isBackdoorClose = true,
    isAutoHeight,
  } = props;

  const {
    left,
    right,
    bottomSheetRef,
    autoHeightProps,
    onClose,
    handleLayout,
  } = useBottomSheetContent(props);

  return (
    <GestureHandlerRootView style={styles.gesture}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        enablePanDownToClose={true}
        onClose={onClose}
        {...bottomSheetProps}
        {...autoHeightProps}
        style={[
          {
            paddingLeft: left,
            paddingRight: right,
          },
          styles.bottomSheet,
          bottomSheetProps?.style,
        ]}
        handleStyle={[styles.handleStyle, bottomSheetProps?.handleStyle]}
        handleIndicatorStyle={[
          { backgroundColor: Colors.GRAY_TEN },
          styles.handleIndicatorStyle,
          bottomSheetProps?.handleIndicatorStyle,
        ]}
        containerStyle={[
          styles.containerStyle,
          bottomSheetProps?.containerStyle,
        ]}
        backgroundStyle={[
          { backgroundColor: Colors.WHITE },
          styles.backgroundStyle,
          bottomSheetProps?.backgroundStyle,
        ]}>
        <View
          style={[styles.contentContainer, { backgroundColor: Colors.WHITE }]}>
          {isAutoHeight && <View onLayout={handleLayout}>{children}</View>}
          {!isAutoHeight && children}
        </View>
      </BottomSheet>
      <BottomSheetBackdoor
        onPress={isBackdoorClose ? handleClose : undefined}
      />
    </GestureHandlerRootView>
  );
};

export default React.memo(ButtonSheetContent);
