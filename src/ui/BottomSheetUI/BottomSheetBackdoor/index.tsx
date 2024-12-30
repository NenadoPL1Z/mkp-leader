import React from "react";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";

import { styles } from "./index.styles";
import { useBottomSheetBackdoor } from "./useBottomSheetBackdoor";
import type { BottomSheetBackdoorProps } from "../types";

const BottomSheetBackdoor = (props: BottomSheetBackdoorProps) => {
  const { opacity, handlePress } = useBottomSheetBackdoor(props);

  return (
    <Animated.View style={[{ opacity }, styles.container]}>
      <Pressable
        {...props}
        style={styles.pressable}
        onPress={handlePress}
      />
    </Animated.View>
  );
};

export default React.memo(BottomSheetBackdoor);
