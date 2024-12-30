import React from "react";
import { View, StyleSheet } from "react-native";
import ScreenContainer from "@app/containers/ScreenContainer";
import HeaderUI from "@app/ui/HeaderUI";
import ToastUI from "@app/ui/ToastUI";
import { Size } from "@app/lib/constants/size";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEMRHome } from "@app/routes/executor/stacks/EMain/screens/EMRequests/screens/EMRHome/useEMRHome";
import EMRHTopBar from "@app/routes/executor/stacks/EMain/screens/EMRequests/screens/EMRHome/EMRHTopBar";
import type { EMRHomeScreenProps } from "../../types";

const EMRHome = (props: EMRHomeScreenProps) => {
  const { top } = useSafeAreaInsets();
  const { toast, headerTitle, onHideToast } = useEMRHome(props);

  return (
    <ScreenContainer
      top={top}
      isSaveArea={false}>
      <HeaderUI
        title={headerTitle}
        isOverLinear={true}
      />
      <View style={styles.container}>
        <EMRHTopBar {...props.route.params} />
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
export default React.memo(EMRHome);
