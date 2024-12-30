import React from "react";
import ScreenContainer from "@app/containers/ScreenContainer";
import HeaderUI from "@app/ui/HeaderUI";
import { StyleSheet, View } from "react-native";
import ToastUI from "@app/ui/ToastUI";
import { Size } from "@app/lib/constants/size";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAMRHome } from "./useAMRHome";
import AMRHTopBar from "./AMRHTopBar";
import type { AMHomeScreenProps } from "../../types";

const AMRHome = (props: AMHomeScreenProps) => {
  const { top } = useSafeAreaInsets();
  const { toast, headerTitle, onHideToast } = useAMRHome(props);

  return (
    <ScreenContainer
      top={top}
      isSaveArea={false}>
      <HeaderUI
        title={headerTitle}
        isOverLinear={true}
        right={{ variant: "logout" }}
      />
      <View style={styles.container}>
        <AMRHTopBar {...props.route.params} />
        <ToastUI
          params={{
            ...toast,
            isVisible: !!toast,
            onHide: onHideToast,
            bottomOffset: Size.BUTTON + 30,
          }}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default React.memo(AMRHome);
